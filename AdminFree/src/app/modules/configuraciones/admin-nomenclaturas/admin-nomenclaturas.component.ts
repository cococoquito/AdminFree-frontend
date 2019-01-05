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
import { NomenclaturaCreacionDTO } from '../../../dtos/configuraciones/nomenclatura-creacion.dto';
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
  public nomenclaturaVerDetalle: NomenclaturaEdicionDTO;

  /** Modelo del componente steps, se utiliza para la creacion o edicion*/
  public stepsModel: StepsModel;

  /** Esta es la variable que se utiliza para la creacion o edicion de la nomenclatura*/
  public nomenclaturaCreacion: NomenclaturaCreacionDTO;

  /** Contiene los datos de la nomenclatura a crear origen*/
  public nomenclaturaOrigen: NomenclaturaDTO;

  /** Se utiliza para validar los valores de los inputs*/
  public regex: RegexUtil;

  /** Lista de campos de entrada informacion asociado al cliente origen */
  public camposOrigen: Array<CampoEntradaDTO>;

  /** Estos son los campos que se visualizara en la pantalla */
  public camposView: Array<CampoEntradaDTO>;

  /** permite visualizar el modal de ver detalle del campo*/
  public isModalVerDetalleCampo: boolean;

  /** Se utiliza para ver el detalle de un campo de entrada*/
  public campoVerDetalle: CampoEntradaDTO;

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
   * Metodo que soporta el evento click del boton crear nomenclaturas
   */
  public showPanelCreacion(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se define el campo que permite visualizar el panel
    this.nomenclaturaCreacion = new NomenclaturaCreacionDTO();
    this.nomenclaturaCreacion.idsCampos = new Array<number>();
    this.nomenclaturaCreacion.nomenclatura = new NomenclaturaDTO();
    this.nomenclaturaCreacion.nomenclatura.idCliente = this.clienteCurrent.id;

    // esta bandera visualiza el panel de creacion
    this.isCreacion = true;

    // se define el componente steps para la creacion
    this.stepsModel = new StepsModel();
    this.stepsModel.stepsParaAdminNomenclaturas();

    // se consulta los campos asociados al cliente
    this.getCampos();
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
      if (true) {
      } else {
        this.messageService.clear();
        this.limpiarCamposCU();
      }
    }
  }

  /**
   * Metodo que soporta el evento click del boton ver detalle
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
    this.nomenclaturaVerDetalle = new NomenclaturaEdicionDTO();
    this.nomenclaturaVerDetalle.nomenclatura = this.nomenclaturaCreacion.nomenclatura;
    let campos: Array<NomenclaturaCampoDTO>;


    for (const campo of this.camposView) {
      if (campo.aplica) {
          if (!campos) {
            campos = new Array<NomenclaturaCampoDTO>();
          }
          const seleccionado = new NomenclaturaCampoDTO();
          seleccionado.idCampo = campo.id;
          seleccionado.nombreCampo = campo.nombre;
          seleccionado.tipoCampo = campo.tipoCampoNombre;
          campos.push(seleccionado);
      }
    }
    this.nomenclaturaVerDetalle.campos = campos;
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

    // se obtiene la nomenclatura para la creacion
    const nomenclaturaIn = this.nomenclaturaCreacion.nomenclatura;

    // el consecutivo inicial debe ser numerico
    if (!this.regex.isValorNumerico(nomenclaturaIn.consecutivoInicial + '')) {
        this.messageService.add(MsjUtil.getToastError(this.regex.SOLO_NUMEROS_MSJ.replace('?', 'Consecutivo Inicial')));
        return;
    }

    // se limpian los espacios
    nomenclaturaIn.nomenclatura = this.setTrim(nomenclaturaIn.nomenclatura);
    nomenclaturaIn.descripcion = this.setTrim(nomenclaturaIn.descripcion);

    // se verifica si se debe validar la nomenclatura
    if (this.nomenclaturaOrigen &&
        this.nomenclaturaOrigen.nomenclatura === nomenclaturaIn.nomenclatura) {
        this.stepsModel.irSegundoStep(this.spinnerState);
        return;
    }

    // se procede a validar si ya existe la nomenclatura ingresada
    this.service.validarExisteNomenclatura(nomenclaturaIn).subscribe(
      data => {
        // se crea el clone por si regresan a este punto de la creacion
        this.nomenclaturaOrigen = new NomenclaturaDTO();
        this.nomenclaturaOrigen.nomenclatura = nomenclaturaIn.nomenclatura;

        // se procede a seguir al segundo paso
        this.stepsModel.irSegundoStep();
      },
      error => {
        const msj = this.showMensajeError(error);
        this.messageService.add(MsjUtil.getMsjError(msj.replace('?', nomenclaturaIn.nomenclatura)));
      }
    );
  }

  /**
   * Es el evento del boton siguiente para el paso
   * (Datos de la Nomenclatura) edicion
   */
  private siguienteDatosEdicion(): void {

  }

  /**
   * Permite limpiar los datos utilizado para la creacion o edicion de la nomenclatura
   */
  private limpiarCamposCU(): void {
    this.nomenclaturaCreacion = null;
    this.nomenclaturaVerDetalle = null;
    this.stepsModel = null;
    this.isCreacion = false;
    this.isEdicion = false;
  }

  /**
   * Metodo para obtener los campos asociados al cliente
   */
  private getCampos(): void {
    if (!this.camposOrigen) {

      // se consulta los campos asociados al cliente autenticado
      this.adminCampoService.getCamposEntrada(this.clienteCurrent.id).subscribe(
        data => {
          this.camposOrigen = data;
          this.camposView = this.camposOrigen;
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    }
  }
}
