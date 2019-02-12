import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { ShellState } from '../../../states/shell/shell.state';
import { CommonComponent } from '../../../util/common.component';
import { WelcomeInitDTO } from '../../../dtos/correspondencia/welcome-init.dto';
import { WelcomeUsuarioDTO } from '../../../dtos/correspondencia/welcome-usuario.dto';
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
  providers: [CorrespondenciaService]
})
export class BienvenidaComponent extends CommonComponent
  implements OnInit, OnDestroy {
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
    private shellState: ShellState
  ) {
    super();
  }

  /**
   * Se debe consultar las nomenclaturas y los usuarios con
   * sus cantidades de solicitudes de consecutivos
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Se utiliza para limpiar los mensajes visualizados en pantalla
   * y el class del titulo para que no se refleje para los demas component
   */
  ngOnDestroy(): void {
    this.messageService.clear();
    this.shellState.title.tituloClass = null;
  }

  /**
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a consultar
   * las nomenclaturas y los usuarios del sistema
   */
  private init(): void {
    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = 'Bienvenido AdminFree';
    this.shellState.title.tituloClass = 'font-size-23';
    this.shellState.title.subTitulo =
      'Diseñado para ayudarte a manejar tu información rápida y segura';

    // se obtiene los datos de bienvenida del estado del user-account, esto
    // es debido que cuando se autentique el user, el componente login recibe
    // los datos de bienvenida y lo configura en el user-account state
    this.datosWelcome = this.shellState.userAccount.datosWelcome;

    // se valida si hay algun dato
    if (!this.datosWelcome) {
      // si no hay datos de bienvenida se procede a consultarlos
      const cliente = LocalStoreUtil.getCurrentCliente();
      this.correspondenciaService.getDatosBienvenida(cliente.id).subscribe(
        data => {
          this.datosWelcome = data;
          this.configurarPorcentajes();
          this.configurarColorNomenclatura();
        },
        error => {
          this.messageService.add(
            MsjUtil.getMsjError(this.showMensajeError(error))
          );
        }
      );
    } else {
      // si existe los datos de bienvenida se debe limpiar para cuando
      // refresquen la pagina esta consulte directamente del servicio http
      this.shellState.userAccount.datosWelcome = null;
      this.configurarPorcentajes();
      this.configurarColorNomenclatura();
    }
  }

  private configurarPorcentajes(): void {
    if (this.datosWelcome) {
      const nomenclaturas = this.datosWelcome.nomenclaturas;
      const usuarios = this.datosWelcome.usuarios;

      if (
        nomenclaturas != null &&
        nomenclaturas.length > 0 &&
        usuarios &&
        usuarios.length > 0
      ) {
        let cantidadConseNomenclatura = 0;
        let cantidadConseUsuarios = 0;
        for (const nomenclatura of nomenclaturas) {
          cantidadConseNomenclatura =
            cantidadConseNomenclatura + nomenclatura.cantidadConsecutivos;
        }

        for (const usuario of usuarios) {
          if (usuario.cantidadConsecutivos > 0) {
            const por = 100 * usuario.cantidadConsecutivos;
            usuario.porcentaje = Math.round(por / cantidadConseNomenclatura);
            cantidadConseUsuarios =
              cantidadConseUsuarios + usuario.cantidadConsecutivos;
          } else {
            usuario.porcentaje = 0;
          }
        }
        const admin = new WelcomeUsuarioDTO();
        admin.nombreCompleto = 'Administrador';
        admin.cargo = 'Administrador del Sistema';
        admin.porcentaje = Math.round(
          ((cantidadConseNomenclatura - cantidadConseUsuarios) * 100) /
            cantidadConseNomenclatura
        );
        admin.cantidadConsecutivos =
          cantidadConseNomenclatura - cantidadConseUsuarios;

        const usuariosV = new Array<WelcomeUsuarioDTO>();
        usuariosV.push(admin);
        for (const usuario of usuarios) {
          usuariosV.push(usuario);
        }
        this.datosWelcome.usuarios = usuariosV;
      }
    }
  }

  public configurarColorNomenclatura(): void {
    const color1 = 'monthly-views';
    const color2 = 'monthly-users';
    const color3 = 'monthly-users2';
    const color4 = 'monthly-sales';
    const nomenclaturas = this.datosWelcome.nomenclaturas;
    let i = 1;
    let colorBK;
    for (const nomenclatura of nomenclaturas) {
      if (i % 2 === 0) {
        if (colorBK && colorBK === color1) {
          nomenclatura.bgColor = color2;
          colorBK = color2;
        } else {
          nomenclatura.bgColor = color4;
          colorBK = color4;
        }
      } else {
        if (colorBK && colorBK === color2) {
          nomenclatura.bgColor = color3;
          colorBK = color3;
        } else {
          nomenclatura.bgColor = color1;
          colorBK = color1;
        }
      }
      i = i + 1;
    }
  }
}
