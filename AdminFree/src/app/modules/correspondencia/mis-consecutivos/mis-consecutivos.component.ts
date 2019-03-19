import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { FiltroConsecutivosState } from '../../../states/transversal/filtro-consecutivos.state';
import { ActivarAnularConsecutivoDTO } from '../../../dtos/correspondencia/activar-anular-consecutivo.dto';
import { ConsecutivoDTO } from '../../../dtos/correspondencia/consecutivo.dto';
import { PaginadorModel } from '../../../model/paginador-model';
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

  /** Se utiliza para resetear la tabla de consecutivos cuando aplican un filtro*/
  @ViewChild('tblcc') tblConsecutivos: Table;

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
}
