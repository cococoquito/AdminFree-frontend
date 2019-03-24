import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { FiltroConsecutivosState } from '../../../states/transversal/filtro-consecutivos.state';
import { ActivarAnularConsecutivoDTO } from '../../../dtos/correspondencia/activar-anular-consecutivo.dto';
import { TransferirConsecutivoDTO } from '../../../dtos/correspondencia/transferir-consecutivo.dto';
import { ConsecutivoDTO } from '../../../dtos/correspondencia/consecutivo.dto';
import { SelectItemDTO } from '../../../dtos/transversal/select-item.dto';
import { PaginadorModel } from '../../../model/paginador-model';
import { VentanaModalModel } from '../../../model/ventana-modal.model';
import { StepsModel } from '../../../model/steps-model';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from '../../../util/messages.util';
import { LabelsConstant } from '../../../constants/labels.constant';
import { MsjFrontConstant } from '../../../constants/messages-frontend.constant';
import { EstadoConstant } from '../../../constants/estado.constant';

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
   */
  constructor(
    protected messageService: MessageService,
    private correspondenciaService: CorrespondenciaService,
    private confirmationService: ConfirmationService,
    private shellState: ShellState,
    public stateFiltro: FiltroConsecutivosState) {
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
          data.fechaActual = new Date(data.fechaActual);

          // se inicializa el state para el componente filtro de consecutivos
          const usuarios = null;
          this.stateFiltro.initComponentePadre(this,
            clienteCurrent,
            consecutivosPaginados,
            usuarios,
            new Date(data.fechaActual.getFullYear(), 0, 1),
            new Date(data.fechaActual.getFullYear(), 11, 31));

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
   * Metodo que soporta el evento click del boton transferir de la tabla de consecutivos
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
   * Metodo que soporta el evento click del boton Siguiente del modal
   * transferir consecutivo a un usuario seleccionado
   */
  public irSegundoStepTranferir(): void {
    if (this.usuarioElegidoTransferir) {
      this.stepsTransferencia.irSegundoStep();
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
}
