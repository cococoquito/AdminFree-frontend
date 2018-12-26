import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminCampoService } from '../../../services/admin-campo.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { SpinnerState } from './../../../states/spinner.state';
import { StepsModel } from './../../../model/steps-model';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';
import { CampoEntradaDTO } from './../../../dtos/configuraciones/campo-entrada.dto';
import { RestriccionDTO } from './../../../dtos/configuraciones/restriccion.dto';
import { CampoEntradaEdicionDTO } from './../../../dtos/configuraciones/campo-entrada-edicion.dto';
import { ItemDTO } from './../../../dtos/configuraciones/item.dto';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from './../../../util/messages.util';
import { LabelsConstant } from './../../../constants/labels.constant';
import { MsjFrontConstant } from './../../../constants/messages-frontend.constant';
import { TipoCamposConstant } from './../../../constants/tipo-campos.constant';

/**
 * Componente para la administracion de los Campos de ingreso
 * de informacion al momento de solicitar un consecutivo
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './admin-campos.component.html',
  styleUrls: ['./admin-campos.component.css'],
  providers: [AdminCampoService]
})
export class AdminCamposComponent extends CommonComponent implements OnInit, OnDestroy {

  /** cliente autenticado o es el cliente asociado al usuario */
  private clienteCurrent: ClienteDTO;

  /** Lista de campos de entrada informacion asociado al cliente */
  public campos: Array<CampoEntradaDTO>;

  /** Bandera que indica si el proceso es creacion */
  public isCreacion: boolean;

  /** Bandera que indica si el proceso es edicion */
  public isEdicion: boolean;

  /** Es el backup del los atributos nombre y tipo para la creacion*/
  private campoCrearOrigen: CampoEntradaDTO;

  /** Es el backup del los atributos del campo a editar*/
  public campoEditarOrigen: CampoEntradaEdicionDTO;

  /** Esta es la variable que se utiliza para la creacion o edicion del campo*/
  public campoCU: CampoEntradaDTO;

  /** Es el campo que esta en edicion*/
  public campoEdicion: CampoEntradaDTO;

  /** Se utiliza para ver el detalle de un campo de entrada*/
  public campoVerDetalle: CampoEntradaDTO;

  /** Modelo del componente steps, se utiliza para la creacion o edicion*/
  public stepsModel: StepsModel;

  /** permite visualizar el modal de ver detalle del campo*/
  public isModalVerDetalle: boolean;

  /** se utiliza para el focus componente agregar items*/
  @ViewChild('inItem') inItem: ElementRef;

  /** identificadores de cada tipo de campo*/
  public ID_CAMPO_TEXTO = TipoCamposConstant.ID_CAMPO_TEXTO;
  public ID_LISTA_DESPLEGABLE = TipoCamposConstant.ID_LISTA_DESPLEGABLE;
  public ID_CASILLA_VERIFICACION = TipoCamposConstant.ID_CASILLA_VERIFICACION;
  public ID_CAMPO_FECHA = TipoCamposConstant.ID_CAMPO_FECHA;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para mostrar el
   * modal de confirmacion para diferente procesos
   *
   * @param adminCampoService, se utiliza para consumir
   * los servicios relacionados a este proceso negocio
   *
   * @param shellState, se utiliza para el titulo del componente
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   */
  constructor(
    protected messageService: MessageService,
    private confirmationService: ConfirmationService,
    private adminCampoService: AdminCampoService,
    private shellState: ShellState,
    private spinnerState: SpinnerState) {
    super();
  }

  /**
   * Se debe consultar los campos asociados al cliente autenticado
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
   * del componente, donde se procede a consultar los
   * campos de ingreso relacionado al cliente autenticado
   */
  private init(): void {

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = LabelsConstant.MENU_ADMIN_CAMPOS;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_ADMIN_CAMPOS;

    // se procede a obtener el cliente autenticado
    this.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // se consulta los campos asociados al cliente autenticado
    this.adminCampoService.getCamposEntrada(this.clienteCurrent.id).subscribe(
      data => {
        this.campos = data;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite soportar el evento click del boton crear campo
   */
  public crearCampoEntrada(): void {

    // se limpia mensajes de otros procesos
    this.messageService.clear();

    // se configuran los datos ingresados para la creacion
    const restriccionesBK = this.campoCU.restricciones;
    this.setDatosAntesCreacion(restriccionesBK);

    // se procede a invocar el servicio para la creacion
    this.adminCampoService.crearCampoEntrada(this.campoCU).subscribe(
      data => {
        // Mensaje exitoso campo creado
        this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.CAMPO_CREADO_EXITOSO));

        // se agrega en la lista a visualizar en pantalla
        this.campos.push(data);

        // se limpia las variables de creacion
        this.limpiarCamposCU();
      },
      error => {
        this.campoCU.restricciones = restriccionesBK;
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite soportar el evento click del boton Aplicar Cambios
   */
  public editarCampoEntrada(): void {

    // se limpia mensajes de otros procesos
    this.messageService.clear();

    // backup para el campo origen y las restricciones por si hay errores
    const campoBK = this.campoEditarOrigen.campoEntrada;
    const restriccionesBK = this.campoCU.restricciones;

    // se configuran los datos modificados para la edicion
    this.setDatosAntesEdicion(restriccionesBK);

    // se configura el campo de entrada modificado
    this.campoEditarOrigen.campoEntrada = this.campoCU;

    // se procede a invocar el servicio para la edicion
    this.adminCampoService.editarCampoEntradaInformacion(this.campoEditarOrigen).subscribe(
      data => {
        // Mensaje exitoso campo modificado
        this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.CAMPO_ACTUALIZADO_EXITOSO));

        // se configuran los datos del campo en edicion
        this.campoEdicion.nombre = data.nombre;
        this.campoEdicion.tipoCampo = data.tipoCampo;
        this.campoEdicion.tipoCampoNombre = data.tipoCampoNombre;

        // se limpia las variables de la edicion
        this.limpiarCamposCU();
      },
      error => {
        this.campoEditarOrigen.campoEntrada = campoBK;
        this.campoCU.restricciones = restriccionesBK;
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que soporta el evento del boton eliminar campo entrada
   *
   * @param campoEliminar, es el campo seleccionado para eliminar
   */
  public eliminarCampo(campoEliminar: CampoEntradaDTO): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.ELIMINAR_CAMPO_ENTRADA.replace('?1', campoEliminar.nombre),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se procede a eliminar el campo seleccionado
        this.adminCampoService.eliminarCampoEntrada(campoEliminar.id).subscribe(
          data => {
            // Mensaje exitoso, campo fue eliminado
            this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.CAMPO_ENTRADA_ELIMINADO));

            // se elimina de la lista visualizada en la pagina
            this.campos.splice(this.campos.indexOf(campoEliminar, 0), 1);
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que soporta el evento click del boton ver detalle del campo
   */
  public showModalVerDetalle(campo: CampoEntradaDTO): void {
    this.adminCampoService.getDetalleCampoEntrada(campo.id).subscribe(
      data => {
        this.campoVerDetalle = data;
        this.isModalVerDetalle = true;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que es invocado cuando se cierra el modal de ver detalle
   */
  public closeModalVerDetalle(): void {
    this.campoVerDetalle = null;
  }

  /**
   * Es el evento del boton siguiente para el paso (Datos del Campo)
   */
  public siguienteDatosCampo(): void {
    if (this.isCreacion) {
      this.siguienteDatosCampoCreacion();
    } else {
      this.siguienteDatosCampoEdicion();
    }
  }

  /**
   * Es el evento del boton siguiente para el paso (Restricciones)
   */
  public siguienteRestricciones(): void {
    if (this.isCreacion) {
      this.siguienteRestriccionCreacion();
    } else {
      this.siguienteRestriccionEdicion();
    }
  }

  /**
   * Es el evento del boton siguiente para el paso (Agregar items)
   */
  public siguienteAgregarItems(): void {

    // los items son requeridos
    if (this.campoCU.items.length === 0) {
      this.messageService.add(MsjUtil.getToastError(MsjFrontConstant.ITEMS_REQUERIDO));
      return;
    }

    // se procede a ir al ultimo paso
    this.stepsModel.irUltimoStep(this.spinnerState);
  }

  /**
   * Metodo que permite abrir el panel de creacion de campos
   */
  public showPanelCreacion(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se define el campo que permite visualizar el panel
    this.campoCU = new CampoEntradaDTO();
    this.campoCU.items = new Array<ItemDTO>();
    this.campoCU.idCliente = this.clienteCurrent.id;
    this.campoCU.consultarRestricciones = true;
    this.campoCrearOrigen = null;

    // esta bandera visualiza el panel de creacion
    this.isCreacion = true;

    // se define el componente steps para la creacion
    this.stepsModel = new StepsModel();
    this.stepsModel.stepsParaAdminCampos(false);
  }

  /**
   * Metodo que permite cerrar el panel de creacion de campos
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
      if (this.campoEditarOrigen.datosBasicosEditar ||
          this.campoEditarOrigen.restriccionesEditar ||
          this.campoEditarOrigen.itemsEditar) {
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
   * Metodo que soporta el evento del boton editar el campo
   *
   * @param campo , campo seleccionado para editar
   */
  public showPanelEdicion(campo: CampoEntradaDTO): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se procede a consultar el detalle del campo para editar
    this.adminCampoService.getDetalleCampoEntradaEdicion(campo.id).subscribe(
      data => {
        // se configura el detalle del campo
        this.campoEditarOrigen = data;

        // se hace el backup de los atributos
        this.campoCU = JSON.parse(JSON.stringify(this.campoEditarOrigen.campoEntrada));

        // se define el componente steps para la edicion
        this.stepsModel = new StepsModel();
        this.stepsModel.stepsParaAdminCampos(this.campoCU.tipoCampo === this.ID_LISTA_DESPLEGABLE);

        // mensaje cuando el campo tiene consecutivos o nomenclaturas asociadas
        if (this.campoEditarOrigen.tieneConsecutivos) {
          this.messageService.add(MsjUtil.getInfo(MsjFrontConstant.CAMPO_CON_CONSECUTIVO));
        } else if (this.campoEditarOrigen.tieneNomenclaturas) {
          this.messageService.add(MsjUtil.getInfo(MsjFrontConstant.CAMPO_CON_NOMENCLATURAS));
        }

        // bandera indica no se debe consultar restricciones para validar tipo nombre
        this.campoCU.consultarRestricciones = false;

        // se visualiza el panel para la edicion
        this.isEdicion = true;

        // se configura el campo de edicion
        this.campoEdicion = campo;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que soporta el evento click del boton agregar item
   *
   * @param value , valor ingresado por el usuario
   */
  public agregarItem(value: string): void {

    // se eliminan los espacios en blanco
    value = this.setTrim(value);

    // solo se agrega si hay algun caracter
    if (value) {

      // se verifica si existe un item con el mismo valor
      for (const item of this.campoCU.items) {
        if (item.valor === value) {
          this.setFocusAgregarItems();
          return;
        }
      }

      // si llega este punto se puede agregar el item
      const nuevoItem = new ItemDTO();
      nuevoItem.valor = value;
      this.campoCU.items.push(nuevoItem);
    }
    this.setFocusAgregarItems();
  }

  /**
   * Metodo que soporta el evento click del boton eliminar item
   *
   * @param item , es el item seleccionado para eliminar
   */
  public eliminarItem(item: ItemDTO): void {
    this.campoCU.items.splice(this.campoCU.items.indexOf(item, 0), 1);
  }

  /**
   * Metodo que permite configurar los steps dependiendo del
   * tipo de campo y las restricciones que llegan por parameto
   */
  private setRestriccionesSteps(data): void {

    // se configura las restricciones
    this.campoCU.restricciones = data;

    // si el tipo de campo es lista desplegable se habilita el paso 3
    if (this.campoCU.tipoCampo === this.ID_LISTA_DESPLEGABLE) {
      this.stepsModel.stepsParaAdminCampos(true);
    } else {
      // se refresca los steps, ya que volvieron al primer paso
      if (this.campoCrearOrigen) {
        this.stepsModel.stepsParaAdminCampos(false);
      }
    }
  }

  /**
   * Metodo que permite limpiar los datos utilizado para la creacion campo
   */
  private limpiarCamposCU(): void {
    this.campoCU = null;
    this.campoEdicion = null;
    this.campoCrearOrigen = null;
    this.campoEditarOrigen = null;
    this.stepsModel = null;
    this.isCreacion = false;
    this.isEdicion = false;
  }

  /**
   * Metodo que permite ajustar el focus en el input de agregar items
   */
  private setFocusAgregarItems(): void {
    if (this.inItem) {
      this.inItem.nativeElement.focus();
    }
  }

  /**
   * Metodo que permite configurar los datos antes de la creacion del campo
   */
  private setDatosAntesCreacion(restricciones: Array<RestriccionDTO>): void {

    // los items no aplica para el tipo lista desplegable
    if (this.campoCU.tipoCampo !== this.ID_LISTA_DESPLEGABLE) {
      this.campoCU.items = null;
    }

    // se configuran las restricciones seleccionadas
    this.configurarRestricciones(restricciones);
  }

  /**
   * Metodo que permite configurar los datos antes de la edicion del campo
   */
  private setDatosAntesEdicion(restricciones: Array<RestriccionDTO>): void {

    // los items no aplica para el tipo lista desplegable
    if (this.campoCU.tipoCampo !== this.ID_LISTA_DESPLEGABLE) {
      this.campoCU.items = null;
      this.campoEditarOrigen.itemsEditar = false;
    }

    // se configuran las restricciones seleccionadas
    if (this.campoEditarOrigen.restriccionesEditar) {
      this.configurarRestricciones(restricciones);
    }
  }

  /**
   * Metodo que permite configurar las restricciones para editar o crear
   */
  private configurarRestricciones(restricciones: Array<RestriccionDTO>): void {
    let seleccionadas: Array<RestriccionDTO>;
    for (const restriccion of restricciones) {
      if (restriccion.aplica) {
        if (!seleccionadas) {
          seleccionadas = new Array<RestriccionDTO>();
        }
        seleccionadas.push(restriccion);
      }
    }
    this.campoCU.restricciones = seleccionadas;
  }

  /**
   * Es el evento del boton siguiente para el paso (Datos del Campo) para creacion
   */
  private siguienteDatosCampoCreacion(): void {

    // el tipo de campo es obligatorio
    if (!this.campoCU.tipoCampo) {
      this.messageService.add(MsjUtil.getToastError(MsjFrontConstant.TIPO_CAMPO_REQUERIDO));
      return;
    }

    // se limpian los espacios para el nombre y descripcion
    this.campoCU.nombre = this.setTrim(this.campoCU.nombre);
    this.campoCU.descripcion = this.setTrim(this.campoCU.descripcion);

    // si no hay ningun cambio solamente se pasa al segundo paso
    if (this.campoCrearOrigen &&
        this.campoCrearOrigen.nombre === this.campoCU.nombre &&
        this.campoCrearOrigen.tipoCampo === this.campoCU.tipoCampo) {
          this.stepsModel.irSegundoStep(this.spinnerState);
          return;
    }

    // se procede a validar los datos ingresados para la creacion
    this.adminCampoService.validarDatosCampoEntrada(this.campoCU).subscribe(
      data => {

        // solamente se reemplaza las restricciones si el tipo campo
        // fue modificado o si apenas es la primera entrada para el paso UNO
        if (this.campoCrearOrigen) {
          if (this.campoCrearOrigen.tipoCampo !== this.campoCU.tipoCampo) {
            this.setRestriccionesSteps(data);
          }
        } else {
          this.setRestriccionesSteps(data);
        }

        // se configura el nombre del tipo de campo seleccionado
        this.campoCU.tipoCampoNombre = TipoCamposConstant.getNombre(this.campoCU.tipoCampo);

        // se crea el clone por si regresan a este punto de la creacion
        this.campoCrearOrigen = new CampoEntradaDTO();
        this.campoCrearOrigen.nombre = this.campoCU.nombre;
        this.campoCrearOrigen.tipoCampo = this.campoCU.tipoCampo;

        // se procede a seguir al segundo paso
        this.stepsModel.irSegundoStep();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Es el evento del boton siguiente para el paso (Datos del Campo) para edicion
   */
  private siguienteDatosCampoEdicion(): void {

    // se limpia la bandera que permite editar los valores
    this.campoEditarOrigen.datosBasicosEditar = false;

    // se obtiene el origen de los datos del campo
    const campoOrigen = this.campoEditarOrigen.campoEntrada;

    // se limpian los espacios para el nombre y descripcion
    this.campoCU.nombre = this.setTrim(this.campoCU.nombre);
    this.campoCU.descripcion = this.setTrim(this.campoCU.descripcion);

    // si no hay ningun cambio solamente se pasa al segundo paso
    if (campoOrigen.nombre !== this.campoCU.nombre ||
        campoOrigen.descripcion !== this.campoCU.descripcion) {

      // se indica que los datos fueron modificados
      this.campoEditarOrigen.datosBasicosEditar = true;

      // se llama la validacion si el nombre fue modificado
      if (campoOrigen.nombre !== this.campoCU.nombre) {

        // se valida que no exista otro campo con el mismo tipo y nombre
        this.adminCampoService.validarDatosCampoEntrada(this.campoCU).subscribe(
          data => {
            this.stepsModel.irSegundoStep();
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
        return;
      }
    }
    this.stepsModel.irSegundoStep(this.spinnerState);
  }

  /**
   * Es el evento del boton siguiente para el paso (Restricciones) para creacion
   */
  private siguienteRestriccionCreacion(): void {
    this.stepsModel.irTercerStep(this.spinnerState);
  }

  /**
   * Es el evento del boton siguiente para el paso (Restricciones) para edicion
   */
  private siguienteRestriccionEdicion(): void {

    // se inicializa como restricciones modificadas
    this.campoEditarOrigen.restriccionesEditar = true;

    // se obtiene los datos del campo origen
    const campoOrigen = this.campoEditarOrigen.campoEntrada;

    // se utiliza para identificar las restricciones modificadas
    const restriccionesOrigen: Array<number> = new Array<number>();
    const restriccionesEditar: Array<number> = new Array<number>();

    // se configuran las restricciones seleccionadas origen
    for (const origen of campoOrigen.restricciones) {
      if (origen.aplica) {
        restriccionesOrigen.push(origen.id);
      }
    }

    // se configuran las restricciones modificadas
    for (const editada of this.campoCU.restricciones) {
      if (editada.aplica) {
        restriccionesEditar.push(editada.id);
      }
    }

    // se valida si hay alguna modificacion
    if (restriccionesOrigen.length === restriccionesEditar.length) {
      this.campoEditarOrigen.restriccionesEditar = false;
      for (const editada of restriccionesEditar) {
        if (!restriccionesOrigen.includes(editada)) {
          this.campoEditarOrigen.restriccionesEditar = true;
          break;
        }
      }
    }
    this.stepsModel.irTercerStep(this.spinnerState);
  }
}
