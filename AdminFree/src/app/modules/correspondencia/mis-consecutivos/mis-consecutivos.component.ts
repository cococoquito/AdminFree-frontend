import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import { Message } from 'primeng/components/common/api';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { SpinnerState } from '../../../states/spinner.state';
import { FiltroConsecutivosState } from '../../../states/transversal/filtro-consecutivos.state';
import { ActivarAnularConsecutivoDTO } from '../../../dtos/correspondencia/activar-anular-consecutivo.dto';
import { TransferirConsecutivoDTO } from '../../../dtos/correspondencia/transferir-consecutivo.dto';
import { ConsecutivoDTO } from '../../../dtos/correspondencia/consecutivo.dto';
import { SelectItemDTO } from '../../../dtos/transversal/select-item.dto';
import { ConsecutivoEdicionDTO } from '../../../dtos/correspondencia/consecutivo-edicion.dto';
import { DocumentoDTO } from '../../../dtos/correspondencia/documento.dto';
import { ConsecutivoEdicionValueDTO } from '../../../dtos/correspondencia/consecutivo-edicion-value.dto';
import { PaginadorModel } from '../../../model/paginador-model';
import { VentanaModalModel } from '../../../model/ventana-modal.model';
import { StepsModel } from '../../../model/steps-model';
import { CampoModel } from '../../../model/campo-model';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from '../../../util/messages.util';
import { RegexUtil } from '../../../util/regex-util';
import { FechaUtil } from '../../../util/fecha-util';
import { BusinessUtil } from '../../../util/business-util';
import { LabelsConstant } from '../../../constants/labels.constant';
import { MsjFrontConstant } from '../../../constants/messages-frontend.constant';
import { EstadoConstant } from '../../../constants/estado.constant';
import { TiposDocumentosConstant } from '../../../constants/tipos-documentos.constant';
import { saveAs as importedSaveAs } from 'file-saver';

