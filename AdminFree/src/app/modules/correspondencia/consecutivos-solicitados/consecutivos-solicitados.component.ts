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
import { LabelsConstant } from '../../../constants/labels.constant';
import { EstadoConstant } from '../../../constants/estado.constant';

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

  /** Es el usuario seleccionado para el filtro de busqueda */
  public usuarioFiltro: SelectItemDTO;

  /** labels para el componente de los calendars */
  public calendarEspanish: any;

  /** Constantes que representan los identificadores de ACTIVO - ANULADO */
  public ID_ACTIVO = EstadoConstant.ID_ACTIVO;
  public ID_ANULADO = EstadoConstant.ID_ANULADO;

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

    // se utiliza para los componentes calendar
    this.calendarEspanish = LabelsConstant.calendarEspanish;

    // se consulta los datos iniciales para este modulo
    this.correspondenciaService.getInitConsecutivosAnioActual(this.clienteCurrent.id).subscribe(
      data => {
        this.initDTO = data;
        this.consecutivos = this.initDTO.consecutivos;
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

    // se configura el usuario seleccionado para el filtro busqueda
    this.filtros.idUsuario = null;
    if (this.usuarioFiltro && this.usuarioFiltro.id) {
      this.filtros.idUsuario = this.usuarioFiltro.id;
    }

    // se procede a consultar los consecutivos de acuerdo al filtro
    this.correspondenciaService.getConsecutivosAnioActual(this.filtros).subscribe(
      data => {
        this.consecutivos = data;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }
}
