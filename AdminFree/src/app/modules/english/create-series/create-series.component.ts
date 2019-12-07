import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterConstant } from 'src/app/constants/router.constant';
import { MsjFrontConstant } from 'src/app/constants/messages-frontend.constant';
import { SerieDTO } from 'src/app/dtos/english/serie.dto';
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
  public serie: SerieDTO;

  /** indica si el usuario ya dio click en el boton save */
  public submit: boolean;

  /** se utiliza para limpiar el componente de carga de img*/
  @ViewChild('inImg') inImg: any;

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

    // inidica que el usuario ya dio click boton enviar
    this.submit = true;

    // se valida los campos de ingresos obligatorios
    this.serie.name = this.setTrimFilter(this.serie.name);
    this.serie.url = this.setTrimFilter(this.serie.url);
    if (!this.serie.name || !this.serie.url) {
      return;
    }

    // la imagen es requerida
    if (!this.img) {
      this.messageService.add(MsjUtil.getToastError('Imagen Requerida'));
      return;
    }

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.CONF_CREAR_SERIE,
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se configura los parametros necesarios para la creacion
        const parametros = new FormData();
        parametros.append('img', this.img);
        parametros.append('name', this.serie.name);
        parametros.append('url', this.serie.url);

        // se procede a invocar el servicio para la creacion
        this.englishService.createSerie(parametros).subscribe(
          data => {
            this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.SERIE_CREADO_EXITOSO));
            this.init();
            this.cleanImg();
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
    this.serie = new SerieDTO();
    this.submit = false;
    this.img = null;
  }

  /**
   * Metodo para limpiar la img cargada
   */
  private cleanImg(): void {
    if (this.inImg) {
      this.inImg.clear();
    }
  }
}
