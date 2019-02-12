import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { ShellState } from '../../../states/shell/shell.state';
import { CommonComponent } from '../../../util/common.component';
import { WelcomeInitDTO } from '../../../dtos/correspondencia/welcome-init.dto';
import { WelcomeUsuarioDTO } from '../../../dtos/correspondencia/welcome-usuario.dto';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from '../../../util/messages.util';
import { LabelsConstant } from '../../../constants/labels.constant';
import { EstadoConstant } from '../../../constants/estado.constant';

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
export class BienvenidaComponent extends CommonComponent implements OnInit, OnDestroy {

  /** Contiene los datos de bienvenida de la aplicacion */
  public datosWelcome: WelcomeInitDTO;

  /** Constantes que representan los identificadores de ACTIVO e INACTIVO */
  public ID_ACTIVO = EstadoConstant.ID_ACTIVO;
  public ID_INACTIVO = EstadoConstant.ID_INACTIVO;

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
   * sus cantidades de consecutivos solicitados
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
    this.shellState.title.titulo = LabelsConstant.TITLE_BIENVENIDA;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_BIENVENIDA;
    this.shellState.title.tituloClass = 'font-size-23';

    // se obtiene los datos de bienvenida del estado del user-account, esto
    // es debido que cuando se autentique el user, el componente login recibe
    // los datos de bienvenida y lo configura en el user-account state
    this.datosWelcome = this.shellState.userAccount.datosWelcome;

    // si los datos no existen se procede a consultarlos
    if (!this.datosWelcome) {

      // se obtiene el cliente autenticado o el cliente del user autenticado
      const cliente = LocalStoreUtil.getCurrentCliente();

      // se hace el llamado para obtener los datos de bievenida
      this.correspondenciaService.getDatosBienvenida(cliente.id).subscribe(
        data => {
          this.datosWelcome = data;
          this.setNomenclaturasUsuarios();
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    } else {
      // si existe los datos de bienvenida se debe limpiar para cuando
      // refresquen la pagina esta consulte directamente del servicio http
      this.shellState.userAccount.datosWelcome = null;
      this.setNomenclaturasUsuarios();
    }
  }

  /**
   * Metodo que permite configurar los datos a visualizar en pantalla
   * de las nomenclaturas y los usuarios consultados en el sistema
   */
  private setNomenclaturasUsuarios(): void {

    // se verifica si los datos de bienvenida existe
    if (this.datosWelcome) {

      // se configura el estilo para las nomenclaturas obteniendo la cant total
      const cantConsecutivosNomen = this.setStyleNomenclaturas();

      // estos son los usuarios a visualizar en pantalla
      const usuariosView = new Array<WelcomeUsuarioDTO>();

      // el administrador se muestra de primero
      const admin = new WelcomeUsuarioDTO();
      admin.nombreCompleto = 'Administrador';
      admin.cargo = 'Administrador del Sistema';
      admin.porcentaje = 0;
      admin.cantidadConsecutivos = 0;
      usuariosView.push(admin);

      // se verifica si existen usuarios parametrizados
      const usuarios = this.datosWelcome.usuarios;
      if (usuarios && usuarios.length > 0) {

        // es la cantidad total de solicitudes de todos los usuarios
        let cantConsecutivosUser = 0;

        // se recorre todos los usuarios
        for (const usuario of usuarios) {

          // se verifica si el usuario tiene solicitudes de consecutivos
          usuario.porcentaje = 0;
          if (usuario.cantidadConsecutivos > 0) {

            // se incrementa la cantidad total de solicitudes de users
            cantConsecutivosUser = cantConsecutivosUser + usuario.cantidadConsecutivos;

            // se calcula el porcentaje de solicitudes de este usuario
            usuario.porcentaje = Math.round((100 * usuario.cantidadConsecutivos) / cantConsecutivosNomen);
          }
          usuariosView.push(usuario);
        }

        // se configura el porcentaje y cantidad de solicitudes del admin
        if (cantConsecutivosNomen > 0) {
            admin.cantidadConsecutivos = cantConsecutivosNomen - cantConsecutivosUser;
            admin.porcentaje = Math.round((admin.cantidadConsecutivos * 100) / cantConsecutivosNomen);
        }
      }

      // se configuran los usuarios a visualizar en pantalla
      this.datosWelcome.usuarios = usuariosView;
    }
  }

  /**
   * Metodo que permite configurar el estilo para las nomenclaturas
   * del sistema retornando la cantidad total de sus consecutivos
   * solicitados
   */
  public setStyleNomenclaturas(): number {

    // es la cantidad total de consecutivos solicitados retornar
    let cantidadTotal = 0;

    // se obtiene las nomenclaturas de los datos
    const nomenclaturas = this.datosWelcome.nomenclaturas;

    // se valida que si existan nomenclaturas parametrizadas
    if (nomenclaturas && nomenclaturas.length > 0) {

      // son los estilos de cada color
      const azul = 'azul';
      const morado = 'morado';
      const verde = 'verde';
      const naranja = 'naranja';

      // se recorre cada nomenclatura
      let index = 1;
      let colorBK;
      for (const nomenclatura of nomenclaturas) {

        // se suma la cantidad total de consecutivos
        if (nomenclatura.cantidadConsecutivos) {
            cantidadTotal = cantidadTotal + nomenclatura.cantidadConsecutivos;
        }

        // colores pares
        if (index % 2 === 0) {
          if (colorBK && colorBK === azul) {
              nomenclatura.bgColor = morado;
              colorBK = morado;
          } else {
            nomenclatura.bgColor = naranja;
            colorBK = naranja;
          }
        } else {
          // colores impares
          if (colorBK && colorBK === morado) {
              nomenclatura.bgColor = verde;
              colorBK = verde;
          } else {
            nomenclatura.bgColor = azul;
            colorBK = azul;
          }
        }
        index = index + 1;
      }
    }
    return cantidadTotal;
  }
}
