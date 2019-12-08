import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/util/common.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MsjFrontConstant } from 'src/app/constants/messages-frontend.constant';
import { RouterConstant } from 'src/app/constants/router.constant';
import { Router } from '@angular/router';

/**
 * Componente para la pagina de estudio
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent extends CommonComponent implements OnInit {

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   * 
   * @param router, Router para la navegacion entre paginas
   * 
   * @param confirmationService, se utiliza para mostrar el
   * modal de confirmacion para diferente procesos
   */
  constructor(
    protected messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super();
  }

  /**
   * Se debe inicializar las variables globales
   */
  ngOnInit() {
  }

  /**
   * Metodo que soporta el evento click del boton come back
   */
  public goToListSeries(): void {
    this.confirmationService.confirm({
      message: MsjFrontConstant.SEGURO_SALIR,
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {
        this.router.navigate([RouterConstant.ROUTER_ENGLISH]);
      }
    });
  }
}
