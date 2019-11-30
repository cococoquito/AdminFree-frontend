import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterConstant } from 'src/app/constants/router.constant';

/**
 * Componente donde se muestran todas las serires parametrizadas en el sistema
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  /**
   * @param router, Router para la navegacion entre paginas
   */
  constructor(private router: Router) { }

  /**
   * Aca se debe inicializar las variables globales de este componente
   */
  ngOnInit() {
  }

  /**
   * Metodo que soporta el evento click de creacion de series
   */
  public goToCreateSeries(): void {
    this.router.navigate([RouterConstant.NAVIGATE_CREATE_SERIES]);
  }
}
