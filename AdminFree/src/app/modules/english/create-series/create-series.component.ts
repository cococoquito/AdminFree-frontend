import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterConstant } from 'src/app/constants/router.constant';

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
  public img: FormData;

  /**
   * @param router, Router para la navegacion entre paginas
   */
  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * Metodo que soporta el evento del boton 'Download image'
   *
   * @param event, contiene la imagen a cargar
   */
  public downloadImage(event): void {
    this.img = event.files[0];
    console.log(this.img);
  }

  /**
   * Metodo que soporta el evento click del boton come back
   */
  public goToListSeries(): void {
    this.router.navigate([RouterConstant.ROUTER_ENGLISH]);
  }
}
