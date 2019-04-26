import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ArchivoGestionService } from '../../../services/archivo-gestion.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { FiltroSerieDocumentalDTO } from '../../../dtos/archivogestion/filtro-serie-documental.dto';
import { ClienteDTO } from '../../../dtos/configuraciones/cliente.dto';
import { PaginadorModel } from '../../../model/paginador-model';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from '../../../util/messages.util';
import { LabelsConstant } from '../../../constants/labels.constant';

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

  /** DTO donde se encapsula los datos del filtro de busqueda */
  public filtro: FiltroSerieDocumentalDTO;

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

    // se construye el DTO para el filtro de busqueda de series documentales
    this.filtro = new FiltroSerieDocumentalDTO();
    this.filtro.idCliente = this.clienteCurrent.id;

    // se consulta las series documentales parametrizadas en el sistema
    this.archivoGestionService.getInitAdminSeriesDocumentales(this.clienteCurrent.id).subscribe(
      data => {
        // se verifica si hay series documentales asociados al cliente autenticado
        if (data.series && data.series.cantidadTotal && data.series.cantidadTotal > 0) {

          // se configura el paginador
          this.seriesPaginados = new PaginadorModel(this);
          this.seriesPaginados.configurarRegistros(data.series);
        }
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }
}
