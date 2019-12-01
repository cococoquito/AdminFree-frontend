import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterConstant } from 'src/app/constants/router.constant';
import { MsjFrontConstant } from 'src/app/constants/messages-frontend.constant';
import { SeriesDTO } from 'src/app/dtos/english/serie.dto';
import { EnglishService } from 'src/app/services/english.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MsjUtil } from 'src/app/util/messages.util';
import { CommonComponent } from 'src/app/util/common.component';

/**
 * Componente para la creacion de las series
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-create-series',
  templateUrl: './create-series.component.html',
  styleUrls: ['./create-series.component.css']
})
export class CreateSeriesComponent extends CommonComponent implements OnInit {

  /** es la imagen cargada para la creacion*/
  public img: any;

  /** Es la nueva serie a crear */
  public serie: SeriesDTO;

  /** se utiliza para validar los campos requeridos */
  public nameRequired: boolean;
  public urlRequired: boolean;

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
   * Metodo que soporta el evento click del boton create serie
   */
  public createSerie(): void {

    // se valida los campos de ingresos obligatorios
    this.validateInValues();
    if (this.nameRequired || this.urlRequired) {
      return;
    }

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.CONF_CREAR_SERIE,
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se procede a invocar el servicio para la creacion
        this.englishService.createSerie(this.serie).subscribe(
          data => {

            // mensaje de creacion exitoso
            this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.SERIE_CREADO_EXITOSO));

            // se procede almacenar la imagen asociada a esta serie
            if (this.img) {

              // se configura los parametros para la imagen
              const parametros = new FormData();
              parametros.append('img', this.img);
              parametros.append('idSerie', data.id + '');

              // se procede hacer la invocacion del cargue de la imagen
              this.englishService.downloadImgSerie(parametros).subscribe(
                res => {
                  this.messageService.add(MsjUtil.getToastSuccessLng(res.mensaje));
                  this.init();
                },
                error => {
                  this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
                }
              );
            } else {
              this.init();
            }
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que soporta el evento del boton 'Download image'
   *
   * @param event, contiene la imagen a cargar
   */
  public downloadImage(event): void {
    this.img = event.files[0];
  }

  /**
   * Metodo que soporta el evento click del boton come back
   */
  public goToListSeries(): void {
    this.router.navigate([RouterConstant.ROUTER_ENGLISH]);
  }

  /**
   * Metodo que es invocado al momento de la creacion del componente
   */
  private init(): void {
    this.serie = new SeriesDTO();
    this.img = null;
    this.nameRequired = false;
    this.urlRequired = false;
  }

  /**
   * Metodo para validar si los campos de ingresos son requeridos
   */
  private validateInValues(): void {
    this.nameRequired = false;
    this.urlRequired = false;
    this.serie.name = this.setTrimFilter(this.serie.name);
    this.serie.url = this.setTrimFilter(this.serie.url);
    if (!this.serie.name) {
      this.nameRequired = true;
    }
    if (!this.serie.url) {
      this.urlRequired = true;
    }
  }
}
