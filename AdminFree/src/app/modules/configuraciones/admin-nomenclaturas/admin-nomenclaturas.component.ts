import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminCampoService } from './../../../services/admin-campo.service';
import { AdminNomenclaturaService } from '../../../services/admin-nomenclatura.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { SpinnerState } from '../../../states/spinner.state';
import { CampoEntradaDTO } from './../../../dtos/configuraciones/campo-entrada.dto';
import { NomenclaturaEdicionDTO } from '../../../dtos/configuraciones/nomenclatura-edicion.dto';
import { NomenclaturaCampoDTO } from './../../../dtos/configuraciones/nomenclatura-campo.dto';
import { NomenclaturaDTO } from '../../../dtos/configuraciones/nomenclatura.dto';
import { ClienteDTO } from '../../../dtos/configuraciones/cliente.dto';
import { StepsModel } from '../../../model/steps-model';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { RegexUtil } from '../../../util/regex-util';
import { MsjUtil } from '../../../util/messages.util';
import { LabelsConstant } from '../../../constants/labels.constant';
import { MsjFrontConstant } from '../../../constants/messages-frontend.constant';

/**
 * Componente para la administracion de las Nomenclaturas
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './admin-nomenclaturas.component.html',
  styleUrls: ['./admin-nomenclaturas.component.css'],
  providers: [AdminNomenclaturaService, AdminCampoService]
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

  /** permite visualizar el modal de ver detalle de la nomenclatura*/
  public isModalVerDetalle: boolean;

  /** Contiene los datos de la nomenclatura para ver el detalle*/
  public nomenclaturaVerDetalle: NomenclaturaDTO;

  /** permite visualizar el modal de ver detalle del campo*/
  public isModalVerDetalleCampo: boolean;

  /** Se utiliza para ver el detalle del campo asociado a la nomenclatura*/
  public campoVerDetalle: CampoEntradaDTO;

  /** Esta es la variable que se utiliza para la creacion o edicion de la nomenclatura*/
  public nomenclaturaCU: NomenclaturaDTO;

  /** Se utiliza para comprobar si se debe hacer la validacion al momento de la creacion*/
  private nomeclaturaValueBK: string;

  /** Se utiliza para la edicion de la nomenclatura*/
  public datosEdicion: NomenclaturaEdicionDTO;

  /** Modelo del componente steps, se utiliza para la creacion o edicion*/
  public stepsModel: StepsModel;

  /** Se utiliza para validar los valores de los inputs*/
  public regex: RegexUtil;

  /** Estos son los campos que se visualizara en la pantalla para creacion o edicion*/
  public campos: Array<CampoEntradaDTO>;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para mostrar el
   * modal de confirmacion para diferente procesos
   *
   * @param adminCampoService, se utiliza para obtener los campos
   * asociados al cliente autenticado
   *
   * @param service, se utiliza para consumir
   * los servicios relacionados a este proceso negocio
   *
   * @param shellState, se utiliza para el titulo del componente
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   */
  constructor(protected messageService: MessageService,
    private confirmationService: ConfirmationService,
    private adminCampoService: AdminCampoService,
    private service: AdminNomenclaturaService,
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
    this.service.getNomenclaturas(this.clienteCurrent.id).subscribe(
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

    // se hace el llamado HTTP para la creacion de la nomenclatura
    this.service.crearNomenclatura(this.nomenclaturaCU).subscribe(
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
        this.service.eliminarNomenclatura(nomenclatura.id).subscribe(
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
    this.service.getDetalleNomenclatura(nomenclatura.id).subscribe(
      data => {
        this.nomenclaturaVerDetalle = data;
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
    this.nomenclaturaVerDetalle = null;
  }

  /**
   * Metodo que soporta el evento click del boton ver detalle del campo
   *
   * @param campo , campo seleccionado para ver su detalle
   */
  public showModalVerDetalleCampo(campo: CampoEntradaDTO): void {
    this.adminCampoService.getDetalleCampoEntrada(campo.id).subscribe(
      data => {
        this.campoVerDetalle = data;
        this.isModalVerDetalleCampo = true;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que es invocado cuando se cierra el modal de ver detalle del campo
   */
  public closeModalVerDetalleCampo(): void {
    this.campoVerDetalle = null;
  }





  /**
   * Metodo que permite abrir el panel de creacion de la nomenclatura
   */
  public showPanelCreacion(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se define el campo que permite visualizar el panel
    this.nomenclaturaCU = new NomenclaturaDTO();
    this.nomenclaturaCU.idCliente = this.clienteCurrent.id;

    // esta bandera visualiza el panel de creacion
    this.isCreacion = true;

    // se define el componente steps para la creacion
    this.getStepsModel();

    // se consulta los campos asociados al cliente
    this.getCampos();
  }

  /**
   * Metodo que permite abrir el panel de edicion de la nomenclatura
   *
   * @param nomenclatura , DTO que contiene los datos de la nomenclatura
   */
  public showPanelEdicion(nomenclatura: NomenclaturaDTO): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se consulta el detalle de la nomenclatura para la edicion
    this.service.getDetalleNomenclatura(nomenclatura.id).subscribe(
      data => {
        // se configura los datos de la edicion de la nomenclatura
        this.datosEdicion = new NomenclaturaEdicionDTO();
        this.datosEdicion.nomenclatura = data;
        this.datosEdicion.nomenclatura.idCliente = this.clienteCurrent.id;

        // se hace el backup de los atributos
        this.nomenclaturaCU = JSON.parse(JSON.stringify(this.datosEdicion.nomenclatura));

        // mensaje cuando la nomenclatura tiene consecutivos
        if (this.nomenclaturaCU.tieneConsecutivos) {
          this.messageService.add(MsjUtil.getInfo(MsjFrontConstant.NOMENCLATURA_CON_CONSECUTIVO));
        }

        // se define el componente steps para la creacion
        this.getStepsModel();

        // se visualiza el panel para la edicion
        this.isEdicion = true;

        // se consulta los campos asociados al cliente
        this.getCampos();
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
          this.datosEdicion.camposEntradaEditar) {
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
  public siguienteCampos(): void {
    if (this.isCreacion) {
      this.siguienteCamposCreacion();
    } else {
      this.siguienteCamposEdicion();
    }
  }

  /**
   * Es el evento del boton siguiente para el paso (Campos) Creacion
   */
  private siguienteCamposCreacion(): void {

    // se configura los campos seleccionados para la nomenclatura
    this.nomenclaturaCU.campos = null;
    for (const campo of this.campos) {
      if (campo.aplica) {

        // se construye este campo dado que es seleccionado
        const seleccionado = new NomenclaturaCampoDTO();
        seleccionado.idCampo = campo.id;
        seleccionado.nombreCampo = campo.nombre;
        seleccionado.tipoCampo = campo.tipoCampoNombre;

        // se agrega en la lista de creacion
        if (!this.nomenclaturaCU.campos) {
            this.nomenclaturaCU.campos = new Array<NomenclaturaCampoDTO>();
        }
        this.nomenclaturaCU.campos.push(seleccionado);
      }
    }
    this.stepsModel.irUltimoStep(this.spinnerState);
  }

  /**
   * Es el evento del boton siguiente para el paso (Campos) Edicion
   */
  private siguienteCamposEdicion(): void {

  }

  /**
   * Es el evento del boton siguiente para el paso
   * (Datos de la Nomenclatura) creacion
   */
  private siguienteDatosCreacion(): void {

    // el consecutivo inicial debe ser numerico
    if (!this.regex.isValorNumerico(this.nomenclaturaCU.consecutivoInicial + '')) {
        this.messageService.add(MsjUtil.getToastError(this.regex.getMsjSoloNumeros('Consecutivo Inicial')));
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
    this.service.validarExisteNomenclatura(this.nomenclaturaCU).subscribe(
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
   * Es el evento del boton siguiente para el paso
   * (Datos de la Nomenclatura) edicion
   */
  private siguienteDatosEdicion(): void {

    // se limpia la bandera que permite editar los valores
    this.datosEdicion.datosBasicosEditar = false;

    // el consecutivo inicial debe ser numerico
    if (!this.regex.isValorNumerico(this.nomenclaturaCU.consecutivoInicial + '')) {
      this.messageService.add(MsjUtil.getToastError(this.regex.getMsjSoloNumeros('Consecutivo Inicial')));
      return;
    }

    // se limpian los espacios
    this.nomenclaturaCU.nomenclatura = this.setTrim(this.nomenclaturaCU.nomenclatura);
    this.nomenclaturaCU.descripcion = this.setTrim(this.nomenclaturaCU.descripcion);

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
        this.service.validarExisteNomenclatura(this.nomenclaturaCU).subscribe(
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
   * Permite limpiar los datos utilizado para la creacion o edicion de la nomenclatura
   */
  private limpiarCamposCU(): void {
    this.nomeclaturaValueBK = null;
    this.nomenclaturaCU = null;
    this.datosEdicion = null;
    this.isCreacion = false;
    this.isEdicion = false;
  }

  /**
   * Metodo para obtener los campos asociados al cliente
   */
  private getCampos(): void {

    // si los campos ya fueron consultados se limpia la bandera 'aplica'
    if (this.campos) {
      for (const campo of this.campos) {
        campo.aplica = false;
      }
      this.setCamposEdicion();
    } else {
      // se consulta los campos asociados al cliente autenticado
      this.adminCampoService.getCamposEntrada(this.clienteCurrent.id).subscribe(
        data => {
          this.campos = data;
          this.setCamposEdicion();
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    }
  }

  /**
   * Se utiliza para definir el modelo del componente steps
   */
  private getStepsModel(): void {
    if (this.stepsModel) {
      this.stepsModel.irPrimerStep();
    } else {
      this.stepsModel = new StepsModel();
      this.stepsModel.stepsParaAdminNomenclaturas();
    }
  }

  /**
   * Metodo que permite configurar los campos
   * que tiene una nomenclatura para ser modificados
   */
  private setCamposEdicion(): void {

    // se verifica que si hay campos parametrizados en el sistema
    if (this.isEdicion && this.campos && this.campos.length > 0) {

      // se verifica si la nomenclatura a editar si tiene campos asociados
      const nCampos: Array<NomenclaturaCampoDTO> = this.datosEdicion.nomenclatura.campos;
      if (nCampos && nCampos.length > 0) {

        // se configura los campos de la nomenclatura
        for (const ncampo of nCampos) {
          for (const campo of this.campos) {
            if (ncampo.idCampo === campo.id) {
              campo.aplica = true;
              break;
            }
          }
        }
      }
    }
  }
}
