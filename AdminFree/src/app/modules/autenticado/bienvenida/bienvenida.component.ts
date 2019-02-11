import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { ShellState } from '../../../states/shell/shell.state';
import { CommonComponent } from '../../../util/common.component';
import { WelcomeInitDTO } from '../../../dtos/correspondencia/welcome-init.dto';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from '../../../util/messages.util';

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

  /** Contiene los datos de la bienvenida de la aplicacion */
  public datosWelcome: WelcomeInitDTO;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param correspondenciaService, contiene los servicios
   * del modulo de correspondencia
   *
   * @param shellState, se utiliza para el titulo del componente
   * y obtener los datos de bienvenida despues del login
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

    // se obtiene los datos de bienvenida del estado del user-account, esto
    // es debido que cuando se autentique el user el componente login recibe
    // los datos de bienvenida y lo configura en el user-account state
    this.datosWelcome = this.shellState.userAccount.datosWelcome;

    // se valida si hay algun dato
    if (!this.datosWelcome) {

      // si no hay datos de bienvenida se procede a consultarlos
      const cliente = LocalStoreUtil.getCurrentCliente();
      this.correspondenciaService.getDatosBienvenida(cliente.id).subscribe(
        data => {
          this.datosWelcome = data;
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    } else {
      // si existe los datos de bienvenida se debe limpiar para cuando
      // refresquen la pagina esta consulte directamente del servicio http
      this.shellState.userAccount.datosWelcome = null;
    }
  }
}
