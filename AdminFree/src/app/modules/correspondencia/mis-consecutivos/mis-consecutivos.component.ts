import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { FiltroConsecutivosState } from '../../../states/transversal/filtro-consecutivos.state';
import { LabelsConstant } from '../../../constants/labels.constant';

/**
 * Componente para la administracion de los consecutivos de
 * correspondencia solicitados que les pertenece al usuario
 * autenticado para el anio actual
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-mis-consecutivos',
  templateUrl: './mis-consecutivos.component.html',
  styleUrls: ['./mis-consecutivos.component.css'],
  providers: [ CorrespondenciaService, FiltroConsecutivosState ]
})
export class MisConsecutivosComponent extends CommonComponent implements OnInit, OnDestroy {

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param correspondenciaService, contiene los servicios
   * del modulo de correspondencia
   *
   * @param shellState, se utiliza para el titulo del componente
   *
   * @param stateFiltro, se utiliza como mediador para administrar los datos
   * o llamados de metodos entre este componente y el componente filtro busqueda
   */
  constructor(
    protected messageService: MessageService,
    private correspondenciaService: CorrespondenciaService,
    private shellState: ShellState,
    public stateFiltro: FiltroConsecutivosState) {
    super();
  }

   /**
   * Se debe obtener los datos iniciales del sub-modulo
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Cuando se destruya el componente se debe limpiar los mensajes
   */
  ngOnDestroy(): void {
    this.messageService.clear();
  }

  /**
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a consultar los
   * consecutivos y configurar el titulo y subtitulo
   */
  private init(): void {

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = LabelsConstant.TITLE_MIS_CONSECUTIVOS_SOLICITADOS;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_MIS_CONSECUTIVOS_SOLICITADOS;
  }
}
