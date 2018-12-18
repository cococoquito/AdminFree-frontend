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
export class AdminCamposComponent extends CommonComponent implements OnInit, OnDestroy {
  /** Se utiliza para crear un campo de entrada*/
  public campoCrear: CampoEntradaDTO;

  /** Lista de campos de entrada informacion asociado al cliente */
  public campos: Array<CampoEntradaDTO>;

  public itemss: Array<ItemDTO>;
  public restricciones: Array<RestriccionDTO>;

  public valorItem: string;

  items: MenuItem[];
  activeIndex = 0;
  ultimoTab = 3;

  public TAB_DATOS_CAMPO = 0;
  public TAB_RESTRICCIONES = 1;
  public TAB_AGREGAR_ITEMS = 2;
  public TAB_CONFIRMACION = 3;

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
    private shellState: ShellState
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
        label: 'Agregar Items',
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
    this.restricciones = null;
    if (!this.campoCrear.tipoCampo) {
      this.messageService.add(
        MsjUtil.getToastError(MsjFrontConstant.TIPO_CAMPO_REQUERIDO)
      );
      return;
    }
    this.campoCrear.nombre = this.setTrim(this.campoCrear.nombre);
    this.campoCrear.descripcion = this.setTrim(this.campoCrear.descripcion);

    this.adminCampoService.validarDatosCampoEntrada(this.campoCrear).subscribe(
      data => {
        this.restricciones = data;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );



    this.activeIndex = this.TAB_RESTRICCIONES;
  }

  public agregarItem(): void {
    if (this.valorItem) {
      this.valorItem = this.setTrim(this.valorItem);
      const itm = new ItemDTO();
      itm.valor = this.valorItem;
      itm.id = this.itemss.length + 1;
      this.itemss.push(itm);
      this.valorItem = null;
    }
  }

  public eliminarItem(item: ItemDTO): void {
    const i = this.itemss.indexOf(item, 0);
    if (i > -1) {
      this.itemss.splice(i, 1);
    }
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
  }

  /**
   * Metodo que permite cerrar el panel de creacion de campos
   */
  public closePanelCreacion(): void {
    this.messageService.clear();
    this.campoCrear = null;
  }

  public siguiente(): void {
    this.activeIndex = this.activeIndex + 1;
  }

  public regresar(): void {
    this.activeIndex = this.activeIndex - 1;
  }
}
