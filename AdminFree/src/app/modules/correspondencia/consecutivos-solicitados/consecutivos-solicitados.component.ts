import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { ClienteDTO } from '../../../dtos/configuraciones/cliente.dto';
import { ConsecutivoDTO } from '../../../dtos/correspondencia/consecutivo.dto';
import { FiltroConsecutivosAnioActualDTO } from './../../../dtos/correspondencia/filtro-consecutivos-anio-actual.dto';
import { InitConsecutivosAnioActualDTO } from '../../../dtos/correspondencia/init-consecutivos-anio-actual.dto';
import { SelectItemDTO } from '../../../dtos/transversal/select-item.dto';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from '../../../util/messages.util';
import { FechaUtil } from '../../../util/fecha-util';
import { LabelsConstant } from '../../../constants/labels.constant';
import { EstadoConstant } from '../../../constants/estado.constant';
import { MsjFrontConstant } from '../../../constants/messages-frontend.constant';

/**
 * Componente para la visualizacion de los consecutivos de
 * correspondencia solicitados para el anio actual
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './consecutivos-solicitados.component.html',
  styleUrls: ['./consecutivos-solicitados.component.css'],
  providers: [ CorrespondenciaService ]
})
export class ConsecutivosSolicitadosComponent extends CommonComponent implements OnInit, OnDestroy {

  /** contiene los datos iniciales para este modulo */
  public initDTO: InitConsecutivosAnioActualDTO;

  /** cliente autenticado o es el cliente asociado al usuario autenticado */
  public clienteCurrent: ClienteDTO;

  /** Lista de consecutivos que se muestra al momento de entrar al submodulo */
  public consecutivos: Array<ConsecutivoDTO>;

  /** Se utiliza para encapsular los filtros busqueda ingresados */
  public filtros: FiltroConsecutivosAnioActualDTO;

  /** Se utiliza para identificar si hay algun campo ingresado */
  public filtrosClone: FiltroConsecutivosAnioActualDTO;

  /** Identifica si hay filtro aplicado por el usuario */
  public hayFiltroAplicado: boolean;

  /** Es el usuario seleccionado para el filtro de busqueda */
  public usuarioFiltro: SelectItemDTO;

  /** labels para el componente de los calendars */
  public calendarEspanish: any;

  /** Constantes que representan los identificadores de ACTIVO - ANULADO */
  public ID_ACTIVO = EstadoConstant.ID_ACTIVO;
  public ID_ANULADO = EstadoConstant.ID_ANULADO;

  /** Los filtros fecha de solicitud se debe mostrar solamente los meses anio actual */
  public minDateSolicitudFilter: Date;
  public maxDateSolicitudFilter: Date;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param correspondenciaService, contiene los servicios
   * del modulo de correspondencia
   *
   * @param shellState, se utiliza para el titulo del componente
   */
  constructor(
    protected messageService: MessageService,
    private correspondenciaService: CorrespondenciaService,
    private shellState: ShellState) {
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
    this.shellState.title.titulo = LabelsConstant.TITLE_CONSECUTIVOS_SOLICITADOS;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_CONSECUTIVOS_SOLICITADOS;

    // se procede a obtener el cliente autenticado
    this.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // DTO para encapsular los datos de los filtros de busqueda
    this.filtros = new FiltroConsecutivosAnioActualDTO();
    this.filtros.idCliente = this.clienteCurrent.id;

    // se debe inicializar el clone con los mismos datos del filtro
    this.filtrosClone = JSON.parse(JSON.stringify(this.filtros));

    // se utiliza para los componentes calendar
    this.calendarEspanish = LabelsConstant.calendarEspanish;

    // se consulta los datos iniciales para este modulo
    this.correspondenciaService.getInitConsecutivosAnioActual(this.clienteCurrent.id).subscribe(
      data => {
        // se configura como dato global
        this.initDTO = data;

        // se configura los consecutivos iniciales
        this.consecutivos = this.initDTO.consecutivos;

        // se configura la fechas de solicitud minima y maxima
        if (this.consecutivos && this.consecutivos.length > 0 && this.initDTO.fechaActual) {
          this.initDTO.fechaActual = new Date(this.initDTO.fechaActual);
          this.minDateSolicitudFilter = new Date(this.initDTO.fechaActual.getFullYear(), 0, 1);
          this.maxDateSolicitudFilter = new Date(this.initDTO.fechaActual.getFullYear(), 11, 31);
        }
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

    // se procede a organizar los criterios de busqueda ingresado
    this.orgarnizarFiltro();

    // solo se invoca si hay algun criterio de busqueda ingresado
    if (this.isNuevoFilter()) {
      this.correspondenciaService.getConsecutivosAnioActual(this.filtros).subscribe(
        data => {

          // se configura los nuevos consecutivos
          this.consecutivos = data;

          // se debe clonar los filtros asi evitar solicitudes si no hay nuevos criterios
          this.filtrosClone = JSON.parse(JSON.stringify(this.filtros));

          // se configura la bandera que indica que hay filtro aplicado
          this.hayFiltroAplicado = false;
          if (this.filtrosClone.consecutivos ||
              this.filtrosClone.nomenclaturas ||
              this.filtrosClone.idUsuario ||
              this.filtrosClone.fechaSolicitudInicial ||
              this.filtrosClone.fechaSolicitudFinal ||
              this.filtrosClone.estado) {
              this.hayFiltroAplicado = true;
          }
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    }
  }

  /**
   * Metodo que permite organizar los criterios de busqueda
   */
  private orgarnizarFiltro(): void {

    // se configura el usuario seleccionado para el filtro busqueda
    this.filtros.idUsuario = this.usuarioFiltro ? this.usuarioFiltro.id : null;

    // se eliminan los espacios para los campos tipo input
    this.filtros.consecutivos = this.setTrimFilter(this.filtros.consecutivos);
    this.filtros.nomenclaturas = this.setTrimFilter(this.filtros.nomenclaturas);
  }

  /**
   * Metodo que valida si ingresaron un nuevo filtro busqueda
   */
  private isNuevoFilter(): boolean {

    // La fecha inicial debe ser mayor que la fecha final solicitud
    const fechaSolicitudInicial = this.filtros.fechaSolicitudInicial;
    const fechaSolicitudFinal = this.filtros.fechaSolicitudFinal;
    if (fechaSolicitudInicial && fechaSolicitudFinal) {
        if (FechaUtil.compareDate(fechaSolicitudInicial, fechaSolicitudFinal) === 1) {
          this.messageService.add(MsjUtil.getToastErrorLng(MsjFrontConstant.FECHA_INICIAL_MAYOR));
          return false;
        }
    }

    // se valida cada criterio con el clone del filtro
    if (this.filtrosClone.consecutivos !== this.filtros.consecutivos ||
        this.filtrosClone.nomenclaturas !== this.filtros.nomenclaturas ||
        this.filtrosClone.idUsuario !== this.filtros.idUsuario ||
        this.filtrosClone.estado !== this.filtros.estado ||
        !FechaUtil.iqualsDateFilter(this.filtrosClone.fechaSolicitudInicial, fechaSolicitudInicial) ||
        !FechaUtil.iqualsDateFilter(this.filtrosClone.fechaSolicitudFinal, fechaSolicitudFinal)) {
        return true;
    }
    return false;
  }
}
