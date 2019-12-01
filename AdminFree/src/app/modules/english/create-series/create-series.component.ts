import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterConstant } from 'src/app/constants/router.constant';
import { SeriesDTO } from 'src/app/dtos/english/serie.dto';

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
export class CreateSeriesComponent implements OnInit {

  /** es la imagen cargada para la creacion*/
  public img: any;

  /** Es la nueva serie a crear */
  public serie: SeriesDTO;

  /**
   * @param router, Router para la navegacion entre paginas
   */
  constructor(private router: Router) { }

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
  }
}
