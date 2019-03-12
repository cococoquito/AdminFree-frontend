import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { FiltroConsecutivosState } from '../../../states/transversal/filtro-consecutivos.state';
import { ConsecutivoDTO } from '../../../dtos/correspondencia/consecutivo.dto';
import { ConsecutivoDetalleDTO } from '../../../dtos/correspondencia/consecutivo-detalle.dto';
import { DocumentoDTO } from '../../../dtos/correspondencia/documento.dto';
import { PaginadorModel } from '../../../model/paginador-model';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from '../../../util/messages.util';
import { LabelsConstant } from '../../../constants/labels.constant';
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
  providers: [ CorrespondenciaService, FiltroConsecutivosState ]
})
export class ConsecutivosSolicitadosComponent extends CommonComponent implements OnInit, OnDestroy {

  /** Es el detalle del consecutivo a visualizar */
  public consecutivoDetalle: ConsecutivoDetalleDTO;

  /** Se utiliza para resetear la tabla de consecutivos cuando aplican un filtro*/
  @ViewChild('tblcc') tblConsecutivos: Table;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param correspondenciaService, contiene los servicios
   * del modulo de correspondencia
   *
   * @param shellState, se utiliza para el titulo del componente
   *
   * @param stateFiltro, se utiliza como mediador para administrar los datos
   * o llamados de metodos entre este componente y el filtro busqueda
   */
  constructor(
    protected messageService: MessageService,
    private correspondenciaService: CorrespondenciaService,
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
    this.shellState.title.titulo = LabelsConstant.TITLE_CONSECUTIVOS_SOLICITADOS;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_CONSECUTIVOS_SOLICITADOS;

    // se procede a obtener el cliente autenticado
    const clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // se consulta los datos iniciales para este modulo
    this.correspondenciaService.getInitConsecutivosAnioActual(clienteCurrent.id).subscribe(
      data => {
        // se verifica si hay consecutivos inicial
        if (data.consecutivos && data.consecutivos.cantidadTotal && data.consecutivos.cantidadTotal > 0) {

          // se configura el paginador
          const consecutivosPaginados = new PaginadorModel(this);
          consecutivosPaginados.configurarRegistros(data.consecutivos);

          // la fecha llega como string se debe hacer la conversion
          data.fechaActual = new Date(data.fechaActual);

          // se inicializa el state para el filtro de consecutivos
          this.stateFiltro.initComponentePadre(this,
            clienteCurrent,
            consecutivosPaginados,
            data.usuarios,
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
   * Metodo que soporta el evento click del boton refrescar
   */
  public refresh(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se hace el backup de los datos del paginador esto por si hay errores
    this.stateFiltro.filtrosClone.paginador = this.stateFiltro.consecutivosPaginados.filtroBefore();

    // se procede a consultar los consecutivos
    this.correspondenciaService.getConsecutivosAnioActual(this.stateFiltro.filtrosClone).subscribe(
      data => {
        this.stateFiltro.consecutivosPaginados.filtroExitoso(this.tblConsecutivos, data);
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
   * Metodo que permite soportar el evento de ver detalle del consecutivo
   */
  public verDetalleConsecutivo(consecutivo: ConsecutivoDTO): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se construye el filtro de busqueda
    const filtroDetalle = new ConsecutivoDetalleDTO();
    filtroDetalle.idCliente = this.stateFiltro.clienteCurrent.id;
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
    const idCliente = this.stateFiltro.clienteCurrent.id + '';
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
}
