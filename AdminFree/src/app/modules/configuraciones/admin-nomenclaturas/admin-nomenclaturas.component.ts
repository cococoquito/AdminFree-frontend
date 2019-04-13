import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfiguracionesService } from '../../../services/configuraciones.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { SpinnerState } from '../../../states/spinner.state';
import { CampoEntradaDTO } from './../../../dtos/configuraciones/campo-entrada.dto';
import { NomenclaturaEdicionDTO } from '../../../dtos/configuraciones/nomenclatura-edicion.dto';
import { NomenclaturaCampoDTO } from './../../../dtos/configuraciones/nomenclatura-campo.dto';
import { NomenclaturaDTO } from '../../../dtos/configuraciones/nomenclatura.dto';
import { ClienteDTO } from '../../../dtos/configuraciones/cliente.dto';
import { RestriccionDTO } from '../../../dtos/configuraciones/restriccion.dto';
import { StepsModel } from '../../../model/steps-model';
import { VentanaModalModel } from '../../../model/ventana-modal.model';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { RegexUtil } from '../../../util/regex-util';
import { MsjUtil } from '../../../util/messages.util';
import { LabelsConstant } from '../../../constants/labels.constant';
import { MsjFrontConstant } from '../../../constants/messages-frontend.constant';
import { ModulesTokenConstant } from '../../../constants/modules-token.constant';
import { TipoCamposConstant } from '../../../constants/tipo-campos.constant';
import { RestriccionesKeyConstant } from '../../../constants/restricciones-key.constant';

