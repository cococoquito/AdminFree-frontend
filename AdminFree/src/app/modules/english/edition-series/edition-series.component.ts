import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/util/common.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EnglishService } from 'src/app/services/english.service';
import { RouterConstant } from 'src/app/constants/router.constant';

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

  ngOnInit() {
  }

  /**
   * Metodo que soporta el evento click del boton come back
   */
  public goToListSeries(): void {
    this.router.navigate([RouterConstant.ROUTER_ENGLISH]);
  }
}