/**
 * Componente para la administracion de los consecutivos de
 * correspondencia solicitados que les pertenece al usuario
 * autenticado para el anio actual
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './mis-consecutivos.component.html',
  styleUrls: ['./mis-consecutivos.component.css'],
  providers: [ CorrespondenciaService, FiltroConsecutivosState ]
})
export class MisConsecutivosComponent extends CommonComponent implements OnInit, OnDestroy {

  /** se utiliza para consultar solamente los consecutivos del usuario autenticado */
  public idUsuarioAutenticado: number;

  /** Lista de usuarios que son visualizados en la tabla de transferir consecutivo */
  public usuariosTransferir: Array<SelectItemDTO>;

  /** Lista de usuarios consultados en el sistema, esta lista no se modifica */
  public usuariosTransferirOrigen: Array<SelectItemDTO>;

  /** Es el usuario seleccionado para transferir el consecutivo */
  public usuarioElegidoTransferir: SelectItemDTO;

  /** Modelo del modal para transferir un consecutivo a otro usuario */
  public modalTransferir: VentanaModalModel;

  /** Modelo del componente steps que se utiliza para tranferir consecutivos*/
  public stepsTransferencia: StepsModel;

  /** Es el filter ingresado para la busqueda por nombre de usuario a transferir*/
  public filterNombreUsuario: string;

  /** Es el consecutivo seleccionado para su edicion*/
  public consecutivoEdicion: ConsecutivoEdicionDTO;

  /** Son los tipos de documentos permitidos para el cargue de archivo*/
  public tiposDocumentos = TiposDocumentosConstant.getAll();

  /** Modelo de los campos para editar los valores del consecutivo seleccionado*/
  public valuesEditar: Array<CampoModel>;

  /** Indica si hay algun campo modificado para edicion, habilitando boton aplicar cambios*/
  public isAplicarEdicion: boolean;

  /** Es la fecha actual traida desde el servidor*/
  private fechaActualSever: Date;

  /** Se utiliza para validar los valores de los inputs para la edicion*/
  public regex: RegexUtil;

  /** labels para el componente de los calendars */
  public CALENDAR_SPANISH = LabelsConstant.CALENDAR_SPANISH;

  /** Se utiliza para resetear la tabla de consecutivos cuando aplican un filtro*/
  @ViewChild('tblcc') tblConsecutivos: Table;

  /** Se utiliza para resetear la tabla de usuarios de transferencia de consecutivo*/
  @ViewChild('tblusers') tblusers: Table;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param correspondenciaService, contiene los servicios
   * del modulo de correspondencia
   *
   * @param confirmationService, se utiliza para mostrar el
   * modal de confirmacion para diferente procesos
   *
   * @param shellState, se utiliza para el titulo del componente
   *
   * @param stateFiltro, se utiliza como mediador para administrar los datos
   * o llamados de metodos entre este componente y el componente filtro busqueda
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * pasa del panel edicion a la lista de consecutivos
   *
   * @param datePipe, Se utiliza para dar formato a los valores tipo fecha
   */
  constructor(
    protected messageService: MessageService,
    private correspondenciaService: CorrespondenciaService,
    private confirmationService: ConfirmationService,
    private shellState: ShellState,
    public stateFiltro: FiltroConsecutivosState,
    private spinnerState: SpinnerState,
    private datePipe: DatePipe) {
    super();
  }

  /**
   * Se debe obtener los datos iniciales del sub-modulo
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Cuando se destruya el componente se debe limpiar los mensajes
   */
  ngOnDestroy(): void {
    this.messageService.clear();
  }

  /**
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a consultar los
   * consecutivos y configurar el titulo y subtitulo
   */
  private init(): void {

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = LabelsConstant.TITLE_MIS_CONSECUTIVOS_SOLICITADOS;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_MIS_CONSECUTIVOS_SOLICITADOS;

    // se procede a obtener el cliente o el cliente asociado al usuario autenticado
    const clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // se procede a obtener el identificador del usuario autenticado
    this.idUsuarioAutenticado = LocalStoreUtil.getIdCurrentUsuario();

    // se consulta los datos iniciales para este modulo
    this.correspondenciaService.getInitMisConsecutivos(clienteCurrent.id, this.idUsuarioAutenticado).subscribe(
      data => {
        // se verifica si el usuario autenticado ha solicitado consecutivos
        if (data.consecutivos && data.consecutivos.cantidadTotal && data.consecutivos.cantidadTotal > 0) {

          // se configura el paginador
          const consecutivosPaginados = new PaginadorModel(this);
          consecutivosPaginados.configurarRegistros(data.consecutivos);

          // la fecha llega como string se debe hacer la conversion
          this.fechaActualSever = new Date(data.fechaActual);

          // se inicializa el state para el componente filtro de consecutivos
          const usuarios = null;
          this.stateFiltro.initComponentePadre(this,
            clienteCurrent,
            consecutivosPaginados,
            usuarios,
            new Date(this.fechaActualSever.getFullYear(), 0, 1),
            new Date(this.fechaActualSever.getFullYear(), 11, 31));

          // limpieza de memoria
          data = null;
        }
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite editar la informacion modificada del consecutivo seleccionado
   */
  public editarConsecutivoValores(): void {

    // se limpia mensajes de otros procesos
    this.messageService.clear();

    // solo aplica si hay alguna modificacion
    if (this.isAplicarEdicion) {

      // si hay valores para este consecutivo
      if (this.valuesEditar && this.valuesEditar.length > 0) {

        // se procede a configurar los valores modificados
        const modificados = Array<CampoModel>();
        for (const value of this.valuesEditar) {
          if (value.isValorModificado || !value.valorOrigen.idValue) {
            modificados.push(value);
          }
        }

        // se procede con la edicion solo si hay valores modificados
        if (modificados.length > 0) {

          // se hace el llamado de las validaciones por parte de FRONT-END
          const isValido = BusinessUtil.isValoresConsecutivoValido(
            modificados, this.regex, this.messageService, this.fechaActualSever);

          // se verifica que todo este OK
          if (isValido) {

            // Se configura el DTO para enviar al servicio de editar consecutivo valores
            const solicitud = new ConsecutivoEdicionDTO();
            solicitud.idCliente = this.stateFiltro.clienteCurrent.id;
            solicitud.idConsecutivo = this.consecutivoEdicion.consecutivo.idConsecutivo;
            solicitud.idNomenclatura = this.consecutivoEdicion.consecutivo.idNomenclatura;
            solicitud.valoresValidar = BusinessUtil.getCamposValidarBackEnd(modificados);
            solicitud.values = new Array<ConsecutivoEdicionValueDTO>();

            // se configuran el valor modificado de cada informacion del consecutivo
            for (const modificado of modificados) {

              // si ingresaron algun valor o el tipo de campo es CASILLA-VERIFICACION
              if (modificado.valor || modificado.campo.tipoCampo === this.stateFiltro.ID_CASILLA_VERIFICACION) {

                // se configura el valor a enviar para actualizar de acuerdo al tipo campo
                modificado.valorOrigen.valueUpdate = modificado.valor;
                switch (modificado.campo.tipoCampo) {

                  case this.stateFiltro.ID_LISTA_DESPLEGABLE: {
                    modificado.valorOrigen.valueUpdate = modificado.valor.id;
                    break;
                  }
                  case this.stateFiltro.ID_CASILLA_VERIFICACION: {
                    modificado.valorOrigen.valueUpdate = (modificado.valor) ? 1 : 0;
                    break;
                  }
                  case this.stateFiltro.ID_CAMPO_FECHA: {
                    modificado.valorOrigen.valueUpdate =
                      this.datePipe.transform(new Date(modificado.valor), LabelsConstant.FECHA_FORMATO_MYSQL);
                    break;
                  }
                }
              }

              // para el campo lista desplegable NO SE puede enviar los items
              if (modificado.campo.tipoCampo === this.stateFiltro.ID_LISTA_DESPLEGABLE) {
                const items = modificado.campo.items;
                modificado.campo.items = null;
                modificado.valorOrigen.campo = JSON.parse(JSON.stringify(modificado.campo));
                modificado.campo.items = items;
              }
              solicitud.values.push(modificado.valorOrigen);
            }

            // se procede a editar los valores del consecutivo
            this.correspondenciaService.editarConsecutivoValores(solicitud).subscribe(
              data => {
                // se muestra cada error por pantalla si lo hay
                if (data.errores && data.errores.length > 0) {
                  for (const error of data.errores) {
                    this.messageService.add(MsjUtil.getMsjError(error.mensaje));
                  }
                } else {
                  // se muestra el mensaje exitoso
                  this.messageService.add(MsjUtil.getToastSuccessLng(MsjFrontConstant.VALORES_CONSECUTIVO_ACTUALIZADO));

                  // se configura los valores retornados por el server
                  this.consecutivoEdicion.values = data.values;

                  // se desabilita el boton "Aplicar cambios"
                  this.isAplicarEdicion = false;

                  // se configura el modelo de los valores a editar
                  this.setModelValuesEditar();
                }
              },
              error => {
                this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
              }
            );
          }
        }
      }
    }
  }

  /**
   * Metodo que soporta el evento click del boton refrescar
   */
  public refresh(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se hace el backup de los datos del paginador esto por si hay errores
    this.stateFiltro.filtrosClone.paginador = this.stateFiltro.consecutivosPaginados.filtroBefore();

    // se procede a consultar los consecutivos
    this.correspondenciaService.getConsecutivosAnioActual(this.stateFiltro.filtrosClone).subscribe(
      data => {
        this.stateFiltro.consecutivosPaginados.filtroExitoso(this.tblConsecutivos, data);
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que es invocado por el paginador de la tabla
   */
  public paginar(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se configura el paginador dado que puede cambiar el skip o rowsperpage
    this.stateFiltro.filtrosClone.paginador = this.stateFiltro.consecutivosPaginados.datos;

    // se procede a consultar los consecutivos
    this.correspondenciaService.getConsecutivosAnioActual(this.stateFiltro.filtrosClone).subscribe(
      data => {
        this.stateFiltro.consecutivosPaginados.configurarRegistros(data);
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que soporta el evento click del boton filtrar
   */
  public filtrar(): void {

    // se hace el backup de los datos del paginador esto por si hay errores
    this.stateFiltro.filtros.paginador = this.stateFiltro.consecutivosPaginados.filtroBefore();

    // se procede a consultar los consecutivos
    this.correspondenciaService.getConsecutivosAnioActual(this.stateFiltro.filtros).subscribe(
      data => {
        // se configura los nuevos consecutivos
        this.stateFiltro.consecutivosPaginados.filtroExitoso(this.tblConsecutivos, data);

        // se notifica al componente filtro que la solicitud fue procesada exitosamente
        this.stateFiltro.componenteFiltro.filtroExitoso();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que soporta el evento click del boton Editar
   * permitiendo abrir el panel de edicion
   *
   * @param consecutivo seleccionado para su edicion
   */
  public abrirPanelEdicion(consecutivo: ConsecutivoDTO): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se construye el filtro de busqueda
    const filtro = new ConsecutivoEdicionDTO();
    filtro.idCliente = this.stateFiltro.clienteCurrent.id;
    filtro.idConsecutivo = consecutivo.idConsecutivo;

    // se procede a consultar los datos del consecutivo para su edicion
    this.correspondenciaService.getConsecutivoEdicion(filtro).subscribe(
      data => {
        // se configura los datos del consecutivo a editar
        this.consecutivoEdicion = data;
        this.setModelValuesEditar();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite soportar el evento click del boton regresar del panel edicion
   */
  public cerrarPanelEdicion(): void {
    if (this.isAplicarEdicion) {
      this.confirmationService.confirm({
        message: MsjFrontConstant.SEGURO_SALIR_EDICION,
        header: MsjFrontConstant.CONFIRMACION,
        accept: () => {
          this.spinnerState.displaySpinner();
          setTimeout(() => { this.limpiarDatosEdicion(); }, 100);
        }
      });
    } else {
      this.spinnerState.displaySpinner();
      setTimeout(() => { this.limpiarDatosEdicion(); }, 100);
    }
  }

  /**
   * Metodo que soporta el evento del boton 'Cargar Documento'
   *
   * @param event, contiene el documento seleccionado para el cargue
   */
  public cargarDocumento(event): void {

    // se limpia mensajes de errores
    this.messageService.clear();

    // se obtiene los archivo que contiene el evento
    const files = event.files;

    // el archivo es requerido para el cargue
    if (files) {

      // se configura los parametros para el cargue
      const parametros = new FormData();
      parametros.append('documento', files[0]);
      parametros.append('idCliente', this.stateFiltro.clienteCurrent.id + '');
      parametros.append('idConsecutivo', this.consecutivoEdicion.consecutivo.idConsecutivo + '');

      // se procede hacer la invocacion del cargue de documento
      this.correspondenciaService.cargarDocumento(parametros).subscribe(
        data => {
          this.consecutivoEdicion.documentos = data;
          this.messageService.add(MsjUtil.getToastSuccessLng(MsjFrontConstant.DOCUMENTO_CARGADO));
        },
        error => {
          let msj = this.showMensajeError(error);
          msj = msj.replace('?1', this.consecutivoEdicion.consecutivo.consecutivo);
          msj = msj.replace('?2', files[0].name);
          this.messageService.add(this.showErrorCargue(msj));
        }
      );
    }
  }

  /**
   * Metodo que permite descargar el documento seleccionado del panel editar consecutivo
   *
   * @param datosDocumento, son los datos del documento a descargar
   */
  public descargarDocumento(datosDocumento: DocumentoDTO): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // son los identificadores necesarios para la descarga
    const idCliente = this.stateFiltro.clienteCurrent.id;
    const idDocumento = datosDocumento.id;

    // se procede a descargar el documento
    this.correspondenciaService.descargarDocumento(idCliente, idDocumento).subscribe(
      data => {
        importedSaveAs(data, datosDocumento.nombreDocumento);
      },
      error => {
        this.messageService.add(this.showErrorCargue(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que soporta el evento de eliminar un documento
   *
   * @param documento, documento seleccionado para eliminarlo
   */
  public eliminarDocumento(documento: DocumentoDTO): void {

    // se limpia mensajes de errores
    this.messageService.clear();

    // se visualiza la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.DOCUMENTO_ELIMINAR_CONFIRMACION.replace('?1', documento.nombreDocumento),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {
        // se debe configurar el identifador del cliente
        documento.idCliente = this.stateFiltro.clienteCurrent.id;

        // se procede hacer la invocacion para eliminar el documento
        this.correspondenciaService.eliminarDocumento(documento).subscribe(
          data => {
            this.consecutivoEdicion.documentos = data;
            this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.DOCUMENTO_ELIMINADO));
          },
          error => {
            this.messageService.add(this.showErrorCargue(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que permite ACTIVAR o ANULAR un consecutivo
   *
   * @param consecutivo seleccionado para ACTIVAR o ANULAR
   */
  public activarAnularConsecutivo(consecutivo: ConsecutivoDTO): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // variables que se utilizan para la ventana de confirmacion
    let txtEstado = 'ACTIVAR';
    let idEstado = EstadoConstant.ID_ACTIVO;
    let classEstado = 'class="clr-anulado font-weight-bold pl-2 font-size-18"';

    // dependiendo del estado del consecutivo se configura su valor
    if (consecutivo.idEstado === EstadoConstant.ID_ACTIVO) {
      txtEstado = 'ANULAR';
      idEstado = EstadoConstant.ID_ANULADO;
      classEstado = 'class="clr-activo font-weight-bold pl-2 font-size-18"';
    }

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.CONFIRMAR_ACTIVAR_ANULAR_CONSECUTIVO
        .replace('?1', txtEstado)
        .replace('?2', consecutivo.nomenclatura)
        .replace('?3', classEstado)
        .replace('?4', consecutivo.consecutivo),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se configura los parametros para ACTIVAR o ANULAR el consecutivo
        const parametro = new ActivarAnularConsecutivoDTO();
        parametro.idCliente = this.stateFiltro.clienteCurrent.id;
        parametro.idConsecutivo = consecutivo.idConsecutivo;
        parametro.idEstado = idEstado;

        // se procede ANULAR o ACTIVAR el consecutivo
        this.correspondenciaService.activarAnularConsecutivo(parametro).subscribe(
          data => {
            // se cambia el estado del consecutivo para que se refleje en pantalla
            consecutivo.idEstado = idEstado;

            // Mensaje exitoso, el cambio fue exitoso
            this.messageService.add(MsjUtil.getToastSuccessLng(MsjFrontConstant.ESTADO_CONSECUTIVO_ACTUALIZADO));
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que soporta el evento click del boton Ceder Consecutivo
   */
  public transferirConsecutivo(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se construye los parametros necesarios para el proceso
    const parametros = new TransferirConsecutivoDTO();
    parametros.idCliente = this.stateFiltro.clienteCurrent.id;
    parametros.idConsecutivo = this.modalTransferir.data.idConsecutivo;
    parametros.idUsuario = this.idUsuarioAutenticado;
    parametros.idUsuarioTransferir = this.usuarioElegidoTransferir.id;

    // se debe configurar el filtro de busqueda con los datos paginados clonados
    this.stateFiltro.filtrosClone.paginador = this.stateFiltro.consecutivosPaginados.filtroBefore();
    parametros.filtro = this.stateFiltro.filtrosClone;

    // se invoca el servicio para transferir el consecutivo
    this.correspondenciaService.transferirConsecutivo(parametros).subscribe(
      data => {
        // se configura los consecutivos retornados por el servicio
        this.stateFiltro.consecutivosPaginados.filtroExitoso(this.tblConsecutivos, data.responseConsecutivos);

        // Mensaje exitoso, el cambio fue exitoso
        this.messageService.add(MsjUtil.getToastSuccessMedium(MsjFrontConstant.CONSECUTIVO_CEDIDO));

        // se cierra el modal de tranferir
        this.cerrarModalTransferir();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite abrir el modal para transferir un consecutivo a otro usuario
   *
   * @param consecutivo , Consecutivo seleccionado para transferir
   * a otro usuario seleccionado en el modal
   */
  public abrirModalTransferir(consecutivo: ConsecutivoDTO): void {

    // se define el componente steps para la transferencia
    this.setStepsTransferir();

    // se verifica si se debe consultar los usuarios activos
    if (!this.usuariosTransferirOrigen || this.usuariosTransferirOrigen.length === 0) {

      // se procede a consultar los usuario activo en el sistema
      this.correspondenciaService.getUsuariosTransferir(
        this.stateFiltro.clienteCurrent.id,
        this.idUsuarioAutenticado).subscribe(
        data => {
          // se configura los usuarios consultados
          this.usuariosTransferirOrigen = data;
          this.usuariosTransferir = data;

          // se muestra el modal para permitir transferir el consecutivo
          this.setModalTransferir(consecutivo);
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    } else {
      // si los usuarios ya fueron consultados solamente se abre el modal
      this.setModalTransferir(consecutivo);
    }
  }

  /**
   * Metodo que soporta el evento click del boton Salir del modal transferir
   */
  public cerrarModalTransferir(): void {
    this.modalTransferir.closeModal();
    this.usuarioElegidoTransferir = null;
    this.filterNombreUsuario = null;
    this.usuariosTransferir = this.usuariosTransferirOrigen;
  }

  /**
   * Metodo que soporta el evento click del boton Siguiente del modal
   * transferir consecutivo a un usuario seleccionado
   */
  public irSegundoStepTranferir(): void {
    if (this.usuarioElegidoTransferir) {
      this.stepsTransferencia.irSegundoStep();
    }
  }

  /**
   * Metodo que permite soportar el evento filter por nombre usuario
   */
  public busquedaNombreUsuario(): void {

    // el valor del filtro no puede ser indefinido
    if (this.filterNombreUsuario && this.filterNombreUsuario.length > 0) {

      // se crea la instancia de la lista de usuarios filtro
      this.usuariosTransferir = new Array<SelectItemDTO>();

      // se busca el usuario que coincide con el valor
      for (const user of this.usuariosTransferirOrigen) {
        if (user.label && user.label.toUpperCase().includes(this.filterNombreUsuario.toUpperCase())) {
            this.usuariosTransferir.push(user);
        }
      }
    } else {
      this.usuariosTransferir = this.usuariosTransferirOrigen;
    }

    // se refresca la tabla de usuarios transferir
    this.tblusers.reset();
  }

  /**
   * Metodo que soporta el valueChanged para los campos tipo INPUT para edicion
   * @param valueInput, contiene la informacion del INPUT a validar
   */
  public inputChangedEdicion(valueInput: CampoModel): void {

    // se inicializa como no mofificado
    valueInput.isValorModificado = false;

    // se toma el valor y se limpia los espacios en blanco
    const valorInput = this.setTrimFilter(valueInput.valor);

    // verifica si el valor fue modificado cambiando la bandera
    if (valorInput !== valueInput.valorOrigen.value) {
      valueInput.isValorModificado = true;
    } else {
      valueInput.isValido = true;
    }

    // se verifica si hay algun campo modificado
    this.setIsAplicarEdicion();
  }

  /**
   * Metodo que soporta el valueChanged para los campos tipo SELECT para edicion
   * @param valueSelect, contiene la informacion del SELECT a validar
   */
  public selectChangedEdicion(valueSelect: CampoModel): void {

    // se inicializa como no mofificado
    valueSelect.isValorModificado = false;

    // si NO tiene ID-VALUE es porque es un campo nuevo
    if (valueSelect.valorOrigen.idValue) {

      // se verifica si ambos tienen Item seleccionado
      if (valueSelect.valor && valueSelect.valorOrigen.value) {

        // si ambos tiene su item, se procede a verificar su ID
        if (valueSelect.valor.id !== valueSelect.valorOrigen.value.id) {
          valueSelect.isValorModificado = true;
        }
      } else if (valueSelect.valor || valueSelect.valorOrigen.value) {
        // si alguno de los dos valores tiene su ITEM es porque fue modificado
        valueSelect.isValorModificado = true;
      }
    } else if (valueSelect.valor) {
      // para un campo nuevo solamente se verifica si hay valor seleccionado
      valueSelect.isValorModificado = true;
    }

    // se limpia la bandera de IS VALIDO solo si no fue modificado
    if (!valueSelect.isValorModificado) {
      valueSelect.isValido = true;
    }

    // se verifica si hay algun campo modificado
    this.setIsAplicarEdicion();
  }

  /**
   * Metodo que soporta el valueChanged para los campos tipo CASILLA para edicion
   * @param valueCasilla, contiene la informacion de la CASILLA a validar
   */
  public casillaChangedEdicion(valueCasilla: CampoModel): void {

    // se inicializa como no mofificado
    valueCasilla.isValorModificado = false;

    // si NO tiene ID-VALUE es porque es un campo nuevo
    if (valueCasilla.valorOrigen.idValue) {
      if (valueCasilla.valor !== valueCasilla.valorOrigen.value) {
        valueCasilla.isValorModificado = true;
      }
    } else {
      valueCasilla.isValorModificado = true;
    }

    // se verifica si hay algun campo modificado
    this.setIsAplicarEdicion();
  }

  /**
   * Metodo que soporta el valueChanged para los campos tipo FECHA para edicion
   * @param valueFecha, contiene la informacion de la FECHA a validar
   */
  public fechaChangedEdicion(valueFecha: CampoModel): void {

    // se inicializa como no mofificado
    valueFecha.isValorModificado = false;

    // verifica si el valor fue modificado cambiando la bandera
    const sonIguales = FechaUtil.iqualsDateFilter(valueFecha.valorOrigen.value, valueFecha.valor);
    if (!sonIguales) {
      valueFecha.isValorModificado = true;
    } else {
      valueFecha.isValido = true;
    }

    // se verifica si hay algun campo modificado
    this.setIsAplicarEdicion();
  }

  /**
   * Metodo que permite configurar el modelo de los valores a editar
   */
  private setModelValuesEditar(): void {

    // se limpia por si hay datos anteriores
    this.valuesEditar = null;

    // se obtiene los values del consecutivo a editar
    const values = this.consecutivoEdicion.values;

    // solo aplica si hay values para editar
    if (values && values.length > 0) {

      // se utiliza para validar los input de los valores a editar
      this.setRegex();

      // se crea la lista del modelo de los valores a editar
      this.valuesEditar = new Array<CampoModel>();

      // se recorre todos los valores del consecutivo a editar
      let campoModel;
      for (const value of values) {

        // los valores tipo fecha llega como string se debe hacer la conversion
        if (this.stateFiltro.ID_CAMPO_FECHA === value.campo.tipoCampo) {
          value.value = FechaUtil.stringToDate(value.value);
        }

        // se crea el modelo del campo
        campoModel = new CampoModel();
        campoModel.initEdicion(value, this.fechaActualSever);

        // se agrega a la lista a visualizar
        this.valuesEditar.push(campoModel);
      }
    }
  }

  /**
   * Metodo que permite verificar si algun campo fue modificado para su edicion
   */
  private setIsAplicarEdicion(): void {
    this.isAplicarEdicion = false;
    if (this.valuesEditar && this.valuesEditar.length > 0) {
      for (const value of this.valuesEditar) {
        if (value.isValorModificado) {
          this.isAplicarEdicion = true;
          break;
        }
      }
    }
  }

  /**
   * Metodo que permite configurar el steps para transferir consecutivo
   */
  private setStepsTransferir(): void {
    if (!this.stepsTransferencia) {
      this.stepsTransferencia = new StepsModel();
      this.stepsTransferencia.stepsParaTransferirConsecutivo();
    } else {
      this.stepsTransferencia.irPrimerStep();
    }
  }

  /**
   * Metodo que permite configurar el model para el modal de transferir consecutivo
   * @param consecutivo seleccionado para ceder a otro usuario
   */
  private setModalTransferir(consecutivo: ConsecutivoDTO): void {
    if (!this.modalTransferir) {
      this.modalTransferir = new VentanaModalModel();
    }
    this.modalTransferir.showModal(consecutivo);
  }

  /**
   * Metodo que permite visualizar los mensajes de error del cargue documentos
   */
  private showErrorCargue(detail: string): Message {
    return {
      key: 'docs',
      severity: LabelsConstant.ERROR,
      summary: MsjFrontConstant.ERROR,
      detail: detail
    };
  }

  /**
   * Metodo para configurar el REGEX para la edicion del consecutivo
   */
  private setRegex(): void {
    if (!this.regex) {
      this.regex = new RegexUtil();
    }
  }

  /**
   * Metodo que permite limpiar los datos de edicion
   */
  private limpiarDatosEdicion(): void {
    this.spinnerState.hideSpinner();
    this.consecutivoEdicion = null;
    this.valuesEditar = null;
    this.isAplicarEdicion = false;
  }
}
