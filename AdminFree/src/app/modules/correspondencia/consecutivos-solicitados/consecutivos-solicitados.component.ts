import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { ClienteDTO } from '../../../dtos/configuraciones/cliente.dto';
import { FiltroConsecutivosAnioActualDTO } from './../../../dtos/correspondencia/filtro-consecutivos-anio-actual.dto';
import { SelectItemDTO } from '../../../dtos/transversal/select-item.dto';
import { ConsecutivoDTO } from '../../../dtos/correspondencia/consecutivo.dto';
import { ConsecutivoDetalleDTO } from '../../../dtos/correspondencia/consecutivo-detalle.dto';
import { DocumentoDTO } from '../../../dtos/correspondencia/documento.dto';
import { CampoFiltroDTO } from '../../../dtos/correspondencia/campo-filtro.dto';
import { PaginadorModel } from '../../../model/paginador-model';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from '../../../util/messages.util';
import { FechaUtil } from '../../../util/fecha-util';
import { LabelsConstant } from '../../../constants/labels.constant';
import { EstadoConstant } from '../../../constants/estado.constant';
import { MsjFrontConstant } from '../../../constants/messages-frontend.constant';
import { TipoCamposConstant } from '../../../constants/tipo-campos.constant';
import { saveAs as importedSaveAs } from 'file-saver';

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

  /** cliente autenticado o es el cliente asociado al usuario autenticado */
  private clienteCurrent: ClienteDTO;

  /** Se utiliza para encapsular los filtros busqueda ingresados */
  public filtros: FiltroConsecutivosAnioActualDTO;

  /** Son los filtros validos enviados al servicio http */
  public filtrosClone: FiltroConsecutivosAnioActualDTO;

  /** Identifica si hay filtro aplicado por el usuario */
  public hayFiltroAplicado: boolean;

  /** Lista de items para mostrarlo en el componente de filtros por usuarios */
  public usuarios: Array<SelectItemDTO>;

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

  /** Paginador model para la tabla de consecutivos solicitados */
  public consecutivosPaginados: PaginadorModel;

  /** Es el detalle del consecutivo a visualizar */
  public consecutivoDetalle: ConsecutivoDetalleDTO;

  /** Son los campos filtros origen */
  public camposFiltroOrigen: Array<CampoFiltroDTO>;

  /** Son los campos filtros a visualizar en pantalla para ser agregados */
  public camposFiltro: Array<CampoFiltroDTO>;

  /** Son los campos filtros agregados */
  public camposFiltroAgregados: Array<CampoFiltroDTO>;

  /** Es el filter ingresado para la busqueda por nombre del campo */
  public filterValue: string;

  /** identificadores de cada tipo de campo (transversal)*/
  public ID_CAMPO_TEXTO = TipoCamposConstant.ID_CAMPO_TEXTO;
  public ID_LISTA_DESPLEGABLE = TipoCamposConstant.ID_LISTA_DESPLEGABLE;
  public ID_CAMPO_FECHA = TipoCamposConstant.ID_CAMPO_FECHA;

  /** Se utiliza para resetear la tabla campos filtros cuando hacen alguna busqueda*/
  @ViewChild('tblCamposFiltro') tblCampos: Table;

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

    // se consulta los datos iniciales para este modulo
    this.correspondenciaService.getInitConsecutivosAnioActual(this.clienteCurrent.id).subscribe(
      data => {
        // se verifica si hay consecutivos inicial
        if (data.consecutivos && data.consecutivos.cantidadTotal && data.consecutivos.cantidadTotal > 0) {

          // se configura el paginador
          this.consecutivosPaginados = new PaginadorModel(this);
          this.consecutivosPaginados.configurarRegistros(data.consecutivos);

          // se configura la fechas min-max para los filtros
          data.fechaActual = new Date(data.fechaActual);
          this.minDateSolicitudFilter = new Date(data.fechaActual.getFullYear(), 0, 1);
          this.maxDateSolicitudFilter = new Date(data.fechaActual.getFullYear(), 11, 31);

          // se configura los usuarios para la lista desplegable
          this.usuarios = data.usuarios;

          // se utiliza para el idioma de los calendar
          this.calendarEspanish = LabelsConstant.calendarEspanish;

          // se configura los filtros de busqueda
          this.filtros = new FiltroConsecutivosAnioActualDTO();
          this.filtros.idCliente = this.clienteCurrent.id;

          // se debe inicializar el clone con los mismos datos del filtro
          this.filtrosClone = JSON.parse(JSON.stringify(this.filtros));

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
   *
   * @param table, Se utiliza para reset el paginador debido
   * que puede salir nuevos consecutivos
   */
  public refresh(table: any): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se hace el backup de los datos del paginador esto por si hay errores
    this.filtrosClone.paginador = this.consecutivosPaginados.filtroBefore();

    // se procede a consultar los consecutivos
    this.correspondenciaService.getConsecutivosAnioActual(this.filtrosClone).subscribe(
      data => {
        this.consecutivosPaginados.filtroExitoso(table, data);
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
    this.filtrosClone.paginador = this.consecutivosPaginados.datos;

    // se procede a consultar los consecutivos
    this.correspondenciaService.getConsecutivosAnioActual(this.filtrosClone).subscribe(
      data => {
        this.consecutivosPaginados.configurarRegistros(data);
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que soporta el evento click del boton filtrar
   *
   * @param table, Se utiliza para reset el paginador debido
   * que hay nuevo filtro de busqueda y nuevos registros
   */
  public filtrar(table: any): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se procede a organizar los criterios de busqueda ingresado
    this.orgarnizarFiltro();

    // solo se invoca si hay algun criterio de busqueda ingresado
    if (this.isNuevoFilter()) {

      // se hace el backup de los datos del paginador esto por si hay errores
      this.filtros.paginador = this.consecutivosPaginados.filtroBefore();

      // se procede a consultar los consecutivos
      this.correspondenciaService.getConsecutivosAnioActual(this.filtros).subscribe(
        data => {
          // se configura los nuevos consecutivos
          this.consecutivosPaginados.filtroExitoso(table, data);

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
   * Metodo que permite soportar el evento de ver detalle del consecutivo
   */
  public verDetalleConsecutivo(consecutivo: ConsecutivoDTO): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se construye el filtro de busqueda
    const filtroDetalle = new ConsecutivoDetalleDTO();
    filtroDetalle.idCliente = this.clienteCurrent.id;
    filtroDetalle.idConsecutivo = consecutivo.idConsecutivo;

    // se procede a consultar el detalle del consecutivo
    this.correspondenciaService.getDetalleConsecutivo(filtroDetalle).subscribe(
      data => {
        this.consecutivoDetalle = data;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite soportar el evento click del boton regresar del panel detalle
   */
  public cerrarDetalleConsecutivo(): void {
    this.consecutivoDetalle = null;
  }

  /**
   * Metodo que permite descargar el documento seleccionado del detalle consecutivo
   *
   * @param datosDocumento, son los datos del documento seleccionado a descargar
   */
  public descargarDocumento(datosDocumento: DocumentoDTO): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // son los identificadores necesarios para la descarga
    const idCliente = this.clienteCurrent.id + '';
    const idDocumento = datosDocumento.id + '';

    // se procede a descargar el documento
    this.correspondenciaService.descargarDocumento(idCliente, idDocumento).subscribe(
      data => {
        importedSaveAs(data, datosDocumento.nombreDocumento);
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite soportar el evento click del boton agregar filtro
   *
   * @param event, evento ejecutado desde el navegador, se utiliza para abrir o cerrar el modal
   * @param actualTarget, es el div donde apuntara el modal para se posicionado
   * @param overlaypanel, es la referencia del modal para abrir o cerrarlo
   */
  public showModalAgregarFiltro(event, actualTarget, overlaypanel: OverlayPanel, ): void {

    // se valida si se debe consultar los campos filtros
    if (!this.camposFiltroOrigen || this.camposFiltroOrigen.length === 0) {

      // se limpia los mensajes anteriores
      this.messageService.clear();

      // se invoca el servicio para consultar los campos filtro
      this.correspondenciaService.getCamposFiltro(this.clienteCurrent.id).subscribe(
        data => {
          // se configura los campos
          this.camposFiltro = data;
          this.camposFiltroOrigen = data;

          // se procede abrir el modal
          overlaypanel.toggle(event, actualTarget);
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    } else {
      // se procede abrir o cerrar el modal
      overlaypanel.toggle(event, actualTarget);
    }
  }

  /**
   * Metodo que permite soportar el evento filter por nombre del campo
   */
  public busquedaNombreCampo(): void {

    // el valor del filtro no puede ser indefinido
    if (this.filterValue && this.filterValue.length > 0) {

      // se crea la instancia de la lista de campos filtro
      this.camposFiltro = new Array<CampoFiltroDTO>();

      // se busca el campo que coincide con el valor
      for (const campo of this.camposFiltroOrigen) {
        if (campo.nombreCampo &&
            campo.nombreCampo.toUpperCase().includes(this.filterValue.toUpperCase())) {
            this.camposFiltro.push(campo);
        }
      }
    } else {
      this.camposFiltro = this.camposFiltroOrigen;
    }

    // se refresca la tabla de campos
    this.tblCampos.reset();
  }

  /**
   * Metodo que es invocado cuando cierran el modal de agregar filtro
   */
  public hideModalAgregarFiltro(): void {

    // se valida que si existan campos parametrizados
    if (this.camposFiltroOrigen && this.camposFiltroOrigen.length > 0) {

      // se limpia los campos agregado
      this.camposFiltroAgregados = null;

      // se recorre cada campo en busqueda de los agregado
      for (const campo of this.camposFiltroOrigen) {

        // si este campo es seleccionado se procede agregarlo
        if (campo.agregado) {
          if (!this.camposFiltroAgregados) {
            this.camposFiltroAgregados = new Array<CampoFiltroDTO>();
          }
          this.camposFiltroAgregados.push(campo);
        }
      }
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
