import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/util/common.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EnglishService } from 'src/app/services/english.service';
import { RouterConstant } from 'src/app/constants/router.constant';
import { TipoEventoConstant } from 'src/app/constants/tipo-evento.constant';
import { LocalStoreUtil } from 'src/app/util/local-store.util';
import { SerieDTO } from 'src/app/dtos/english/serie.dto';
import { MsjUtil } from 'src/app/util/messages.util';
import { MsjFrontConstant } from 'src/app/constants/messages-frontend.constant';

/**
 * Componente para la edition de las series
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-edition-series',
  templateUrl: './edition-series.component.html',
  styleUrls: ['./edition-series.component.css']
})
export class EditionSeriesComponent extends CommonComponent implements OnInit {

  /** Es la serie seleccionada para editar*/
  public serie: SerieDTO;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   * 
   * @param router, Router para la navegacion entre paginas
   * 
   * @param confirmationService, se utiliza para mostrar el
   * modal de confirmacion para diferente procesos
   *
   * @param englishService, se utiliza para consumir
   * los servicios relacionados a este proceso negocio
   */
  constructor(
    protected messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private englishService: EnglishService) {
    super();
  }

  /**
   * Se debe inicializar las variables globales
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Metodo que permite agregar una nueva temporada para esta serie
   */
  public addSeason(): void {

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.CONF_ADD_SEASON,
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se procede a invocar el servicio para agregar la temporada
        this.englishService.addSeason(this.serie.id).subscribe(
          data => {
            this.serie = data;
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que soporta el evento click del boton come back
   */
  public goToListSeries(): void {
    this.router.navigate([RouterConstant.ROUTER_ENGLISH]);
  }

  /**
   * Se debe consultar los detalles de la serie
   */
  private init(): void {

    // se obtiene el identificador de la serie del localstore
    const idSerie = LocalStoreUtil.idSerie(TipoEventoConstant.GET);

    // solo aplica si hay id de la serie en el local
    if (idSerie) {

      // se debe eliminar el id del local
      LocalStoreUtil.idSerie(TipoEventoConstant.ELIMINAR);

      // se procede a buscar el detalle de la serie a editar
      this.englishService.getDetailSerie(idSerie).subscribe(
        data => {
          this.serie = data;
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    }
  }
}
