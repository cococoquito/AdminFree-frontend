import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ArchivoGestionService } from '../../../services/archivo-gestion.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { PaginadorModel } from '../../../model/paginador-model';
import { SerieDocumentalDTO } from '../../../dtos/archivogestion/serie-documental.dto';
import { SubSerieDocumentalDTO } from '../../../dtos/archivogestion/sub-serie-documental.dto';
import { FiltroSerieDocumentalDTO } from '../../../dtos/archivogestion/filtro-serie-documental.dto';
import { ClienteDTO } from '../../../dtos/configuraciones/cliente.dto';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from '../../../util/messages.util';
import { LabelsConstant } from '../../../constants/labels.constant';
import { MsjFrontConstant } from '../../../constants/messages-frontend.constant';
import { TipoEventoConstant } from '../../../constants/tipo-evento.constant';

/**
 * Componente para la administracion de las series documentales
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './admin-series-documentales.component.html',
  styleUrls: ['./admin-series-documentales.component.css'],
  providers: [ ArchivoGestionService ]
})
export class AdminSeriesDocumentalesComponent extends CommonComponent implements OnInit, OnDestroy {

  /** cliente autenticado o es el cliente asociado al usuario */
  private clienteCurrent: ClienteDTO;

  /** Paginador de la lista de series documentales parametrizados en el sistema */
  public seriesPaginados: PaginadorModel;

  /** DTO donde se encapsula los valores del filtro de busqueda */
  public filtro: FiltroSerieDocumentalDTO;

  /** contiene los valores del filtro consultado */
  public filtroClone: FiltroSerieDocumentalDTO;

  /** Se utiliza para pintar el asterisco en el boton filtrar */
  public hayFiltroAplicado: boolean;

  /** Se utiliza para expandir las filas de cada serie asi visualizar las subseries*/
  public expandAllSeries;

  /** Se utiliza para resetear la tabla de series cuando aplican un filtro*/
  @ViewChild('tblseries') tblseries: Table;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para mostrar el
   * modal de confirmacion para diferente procesos
   *
   * @param archivoGestionService, se utiliza para consumir
   * los servicios relacionados a este proceso negocio
   *
   * @param shellState, se utiliza para el titulo del componente
   */
  constructor(
    protected messageService: MessageService,
    private confirmationService: ConfirmationService,
    private archivoGestionService: ArchivoGestionService,
    private shellState: ShellState) {
    super();
  }

  /**
   * Se debe consultar las series documentales parametrizado en el sistema
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
   * series documentales y configuracion de los titulos
   */
  private init(): void {

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = LabelsConstant.TITLE_ADMIN_SERIES_DOCUMENTALES;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_ADMIN_SERIES_DOCUMENTALES;

    // se procede a obtener el cliente autenticado
    this.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // se consulta los datos iniciales para este submodulo
    this.archivoGestionService.getInitAdminSeriesDocumentales(this.clienteCurrent.id).subscribe(
      data => {
        // se verifica si hay series documentales asociados al cliente autenticado
        if (data && data.series && data.series.cantidadTotal) {

          // se configura el paginador de las series
          this.seriesPaginados = new PaginadorModel(this);
          this.seriesPaginados.configurarRegistros(data.series);

          // se construye el DTO para el filtro de busqueda con su clone
          this.filtro = new FiltroSerieDocumentalDTO();
          this.filtro.idCliente = this.clienteCurrent.id;
          this.filtroClone = JSON.parse(JSON.stringify(this.filtro));

          // se procede a expandir todas las filas de las series
          this.expandRowsSeries();
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
    this.filtroClone.paginador = this.seriesPaginados.datos;

    // se procede a consultar las series documentales
    this.archivoGestionService.getSeriesDocumentales(this.filtroClone).subscribe(
      data => {
        this.seriesPaginados.configurarRegistros(data);
        this.expandRowsSeries();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite soportar el evento click del boton filtrar
   */
  public filtrar(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se eliminan los espacios
    this.filtro.codigoSerieDocumental = this.setTrimFilter(this.filtro.codigoSerieDocumental);
    this.filtro.nombreSerieDocumental = this.setTrimFilter(this.filtro.nombreSerieDocumental);
    this.filtro.codigoSubSerieDocumental = this.setTrimFilter(this.filtro.codigoSubSerieDocumental);
    this.filtro.nombreSubSerieDocumental = this.setTrimFilter(this.filtro.nombreSubSerieDocumental);

    // se valida cada criterio con el clone del filtro
    if (this.filtro.codigoSerieDocumental !== this.filtroClone.codigoSerieDocumental ||
      this.filtro.nombreSerieDocumental !== this.filtroClone.nombreSerieDocumental ||
      this.filtro.codigoSubSerieDocumental !== this.filtroClone.codigoSubSerieDocumental ||
      this.filtro.nombreSubSerieDocumental !== this.filtroClone.nombreSubSerieDocumental) {

      // se hace el backup de los datos del paginador esto por si hay errores
      this.filtro.paginador = this.seriesPaginados.filtroBefore();

      // se procede a consultar las series documentales
      this.archivoGestionService.getSeriesDocumentales(this.filtro).subscribe(
        data => {
          // se configura los nuevas series consultadas
          this.seriesPaginados.filtroExitoso(this.tblseries, data);

          // se debe clonar los filtros asi evitar solicitudes si no hay nuevos criterios
          this.filtroClone = JSON.parse(JSON.stringify(this.filtro));

          // se verifica si hay algun filtro aplicado
          this.hayFiltroAplicado = false;
          if (this.filtroClone.codigoSerieDocumental ||
            this.filtroClone.nombreSerieDocumental ||
            this.filtroClone.codigoSubSerieDocumental ||
            this.filtroClone.nombreSubSerieDocumental) {
            this.hayFiltroAplicado = true;
          }

          // se procede a expandir todas las filas de las series
          this.expandRowsSeries();
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    }
  }

  /**
   * Metodo que permite soportar el evento click del boton eliminar serie documental
   */
  public eliminarSerie(serie: SerieDocumentalDTO): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.ELIMINAR_SERIE_SUBSERIE
        .replace('?1', 'serie')
        .replace('?2', serie.nombre)
        .replace('?3', 'text-uppercase'),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se construye el request necesario para la eliminacion
        const request = new SerieDocumentalDTO();
        request.idSerie = serie.idSerie;
        request.tipoEvento = TipoEventoConstant.ELIMINAR;
        this.filtro.paginador = this.seriesPaginados.filtroBefore();
        request.filtro = this.filtro;

        // se procede a eliminar la serie
        this.archivoGestionService.administrarSerieDocumental(request).subscribe(
          data => {
            // Mensaje exitoso, serie documental fue eliminado
            this.messageService.add(MsjUtil.getToastSuccessMedium(MsjFrontConstant.SERIE_SUBSERIE_ELIMINADA.replace('?1', 'serie')));

            // se configura los nuevas series consultadas
            this.seriesPaginados.filtroExitoso(this.tblseries, data);

            // se procede a expandir todas las filas de las series
            this.expandRowsSeries();
          },
          error => {
            this.messageService.add(MsjUtil.getToastErrorLng(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que permite soportar el evento click del boton eliminar sub-serie documental
   */
  public eliminarSubSerie(serie: SerieDocumentalDTO, subSerie: SubSerieDocumentalDTO): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.ELIMINAR_SERIE_SUBSERIE
        .replace('?1', 'subserie')
        .replace('?2', subSerie.nombre)
        .replace('?3', 'text-capitalize'),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se procede a eliminar la subserie
        const request = new SubSerieDocumentalDTO();
        request.idSerie = serie.idSerie;
        request.idSubSerie = subSerie.idSubSerie;
        request.tipoEvento = TipoEventoConstant.ELIMINAR;
        this.archivoGestionService.administrarSubSerieDocumental(request).subscribe(
          data => {
            // Mensaje exitoso, sub-serie documental fue eliminado
            this.messageService.add(MsjUtil.getToastSuccessMedium(MsjFrontConstant.SERIE_SUBSERIE_ELIMINADA.replace('?1', 'subserie')));

            // el servicio retorna las subseries relacionados a esta serie documental
            serie.subSeries = data;
          },
          error => {
            this.messageService.add(MsjUtil.getToastErrorLng(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que permite expandir todas las filas de las series
   * para visualizar las subseries de cada serie consultada
   */
  private expandRowsSeries(): void {
    this.expandAllSeries = {};
    if (this.seriesPaginados.registros && this.seriesPaginados.registros.length) {
      for(const serie of this.seriesPaginados.registros) {
        this.expandAllSeries[serie.idSerie] = 1;
      }
    }
  }
}