/**
 * Componente para la administracion de las Nomenclaturas
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './admin-nomenclaturas.component.html',
  providers: [ ConfiguracionesService ]
})
export class AdminNomenclaturasComponent extends CommonComponent implements OnInit, OnDestroy {

  /** cliente autenticado o es el cliente asociado al usuario */
  private clienteCurrent: ClienteDTO;

  /** Lista de nomenclaturas asociado al cliente */
  public nomenclaturas: Array<NomenclaturaDTO>;

  /** Bandera que indica si el proceso es creacion */
  public isCreacion: boolean;

  /** Bandera que indica si el proceso es edicion */
  public isEdicion: boolean;

  /** se utiliza para visualizar el detalle de la nomenclatura*/
  public verDetalleNomenclatura: VentanaModalModel;

  /** Se utiliza para la creacion o edicion de la nomenclatura*/
  public nomenclaturaCU: NomenclaturaDTO;

  /** Se utiliza para comprobar si se debe hacer la validacion al momento de la creacion*/
  private nomeclaturaValueBK: string;

  /** Se utiliza para la edicion de la nomenclatura*/
  public datosEdicion: NomenclaturaEdicionDTO;

  /** Se utiliza para actualizar los datos modificados para que se refleje en la lista*/
  public nomenclaturaEdicion: NomenclaturaDTO;

  /** Modelo del componente steps, se utiliza para la creacion o edicion*/
  public stepsModel: StepsModel;

  /** Se utiliza para validar los valores de los inputs*/
  public regex: RegexUtil;

  /** Estos son los campos que se visualizara en la pantalla para creacion o edicion*/
  public campos: Array<CampoEntradaDTO>;

  /** Es el campo seleccionado para ordenar*/
  public campoOrden: CampoEntradaDTO;

  /** Se utiliza para consevar las restricciones expandidas de la tabla campos*/
  public expandedRowKeys: Array<number>;

  /** Se utiliza para consevar las restricciones expandidas de la tabla campos del paso de confirmacion*/
  public expandedRowKeysConf: Array<number>;

  /** Token del modulo de configuraciones*/
  public TK_CONFIGURACIONES = ModulesTokenConstant.TK_CONFIGURACIONES;

  /** Identificador para el tipo de campo CASILLA DE VERIFICACION*/
  public ID_CASILLA_VERIFICACION = TipoCamposConstant.ID_CASILLA_VERIFICACION;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para mostrar el
   * modal de confirmacion para diferente procesos
   *
   * @param configuracionesService, contiene los servicios necesarios
   * para la administracion de las nomenclaturas
   *
   * @param shellState, se utiliza para el titulo del componente
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   */
  constructor(
    protected messageService: MessageService,
    private confirmationService: ConfirmationService,
    private configuracionesService: ConfiguracionesService,
    private shellState: ShellState,
    private spinnerState: SpinnerState) {
    super();
  }

  /**
   * Se debe consultar las nomenclaturas asociados al cliente autenticado
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Se utiliza para limpiar los mensajes visualizados pantalla
   */
  ngOnDestroy(): void {
    this.messageService.clear();
  }

  /**
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a consultar las
   * nomenclaturas relacionado al cliente autenticado
   */
  private init(): void {

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = LabelsConstant.TITLE_ADMIN_NOMENCLATURAS;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_ADMIN_NOMENCLATURAS;

    // se procede a obtener el cliente autenticado
    this.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    /** Se utiliza para validar los valores de los inputs*/
    this.regex = new RegexUtil();

    // se consulta las nomenclaturas asociados al cliente autenticado
    this.configuracionesService.getNomenclaturas(this.clienteCurrent.id).subscribe(
      data => {
        this.nomenclaturas = data;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite crear la nomenclatura en el sistema
   */
  public crearNomenclatura(): void {

    // se limpia mensajes de otros procesos
    this.messageService.clear();

    // se configura el orden de los campos
    this.configurarOrdenacionCampos();

    // se hace el llamado HTTP para la creacion de la nomenclatura
    this.configuracionesService.crearNomenclatura(this.nomenclaturaCU).subscribe(
      data => {
        // se agrega la nueva nomenclatura en la lista visualizada en pantalla
        this.nomenclaturas.push(data);

        // se muestra el mensaje exitoso
        this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.NOMENCLATURA_CREADA_EXITOSO));

        // se limpian los datos de la creacion
        this.limpiarCamposCU();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite editar la nomenclatura seleccionada
   */
  public editarNomenclatura(): void {

    // solo aplica si hay modificaciones
    if (this.datosEdicion.datosBasicosEditar || this.datosEdicion.camposEntradaEditar || this.datosEdicion.restriccionesEditar) {

      // se limpia mensajes de otros procesos
      this.messageService.clear();

      // se hace el backup por si hay errores en la edicion
      const nomenclaturaBK = this.datosEdicion.nomenclatura;

      // se configura la nomenclatura a modificar
      this.datosEdicion.nomenclatura = this.nomenclaturaCU;

      // se hace el llamado HTTP para la edicion de la nomenclatura
      this.configuracionesService.editarNomenclatura(this.datosEdicion).subscribe(
        data => {
          // se muestra el mensaje exitoso
          this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.NOMENCLATURA_ACTUALIZADO_EXITOSO));

          // se refresca los datos basicos de la nomenclatura si fueron modificados
          if (this.datosEdicion.datosBasicosEditar) {
            this.nomenclaturaEdicion.nomenclatura = this.nomenclaturaCU.nomenclatura;
            this.nomenclaturaEdicion.descripcion = this.nomenclaturaCU.descripcion;
            this.nomenclaturaEdicion.consecutivoInicial = this.nomenclaturaCU.consecutivoInicial;
          }

          // se limpian los datos de la creacion
          this.limpiarCamposCU();
        },
        error => {
          this.datosEdicion.nomenclatura = nomenclaturaBK;
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    }
  }

  /**
   * Metodo que soporta el evento del boton eliminar nomenclatura
   *
   * @param nomenclatura, es la nomenclatura seleccionada para eliminar
   */
  public eliminarNomenclatura(nomenclatura: NomenclaturaDTO): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.ELIMINAR_NOMENCLATURA.replace('?1', nomenclatura.nomenclatura),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se procede a eliminar la nomenclatura seleccionada
        this.configuracionesService.eliminarNomenclatura(nomenclatura.id).subscribe(
          data => {
            // Mensaje exitoso, nomenclatura fue eliminado
            this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.NOMENCLATURA_ELIMINADO));

            // se elimina de la lista visualizada en la pagina
            this.nomenclaturas.splice(this.nomenclaturas.indexOf(nomenclatura, 0), 1);
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que soporta el evento click del boton ver detalle
   *
   * @param nomenclatura , nomenclatura seleccionada para ver el detalle
   */
  public showModalVerDetalle(nomenclatura: NomenclaturaDTO): void {
    this.configuracionesService.getDetalleNomenclatura(nomenclatura.id).subscribe(
      data => {
        if (!this.verDetalleNomenclatura) {
          this.verDetalleNomenclatura = new VentanaModalModel();
        }
        this.verDetalleNomenclatura.showModal(data);
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite abrir el panel de creacion de la nomenclatura
   */
  public showPanelCreacion(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // este es el DTO que se utiliza para la creacion o edicion
    this.nomenclaturaCU = new NomenclaturaDTO();
    this.nomenclaturaCU.idCliente = this.clienteCurrent.id;

    // esta bandera visualiza el panel de creacion
    this.isCreacion = true;

    // se define el componente steps para la creacion
    this.getStepsModelAndExpanded();

    // si NO HAY campos consultados se procede a obtenerlos
    if (!this.campos || this.campos.length === 0) {
      const isRestriccion = 1;
      this.configuracionesService.getCamposEntrada(this.clienteCurrent.id, isRestriccion).subscribe(
        data => {
          // se configura los campos consultados
          this.campos = data;

          // para las casillas de verificacion se debe empezar por NO
          this.setNOCasillaVerificacion();
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    } else {
      // si hay campos consultados solo se limpia las banderas
      this.limpiarBanderasCampos();

      // para las casillas de verificacion se debe empezar por NO
      this.setNOCasillaVerificacion();
    }
  }

  /**
   * Metodo que permite abrir el panel de edicion de la nomenclatura
   *
   * @param nomenclatura , DTO que contiene los datos de la nomenclatura
   */
  public showPanelEdicion(nomenclatura: NomenclaturaDTO): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // indica si se debe consultar los campos
    const isGetCampos = (this.campos && this.campos.length > 0) ? 0 : 1;

    // se consulta el detalle de la nomenclatura para la edicion
    this.configuracionesService.getDetalleNomenclaturaEdicion(nomenclatura.id, this.clienteCurrent.id, isGetCampos).subscribe(
      data => {

        // se configuran los campos de informacion con sus restricciones
        if (isGetCampos === 1) {
          this.campos = data.campos;
          data.campos = null;
        } else {
          this.limpiarBanderasCampos();
        }

        // se configura los datos de la edicion de la nomenclatura
        this.datosEdicion = data;
        this.datosEdicion.nomenclatura.idCliente = this.clienteCurrent.id;

        // se hace el backup de los atributos
        this.nomenclaturaCU = JSON.parse(JSON.stringify(this.datosEdicion.nomenclatura));

        // se visualiza el panel de edicion
        this.isEdicion = true;

        // Se utiliza para actualizar los datos modificados para que se refleje en la lista
        this.nomenclaturaEdicion = nomenclatura;

        // se define el componente steps para la edicion
        this.getStepsModelAndExpanded();

        // se configura los campos y restricciones asociados a la nomenclatura a editar
        this.setCamposNomenclatura();

        // mensaje cuando la nomenclatura tiene consecutivos
        if (this.nomenclaturaCU.cantConsecutivos && this.nomenclaturaCU.cantConsecutivos > 0) {
          this.messageService.add(MsjUtil.getInfo(MsjFrontConstant.NOMENCLATURA_CON_CONSECUTIVO));
        }
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite cerrar el panel de creacion o edicion de nomenclaturas
   */
  public closePanelCU(): void {

    // para creacion se pregunta directamente
    if (this.isCreacion) {
        this.confirmationService.confirm({
        message: MsjFrontConstant.SEGURO_SALIR,
        header: MsjFrontConstant.CONFIRMACION,
        accept: () => {
          this.messageService.clear();
          this.limpiarCamposCU();
        }
      });
    } else {
      // si hay modificaciones se muestra el modal confirmacion
      if (this.datosEdicion.datosBasicosEditar ||
          this.datosEdicion.camposEntradaEditar ||
          this.datosEdicion.restriccionesEditar) {
          this.confirmationService.confirm({
          message: MsjFrontConstant.SEGURO_SALIR_EDICION,
          header: MsjFrontConstant.CONFIRMACION,
          accept: () => {
            this.messageService.clear();
            this.limpiarCamposCU();
          }
        });
      } else {
        this.messageService.clear();
        this.limpiarCamposCU();
      }
    }
  }

  /**
   * Es el evento del boton siguiente para el paso (Datos de la Nomenclatura)
   */
  public siguienteDatosNomenclatura(): void {
    if (this.isCreacion) {
      this.siguienteDatosCreacion();
    } else {
      this.siguienteDatosEdicion();
    }
  }

  /**
   * Es el evento del boton siguiente para el paso (Campos)
   */
  public siguienteCamposEntrada(): void {
    if (this.isCreacion) {
      this.siguienteCamposEntradaCreacion();
    } else {
      this.siguienteCamposEntradaEdicion();
    }
  }

  /**
   * Soporta el evento click para ordernar
   *
   * @param tipo, identifica el tipo de ordenacion UP o DOWN
   */
  public ordernar(tipo: number): void {

    // debe existir un campo seleccionado para la ordenacion
    if (this.campoOrden && this.campoOrden.id) {

      // se busca el index del campo seleccionado
      let index = 0;
      for (const campo of this.campos) {
        if (campo.id === this.campoOrden.id) {
          break;
        }
        index = index + 1;
      }

      // se valida el tipo de ordenacion, 1=up, 0=down
      if (tipo === 1) {

        // para UP el index debe ser mayor que ZERO
        if (index > 0) {
          this.campos[index] = this.campos[index - 1];
          this.campos[index - 1] = this.campoOrden;
        }
      } else {

        // para DOWN el index debe ser menor que el tamanio de la lista
        if (index < (this.campos.length - 1)) {
          this.campos[index] = this.campos[index + 1];
          this.campos[index + 1] = this.campoOrden;
        }
      }
    }
  }

  /**
   * Se utiliza cuando el usuario da click en alguna restriccion
   *
   * @param restriccion, es la restriccion seleccionada al dar click
   */
  public changeRestriccion(restriccion: RestriccionDTO, campo: CampoEntradaDTO): void {

    // se valida si este campo tiene campo no compatibles
    if (restriccion.compatible) {

      // se separa los ids de no compatibles
      const noCompatibles = restriccion.compatible.split(',');

      // se recorre todo los demas campos para validar si es compatible
      for (const other of campo.restricciones) {

        // se verifica si esta restriccion aplica
        if (other.aplica && other.id !== restriccion.id) {

          // si la noCompatibles lo incluye la restriccion no debe ser aplicada
          if (noCompatibles.includes(other.id + '')) {
            other.aplica = false;
          }
        }
      }
    }
  }

  /**
   * Evento del boton siguiente para el paso (Datos de la Nomenclatura) CREACION
   */
  private siguienteDatosCreacion(): void {

    // el consecutivo inicial debe ser numerico
    if (!this.regex.isValorNumerico(this.nomenclaturaCU.consecutivoInicial + '')) {
        this.messageService.add(MsjUtil.getToastErrorMedium(this.regex.getMsjSoloNumeros('Consecutivo Inicial')));
        return;
    }

    // se limpian los espacios
    this.nomenclaturaCU.nomenclatura = this.setTrim(this.nomenclaturaCU.nomenclatura);
    this.nomenclaturaCU.descripcion = this.setTrim(this.nomenclaturaCU.descripcion);

    // se verifica si se debe validar la nomenclatura
    if (this.nomeclaturaValueBK && this.nomeclaturaValueBK === this.nomenclaturaCU.nomenclatura) {
        this.stepsModel.irSegundoStep(this.spinnerState);
        return;
    }

    // se procede a validar si ya existe la nomenclatura ingresada
    this.configuracionesService.validarExisteNomenclatura(this.nomenclaturaCU).subscribe(
      data => {
        // copia del valor de la nomenclatura por si regresan a este punto
        this.nomeclaturaValueBK = this.nomenclaturaCU.nomenclatura;

        // se procede a seguir al segundo paso
        this.stepsModel.irSegundoStep();
      },
      error => {
        const msj = this.showMensajeError(error);
        this.messageService.add(MsjUtil.getMsjError(msj.replace('?', this.nomenclaturaCU.nomenclatura)));
      }
    );
  }

  /**
   * Evento del boton siguiente para el paso (Datos de la Nomenclatura) EDICION
   */
  private siguienteDatosEdicion(): void {

    // se limpia la bandera que permite editar los valores
    this.datosEdicion.datosBasicosEditar = false;

    // el consecutivo inicial debe ser numerico
    if (!this.regex.isValorNumerico(this.nomenclaturaCU.consecutivoInicial + '')) {
      this.messageService.add(MsjUtil.getToastErrorMedium(this.regex.getMsjSoloNumeros('Consecutivo Inicial')));
      return;
    }

    // se limpian los espacios
    this.nomenclaturaCU.nomenclatura = this.setTrim(this.nomenclaturaCU.nomenclatura);
    this.nomenclaturaCU.descripcion = this.setTrim(this.nomenclaturaCU.descripcion);
    this.nomenclaturaCU.consecutivoInicial = Number(this.nomenclaturaCU.consecutivoInicial);

    // se obtiene el origen de los datos de la nomenclatura
    const nomenclaturaBK = this.datosEdicion.nomenclatura;

    // si no hay ningun cambio solamente se pasa al segundo paso
    if (nomenclaturaBK.nomenclatura !== this.nomenclaturaCU.nomenclatura ||
        nomenclaturaBK.descripcion !== this.nomenclaturaCU.descripcion ||
        nomenclaturaBK.consecutivoInicial !== this.nomenclaturaCU.consecutivoInicial) {

      // se indica que hay modificaciones en los datos basicos
      this.datosEdicion.datosBasicosEditar = true;

      // se llama la validacion si la nomenclatura fue modificado
      if (nomenclaturaBK.nomenclatura !== this.nomenclaturaCU.nomenclatura) {

        // se procede a validar si ya existe la nomenclatura modificada
        this.configuracionesService.validarExisteNomenclatura(this.nomenclaturaCU).subscribe(
          data => {
            this.stepsModel.irSegundoStep();
          },
          error => {
            const msj = this.showMensajeError(error);
            this.messageService.add(MsjUtil.getMsjError(msj.replace('?', this.nomenclaturaCU.nomenclatura)));
          }
        );
        return;
      }
    }
    this.stepsModel.irSegundoStep(this.spinnerState);
  }

  /**
   * Es el evento del boton siguiente para el paso (Campos) CREACION
   */
  private siguienteCamposEntradaCreacion(): void {

    // se configura los campos seleccionados para la nomenclatura
    this.getCamposSeleccionados();

    // Ultimo paso, confirmacion
    this.stepsModel.irUltimoStep(this.spinnerState);
  }

  /**
   * Es el evento del boton siguiente para el paso (Campos) Edicion
   */
  private siguienteCamposEntradaEdicion(): void {

    // se configura los campos seleccionados para la nomenclatura
    this.getCamposSeleccionados();

    // se configura la ordenacion de los campos
    this.configurarOrdenacionCampos();

    // Se valida si hay campos modificados
    this.isCamposModificados();

    // si no hay campos modificados se valida si el orden se modifico
    if (!this.datosEdicion.camposEntradaEditar) {
      this.isOrdenModificado();
    }

    // si no hay campos modificados se valida si las restricciones se modificaron
    if (!this.datosEdicion.camposEntradaEditar) {
      this.isRestriccionesModificado();
    }

    // Ultimo paso, confirmacion
    this.stepsModel.irUltimoStep(this.spinnerState);
  }

  /**
   * Permite limpiar los datos utilizado para la CREACION o EDICION de la nomenclatura
   */
  private limpiarCamposCU(): void {
    this.nomenclaturaEdicion = null;
    this.nomeclaturaValueBK = null;
    this.expandedRowKeys = null;
    this.expandedRowKeysConf = null;
    this.campoOrden = null;
    this.nomenclaturaCU = null;
    this.datosEdicion = null;
    this.isCreacion = false;
    this.isEdicion = false;
  }

  /**
   * Se utiliza para definir el modelo del componente steps
   */
  private getStepsModelAndExpanded(): void {
    if (this.stepsModel) {
      this.stepsModel.irPrimerStep();
    } else {
      this.stepsModel = new StepsModel();
      this.stepsModel.stepsParaAdminNomenclaturas();
    }

    // se utiliza para expandir los campos
    this.expandedRowKeys = new Array<number>();
    this.expandedRowKeysConf = new Array<number>();
  }

  /**
   * Metodo que permite configurar los campos que
   * le pertenece una nomenclatura para ser modificados
   */
  private setCamposNomenclatura(): void {

    // se verifica si hay campos parametrizados en el sistema
    if (this.campos && this.campos.length > 0) {

      // se verifica si la nomenclatura a editar si tiene campos asociados
      const camposNomenclatura = this.datosEdicion.nomenclatura.campos;
      if (camposNomenclatura && camposNomenclatura.length > 0) {

        // son los campos a reemplazar por los campos a visualizar en pantalla
        const camposBK = new Array<CampoEntradaDTO>();

        // se recorre los campos asociados a la nomenclatura
        for (const campoNomenclatura of camposNomenclatura) {

          // se recorre los campos parametrizados en el sistema
          for (const campo of this.campos) {

            // se verifica si es el mismo campo
            if (campoNomenclatura.idCampo === campo.id) {

              // se configura la bandera SI APLICA
              campo.aplica = true;

              // objecto que indica que el campo tiene una nomenclatura asociada
              campo.campoNomenclatura = campoNomenclatura;

              // se verifica si el campo de la nomenclatura a modificar tiene restricciones
              const restricciones = campoNomenclatura.restricciones;
              if (restricciones && restricciones.length > 0) {

                // se verifica si el campo tiene restricciones
                const restriccionesCampo = campo.restricciones;
                if (restriccionesCampo && restriccionesCampo.length > 0) {

                  // se configura la bandera que indica que si aplica
                  for (const restriccion of restricciones) {
                    for (const restriccionCampo of restriccionesCampo) {
                      if (restriccionCampo.id === restriccion.id) {
                        restriccionCampo.aplica = true;
                        break;
                      }
                    }
                  }
                }
              }

              // se agrega en la lista a visualizar en pantalla
              camposBK.push(campo);
              break;
            }
          }
        }

        // se agrega el resto de campos que no fueron seleccionados
        for (const campo of this.campos) {
          if (!campo.aplica) {
            camposBK.push(campo);
          }
        }

        // se reemplaza los campos por los nuevos ordenados
        this.campos = camposBK;
      }
    }
  }

  /**
   * Metodo que permite configurar los campos seleccionados
   * para creacion o modificacion de la nomenclatura
   */
  private getCamposSeleccionados(): void {

    // se configura los campos seleccionados para la nomenclatura
    this.nomenclaturaCU.campos = null;

    // se valida si hay campos parametrizados en el sistema
    if (this.campos && this.campos.length > 0) {

      // se recorre todos los campos en busqueda de los seleccionados
      for (const campo of this.campos) {
        if (campo.aplica) {

          // el ID del campo se utiliza para la creacion o modificacion
          const seleccionado = new NomenclaturaCampoDTO();
          seleccionado.idCampo = campo.id;

          // nombre campo y tipo campo se utiliza para visualizarlos en pantalla de confirmacion
          seleccionado.nombreCampo = campo.nombre;
          seleccionado.tipoCampo = campo.tipoCampoNombre;

          // id campo nomenclatura y tiene consecutivo se utiliza para la modificacion
          if (campo.campoNomenclatura) {
            seleccionado.tieneConsecutivo = campo.campoNomenclatura.tieneConsecutivo;
            seleccionado.id = campo.campoNomenclatura.id;
          }

          // se configura las restricciones seleccionadas para este campo
          if (campo.restricciones) {
            for (const restriccion of campo.restricciones) {
              if (restriccion.aplica) {
                if (!seleccionado.restricciones) {
                  seleccionado.restricciones = new Array<RestriccionDTO>();
                }
                seleccionado.restricciones.push(restriccion);
              }
            }
          }

          // se agrega en la lista de creacion
          if (!this.nomenclaturaCU.campos) {
              this.nomenclaturaCU.campos = new Array<NomenclaturaCampoDTO>();
          }
          this.nomenclaturaCU.campos.push(seleccionado);
        }
      }
    }
  }

  /**
   * Permite configurar el orden de los campos
   */
  private configurarOrdenacionCampos(): void {
    if (this.nomenclaturaCU.campos && this.nomenclaturaCU.campos.length > 0) {
      let orden = 1;
      for (const campo of this.nomenclaturaCU.campos) {
        campo.orden = orden;
        orden = orden + 1;
      }
    }
  }

  /**
   * Se verifica si hay campos agregados o eliminados
   */
  private isCamposModificados(): void {

    // se limpia la bandera que permite editar los valores
    this.datosEdicion.camposEntradaEditar = true;

    // es la cantidad de campos seleccionados
    let cantSeleccionados = 0;
    if (this.nomenclaturaCU.campos) {
      cantSeleccionados = this.nomenclaturaCU.campos.length;
    }

    // es la cantidad de campos que tiene la nomenclatura seleccionados
    let cantOrigen = 0;
    if (this.datosEdicion.nomenclatura.campos) {
      cantOrigen = this.datosEdicion.nomenclatura.campos.length;
    }

    // si son diferentes es porque hay modificaciones
    if (cantSeleccionados === cantOrigen) {

      this.datosEdicion.camposEntradaEditar = false;
      if (cantSeleccionados > 0) {

        // se valida si los campos seleccionados son nuevos
        let existe;
        for (const campoSeleccionado of this.nomenclaturaCU.campos) {
          existe = false;

          for (const campoOrigen of this.datosEdicion.nomenclatura.campos) {
            if (campoSeleccionado.idCampo === campoOrigen.idCampo) {
              existe = true;
              break;
            }
          }

          if (!existe) {
            this.datosEdicion.camposEntradaEditar = true;
            break;
          }
        }
      }
    }
  }

  /**
   * Se verifica si el orden de los campos fueron modificados
   */
  private isOrdenModificado(): void {

    // se limpia la bandera que permite editar los valores
    this.datosEdicion.camposEntradaEditar = false;

    // se obtiene los campos de origen y de edicion
    const camposOrigen = this.datosEdicion.nomenclatura.campos;
    const camposEditar = this.nomenclaturaCU.campos;

    // para verificar si el orden fue modificado los dos campos deben existir
    if (camposOrigen && camposOrigen.length > 0 && camposEditar && camposEditar.length > 0) {

      // se recorre todos los items para validar si fueron modificados
      formain:
      for (const origen of camposOrigen) {
        for (const campo of camposEditar) {
          if (origen.idCampo === campo.idCampo) {
            if (origen.orden !== campo.orden) {
              this.datosEdicion.camposEntradaEditar = true;
              break formain;
            }
            break;
          }
        }
      }
    }
  }

  /**
   * Se verifica si las restricciones fueron modificados
   */
  private isRestriccionesModificado(): void {

    // se limpia la bandera que permite editar las restricciones
    this.datosEdicion.restriccionesEditar = false;

    // se obtiene los campos de origen y de edicion
    const camposOrigen = this.datosEdicion.nomenclatura.campos;
    const camposEditar = this.nomenclaturaCU.campos;

    // debe existir los campos para ambos asi validar si las restricciones se modificaron
    if (camposOrigen && camposOrigen.length > 0 && camposEditar && camposEditar.length > 0) {

      // se recorren los campos de la nomenclatura origen
      formain:
      for (const origen of camposOrigen) {

        // se recorren los campos de la nomenclatura visualizada en pantalla
        for (const campo of camposEditar) {

          // se verifica si son los mismo campos
          if (origen.idCampo === campo.idCampo) {

            // es la cantidad de restricciones que tiene el campo origen
            let cantOrigen = 0;
            if (origen.restricciones) {
              cantOrigen = origen.restricciones.length;
            }

            // es la cantidad de restricciones que tiene el campo mostrado en pantalla
            let cantSeleccionados = 0;
            if (campo.restricciones) {
              cantSeleccionados = campo.restricciones.length;
            }

            // si son diferentes es porque hay modificaciones
            if (cantOrigen !== cantSeleccionados) {
              this.datosEdicion.restriccionesEditar = true;
              break formain;
            }

            // si son iguales se procede a validar restriccion por restriccion
            if (cantSeleccionados > 0) {

              // se recorre las restricciones del origen
              let existe;
              for (const restriccionOrigen of origen.restricciones) {
                existe = false;

                // se recorre las restricciones visualizadas en pantalla
                for (const restriccion of campo.restricciones) {
                  if (restriccionOrigen.id === restriccion.id) {
                    existe = true;
                    break;
                  }
                }

                // si no existe esta restriccion es por que hay modificaciones
                if (!existe) {
                  this.datosEdicion.restriccionesEditar = true;
                  break formain;
                }
              }
            }
            break;
          }
        }
      }
    }
  }

  /**
   * Metodo que limpia las banderas de los campos por procesos anteriores
   */
  private limpiarBanderasCampos(): void {

    // se recorre los campos parametrizados en el sistema
    for (const campo of this.campos) {

      // se limpia la bandera que indica que es seleccionada
      campo.aplica = false;

      // objecto que indica que el campo tiene una nomenclatura asociada
      campo.campoNomenclatura = null;

      // se limpia las restricciones seleccionadas de este campo
      if (campo.restricciones) {
        for (const restriccion of campo.restricciones) {
          restriccion.aplica = false;
        }
      }
    }
  }

  /**
   * Para los campos tipo casilla se debe inicializar con la
   * restriccion 'NO' solamente al momento de la creacion de
   * la nomenclatura
   */
  private setNOCasillaVerificacion(): void {

    // se verifica si hay campos parametrizados en el sistema
    if (this.campos && this.campos.length > 0) {

      // se utiliza para encapsular las restricciones
      let restricciones: Array<RestriccionDTO>;

      // se recorre cada campo parametrizado
      for (const campo of this.campos) {

        // se verifica si es una casilla de verificacion
        if (campo.tipoCampo === this.ID_CASILLA_VERIFICACION) {

          // se verifica si hay restricciones para esta casilla
          restricciones = campo.restricciones;
          if (restricciones && restricciones.length > 0) {

            // para la casilla de verificacion por default es NO
            for (const restriccion of restricciones) {
              if (restriccion.id === RestriccionesKeyConstant.KEY_VALOR_INICIAL_CASILLA_NO) {
                restriccion.aplica = true;
                break;
              }
            }
          }
        }
      }
    }
  }
}
