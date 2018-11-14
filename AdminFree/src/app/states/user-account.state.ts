import { Injectable } from '@angular/core';
import { LocalStoreUtil } from './../util-class/local-store.util';
import { CredencialesDTO } from './../dtos/seguridad/credenciales.dto';
import { ClienteDTO } from './../dtos/configuraciones/cliente.dto';
import { UsuarioDTO } from './../dtos/seguridad/usuario.dto';
import { WelcomeDTO } from './../dtos/seguridad/welcome.dto';
import { TipoEventoConstant } from './../constants/tipo-evento.constant';

/**
 * Es el estado en la que se encuentra la cuenta del usuario
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class UserAccountState {

  /** Es el USUARIO autenticado en el sistema cuando aplica */
  public usuario: UsuarioDTO;

  /** Es el ADMIN autenticado en el sistema cuando aplica */
  public administrador: ClienteDTO;

  /** Son las credenciales del USUARIO o ADMIN autenticado */
  public credenciales: CredencialesDTO;

  /**
   * Cuando se carga la pagina se crea la instancia del
   * estado de la cuenta del user, se debe tomar los datos
   * del local-store, dado que en este punto son nulos
   */
  constructor() {
    this.init();
  }

  /**
   * Metodo que permite cambiar el estado a autenticado
   *
   * @param welcomeDTO, contiene los datos de la autenticacion
   */
  public changeStateAutenticado(welcomeDTO: WelcomeDTO): void {
    LocalStoreUtil.welcome(TipoEventoConstant.SET, welcomeDTO);
    this.configurarCuentaUser(welcomeDTO);
  }

  /**
   * Metodo que permite cambiar el estado a sesion cerrada
   */
  public changeStateSesionCerrada(): void {
    LocalStoreUtil.cleanAll();
    this.configurarCuentaUser(null);
  }

  /**
   * Metodo que es invocado del constructor de este state
   */
  private init(): void {
    const welcomeDTO: WelcomeDTO = LocalStoreUtil.welcome(TipoEventoConstant.GET);
    if (welcomeDTO) {
      this.configurarCuentaUser(welcomeDTO);
    }
  }

  /**
   * Permite configurar los datos de la cuenta del usuario
   * @param welcomeDTO, Contiene los datos de la cuenta del user
   */
  private configurarCuentaUser(welcomeDTO: WelcomeDTO): void {
    this.usuario = null;
    this.administrador = null;
    this.credenciales = null;
    if (welcomeDTO) {
      this.usuario = welcomeDTO.usuario;
      this.administrador = welcomeDTO.administrador;
      this.credenciales = welcomeDTO.credenciales;
    }
  }
}
