import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterConstant } from 'src/app/constants/router.constant';
import { EnglishService } from 'src/app/services/english.service';
import { SeriesDTO } from 'src/app/dtos/english/serie.dto';
import { MsjUtil } from 'src/app/util/messages.util';
import { MessageService } from 'primeng/api';
import { CommonComponent } from 'src/app/util/common.component';

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
export class SeriesComponent extends CommonComponent implements OnInit {

  /** Lista de series parametrizados en el sistema */
  public series: Array<SeriesDTO>;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   * 
   * @param router, Router para la navegacion entre paginas
   * 
   * @param englishService, se utiliza para consumir
   * los servicios relacionados a este proceso negocio
   */
  constructor(
    protected messageService: MessageService,
    private router: Router, 
    private englishService: EnglishService) {
    super();
  }

  /**
   * Aca se debe inicializar las variables globales de este componente
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Metodo que soporta el evento click de creacion de series
   */
  public goToCreateSeries(): void {
    this.router.navigate([RouterConstant.NAVIGATE_CREATE_SERIES]);
  }

  /**
   * Metodo que soporta el evento click de edicion de series
   */
  public goToEditSeries(): void {
    this.router.navigate([RouterConstant.NAVIGATE_EDIT_SERIES]);
  }


  /**
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a consultar los
   * series parametrizadas en el sistema
   */
  private init(): void {
    this.englishService.getSeries().subscribe(
      data => {
        this.series = data;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }
}
