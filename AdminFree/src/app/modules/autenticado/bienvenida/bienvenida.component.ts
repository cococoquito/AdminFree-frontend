import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { ShellState } from '../../../states/shell/shell.state';
import { CommonComponent } from '../../../util/common.component';

/**
 * Componente que respalda la pagina de bienvenida
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css'],
  providers: [ CorrespondenciaService ]
})
export class BienvenidaComponent extends CommonComponent implements OnInit, OnDestroy {
  value = 25;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param correspondenciaService, contiene los servicios
   * del modulo de correspondencia
   *
   * @param shellState, se utiliza para el titulo del componente
   */
  constructor(
    protected messageService: MessageService,
    private correspondenciaService: CorrespondenciaService,
    private shellState: ShellState) {
    super();
  }

  /**
   * Se debe consultar las nomenclaturas y los usuarios con
   * su estadisticas de solicitudes de consecutivos
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Se utiliza para limpiar los mensajes visualizados pantalla
   */
  ngOnDestroy(): void {
    this.messageService.clear();
    this.shellState.title.tituloClass = null;
  }

  /**
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a consultar los
   * las nomenclaturas y los usuarios del sistema
   */
  private init(): void {

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = 'Bienvenido AdminFree';
    this.shellState.title.tituloClass = 'font-size-24';
    this.shellState.title.subTitulo = 'Diseñado para ayudarte a manejar tu información rápida y segura';
  }
}
