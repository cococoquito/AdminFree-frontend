import { TipoCamposConstant } from './../../../constants/tipo-campos.constant';
import { SpinnerState } from './../../../states/spinner.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { CommonComponent } from '../../../util/common.component';
import { AdminCampoService } from '../../../services/admin-campo.service';
import { ShellState } from '../../../states/shell/shell.state';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';
import { CampoEntradaDTO } from './../../../dtos/configuraciones/campo-entrada.dto';
import { RestriccionDTO } from './../../../dtos/configuraciones/restriccion.dto';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from './../../../util/messages.util';
import { LabelsConstant } from './../../../constants/labels.constant';
import { MsjFrontConstant } from './../../../constants/messages-frontend.constant';
import { ItemDTO } from './../../../dtos/configuraciones/item.dto';

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
export class AdminCamposComponent extends CommonComponent
  implements OnInit, OnDestroy {
  /** Se utiliza para crear un campo de entrada*/
  public campoCrear: CampoEntradaDTO;
  public campoOrigen: CampoEntradaDTO;

  /** Lista de campos de entrada informacion asociado al cliente */
  public campos: Array<CampoEntradaDTO>;

  public itemss: Array<ItemDTO>;
  public restricciones: Array<RestriccionDTO>;

  public valorItem: string;

  items: MenuItem[];
  activeIndex = 0;


  public TAB_DATOS_CAMPO = 0;
  public TAB_RESTRICCIONES = 1;
  public TAB_CONFIRMACION = 2;
  public TAB_AGREGAR_ITEMS = -1;

  public CAMPO_TEXTO = TipoCamposConstant.ID_CAMPO_TEXTO;
  public LISTA_DESPLEGABLE = TipoCamposConstant.ID_LISTA_DESPLEGABLE;
  public CASILLA_VERIFICACION = TipoCamposConstant.ID_CASILLA_VERIFICACION;
  public CAMPO_FECHA = TipoCamposConstant.ID_CAMPO_FECHA;

  /**
   * DTO que contiene los datos del cliente autenticado o
   * es el cliente asociados al usuario autenticado
   */
  private clienteCurrent: ClienteDTO;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para el cambio
   * de estado y generacion de contrasenia
   *
   * @param adminCampoService, se utiliza para consumir
   * los servicios relacionados a este proceso negocio
   *
   * @param shellState, se utiliza para el titulo del componente
   */
  constructor(
    protected messageService: MessageService,
    private confirmationService: ConfirmationService,
    private adminCampoService: AdminCampoService,
    private shellState: ShellState,
    private spinnerState: SpinnerState
  ) {
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
        this.messageService.add(
          MsjUtil.getMsjError(this.showMensajeError(error))
        );
      }
    );

    this.items = [
      {
        label: 'Datos del Campo',
        command: (event: any) => {
          this.activeIndex = 0;
          this.messageService.add({
            severity: 'info',
            summary: 'First Step',
            detail: event.item.label
          });
        }
      },
      {
        label: 'Restricciones',
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({
            severity: 'info',
            summary: 'Seat Selection',
            detail: event.item.label
          });
        }
      },
      {
        label: 'Confirmación',
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({
            severity: 'info',
            summary: 'Last Step',
            detail: event.item.label
          });
        }
      }
    ];
  }

  /**
   * Metodo que soporta el evento del boton eliminar campo de ingreso
   */
  public eliminarCampo(campoEliminar: CampoEntradaDTO): void {
    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.ELIMINAR_CAMPO_ENTRADA.replace(
        '?1',
        campoEliminar.nombre
      ),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {
        // se procede a eliminar el campo seleccionado
        this.adminCampoService.eliminarCampoEntrada(campoEliminar.id).subscribe(
          data => {
            // se elimina lista visualizada en la pagina
            const i = this.campos.indexOf(campoEliminar, 0);
            if (i > -1) {
              this.campos.splice(i, 1);
            }

            // Mensaje exitoso campo fue eliminado
            this.messageService.add(
              MsjUtil.getToastSuccess(MsjFrontConstant.CAMPO_ENTRADA_ELIMINADO)
            );
          },
          error => {
            this.messageService.add(
              MsjUtil.getMsjError(this.showMensajeError(error))
            );
          }
        );
      }
    });
  }

  /**
   * Metodo que permite soporta el evento del boton siguiente
   * para el panel de creacion de campo siguiente
   */
  public irRestricciones(): void {
    if (!this.campoCrear.tipoCampo) {
      this.messageService.add(
        MsjUtil.getToastError(MsjFrontConstant.TIPO_CAMPO_REQUERIDO)
      );
      return;
    }
    this.campoCrear.nombre = this.setTrim(this.campoCrear.nombre);
    this.campoCrear.descripcion = this.setTrim(this.campoCrear.descripcion);

    if (
      this.campoOrigen &&
      this.campoOrigen.nombre === this.campoCrear.nombre &&
      this.campoOrigen.tipoCampo === this.campoCrear.tipoCampo
    ) {
      this.activeIndex = this.TAB_RESTRICCIONES;
      return;
    }
    this.adminCampoService.validarDatosCampoEntrada(this.campoCrear).subscribe(
      data => {
        this.activeIndex = this.TAB_RESTRICCIONES;

        if (this.campoOrigen) {
          if (this.campoOrigen.tipoCampo !== this.campoCrear.tipoCampo) {
            this.restricciones = data;
          }
        } else {
          this.restricciones = data;
        }
        this.campoOrigen = new CampoEntradaDTO();
        this.campoOrigen.nombre = this.campoCrear.nombre;
        this.campoOrigen.tipoCampo = this.campoCrear.tipoCampo;
        this.campoCrear.tipoCampoNombre = TipoCamposConstant.getNombre(this.campoCrear.tipoCampo);
        if (
          this.campoCrear.tipoCampo === TipoCamposConstant.ID_LISTA_DESPLEGABLE
        ) {
          this.TAB_CONFIRMACION = 3;
          this.TAB_AGREGAR_ITEMS = 2;
          this.items = [
            {
              label: 'Datos del Campo',
              command: (event: any) => {
                this.activeIndex = 0;
                this.messageService.add({
                  severity: 'info',
                  summary: 'First Step',
                  detail: event.item.label
                });
              }
            },
            {
              label: 'Restricciones',
              command: (event: any) => {
                this.activeIndex = 1;
                this.messageService.add({
                  severity: 'info',
                  summary: 'Seat Selection',
                  detail: event.item.label
                });
              }
            },
            {
              label: 'Agregar Ítems',
              command: (event: any) => {
                this.activeIndex = 2;
                this.messageService.add({
                  severity: 'info',
                  summary: 'Pay with CC',
                  detail: event.item.label
                });
              }
            },
            {
              label: 'Confirmación',
              command: (event: any) => {
                this.activeIndex = 3;
                this.messageService.add({
                  severity: 'info',
                  summary: 'Last Step',
                  detail: event.item.label
                });
              }
            }
          ];
        } else {
          this.TAB_CONFIRMACION = 2;
          this.TAB_AGREGAR_ITEMS = -1;
          this.items = [
            {
              label: 'Datos del Campo',
              command: (event: any) => {
                this.activeIndex = 0;
                this.messageService.add({
                  severity: 'info',
                  summary: 'First Step',
                  detail: event.item.label
                });
              }
            },
            {
              label: 'Restricciones',
              command: (event: any) => {
                this.activeIndex = 1;
                this.messageService.add({
                  severity: 'info',
                  summary: 'Seat Selection',
                  detail: event.item.label
                });
              }
            },
            {
              label: 'Confirmación',
              command: (event: any) => {
                this.activeIndex = 3;
                this.messageService.add({
                  severity: 'info',
                  summary: 'Last Step',
                  detail: event.item.label
                });
              }
            }
          ];
        }
      },
      error => {
        this.messageService.add(
          MsjUtil.getMsjError(this.showMensajeError(error))
        );
      }
    );
  }

  public siguienteTabRestricciones(): void {
    let restriccionesSeleccionadas: Array<RestriccionDTO>;
    for (const restriccion of this.restricciones) {
      if (restriccion.aplica) {
        if (!restriccionesSeleccionadas) {
          restriccionesSeleccionadas = new Array<RestriccionDTO>();
        }
        restriccionesSeleccionadas.push(restriccion);
      }
    }

    this.campoCrear.restricciones = restriccionesSeleccionadas;


    this.spinnerState.displaySpinner();
    setTimeout(() => {
      this.spinnerState.hideSpinner();
      this.activeIndex = this.TAB_CONFIRMACION;
      if (this.campoCrear.tipoCampo === TipoCamposConstant.ID_LISTA_DESPLEGABLE) {
        this.activeIndex = this.TAB_AGREGAR_ITEMS;
      }
    }, 200);
  }

  public agregarItem(): void {
    this.valorItem = this.setTrim(this.valorItem);
    if (this.valorItem) {
      const itm = new ItemDTO();
      itm.valor = this.valorItem;
      this.itemss.push(itm);
      this.valorItem = null;
    }
  }

  public regresarConfirmacion(): void {
    this.activeIndex = this.TAB_RESTRICCIONES;
    if (this.campoCrear.tipoCampo === TipoCamposConstant.ID_LISTA_DESPLEGABLE) {
      this.activeIndex = this.TAB_AGREGAR_ITEMS;
    }
  }

  public regresarAgregarItem() {
    this.activeIndex = this.TAB_RESTRICCIONES;
  }

  public crearCampo(): void {


    if (this.campoCrear.tipoCampo === TipoCamposConstant.ID_LISTA_DESPLEGABLE) {
      this.campoCrear.items = this.itemss;
    }

    this.adminCampoService.crearCampoEntrada(this.campoCrear).subscribe(
      data => {
        this.campoCrear = null;
        this.campos.push(data);

        // Mensaje exitoso campo fue eliminado
        this.messageService.add(
          MsjUtil.getToastSuccess(MsjFrontConstant.CAMPO_CREADO_EXITOSO)
        );
      },
      error => {
        this.messageService.add(
          MsjUtil.getMsjError(this.showMensajeError(error))
        );
      }
    );


  }

  public eliminarItem(item: ItemDTO): void {
    const i = this.itemss.indexOf(item, 0);
    if (i > -1) {
      this.itemss.splice(i, 1);
    }
  }

  public regresarRestricciones(): void {
    this.activeIndex = this.TAB_DATOS_CAMPO;
  }

  /**
   * Metodo que permite abrir el panel de creacion de campos
   */
  public showPanelCreacion(): void {
    this.messageService.clear();
    this.campoCrear = new CampoEntradaDTO();
    this.campoCrear.idCliente = this.clienteCurrent.id;
    this.activeIndex = 0;
    this.itemss = new Array<ItemDTO>();
    this.valorItem = null;
    this.campoOrigen = null;
    this.restricciones = null;
  }

  /**
   * Metodo que permite cerrar el panel de creacion de campos
   */
  public closePanelCreacion(): void {
    this.messageService.clear();
    this.campoCrear = null;
  }

  public siguienteTabAgregar(): void {
    if (!this.itemss || this.itemss.length === 0) {
      this.messageService.add(
        MsjUtil.getToastError(MsjFrontConstant.ITEMS_REQUERIDO)
      );
      return;
    }
    this.activeIndex = this.TAB_CONFIRMACION;
  }

  public regresar(): void {
    this.activeIndex = this.activeIndex - 1;
  }
}
