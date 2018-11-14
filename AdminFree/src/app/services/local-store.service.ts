import { Injectable } from '@angular/core';
import { UsuarioDTO } from './../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../dtos/configuraciones/cliente.dto';
import { WelcomeDTO } from './../dtos/seguridad/welcome.dto';
import { ModuloDTO } from './../dtos/seguridad/modulo.dto';
import { CredencialesDTO } from './../dtos/seguridad/credenciales.dto';
import { TipoEventoConstant } from './../constants/tipo-evento.constant';

/**
 * Sevicio que permite administrar los datos almacenados en el local-store
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class LocalStoreService {

  /** Key que representa los clientes en el local-store*/
  private readonly KEY_CLIENTES: string = 'CLIENTES';

  /** Key que representa las credenciales para admin-clientes en el local-store*/
  private readonly KEY_ADMIN_CLIENTES: string = 'ADMIN_CLIENTES';

  /** Key que representa los datos de entrada al sistema*/
  private readonly KEY_WELCOME: string = 'WELCOME';

  /**
   * Metodo que permite administrar los clientes en el LOCAL-STORE
   */
  public clientes(evento: TipoEventoConstant, clientes?: Array<ClienteDTO>): Array<ClienteDTO> {
    return this.implementarEvento(evento, this.KEY_CLIENTES, clientes);
  }

  /**
   * Metodo que permite administrar los datos de las credenciales
   * del usuario quien administra los clientes en el sistema
   */
  public credencialesAdminClientes(evento: TipoEventoConstant, adminClientes?: CredencialesDTO): CredencialesDTO {
    return this.implementarEvento(evento, this.KEY_ADMIN_CLIENTES, adminClientes);
  }

  /**
   * Metodo que permite administrar el DTO que contiene
   * los datos de inicio de sesion en el sistema
   */
  public welcome(evento: TipoEventoConstant, welcomeDTO?: WelcomeDTO): WelcomeDTO {
    return this.implementarEvento(evento, this.KEY_WELCOME, welcomeDTO);
  }

  /**
   * Metodo que permite obtener las credenciales del funcionario o admin
   */
  public getCredenciales(): CredencialesDTO {
    const welcome: WelcomeDTO = this.welcome(TipoEventoConstant.GET);
    if (welcome) {
      return welcome.credenciales;
    }
    return null;
  }

  /**
   * Metodo que permite obtener las credenciales del admin-clientes o
   * del funcionario o del administrador del sistema
   */
  public getCurrentCredenciales(): CredencialesDTO {
    let credenciales: CredencialesDTO = this.getCredenciales();
    if (!credenciales) {
        credenciales = this.credencialesAdminClientes(TipoEventoConstant.GET);
    }
    return credenciales;
  }

  /**
   * Metodo que permite obtener los datos del usuario autenticado
   * ClienteDTO = administrador, UsuarioDTO = funcionario
   *
   * @returns ClienteDTO = administrador, UsuarioDTO = funcionario
   */
  public getDatosUsuarioAutenticado(): ClienteDTO | UsuarioDTO {
    let datosUsuario: ClienteDTO | UsuarioDTO;

    // se obtiene el DTO que contiene los datos del funcionario o admin
    const welcome: WelcomeDTO = this.welcome(TipoEventoConstant.GET);

    // dependiendo del quien se ha autenticado se procede a obtener el dato
    if (welcome) {
      datosUsuario = (welcome.administrador) ? welcome.administrador : welcome.usuario;
    }
    return datosUsuario;
  }

  /**
   * Metodo que permite limpiar todo el local-store para ADMIN-FREE
   */
  public cleanAll(): void {
    localStorage.removeItem(this.KEY_CLIENTES);
    localStorage.removeItem(this.KEY_ADMIN_CLIENTES);
    localStorage.removeItem(this.KEY_WELCOME);
  }

  /**
   * Metodo que permite implementar un evento solicitado
   *
   * @param evento , indica que tipo de evento es
   * @param key , identifica el key del local-store
   * @param dataUpdate , valor actualizar en el local, es opcional
   */
  private implementarEvento(evento: TipoEventoConstant, key: string, dataUpdate?: any): any {
    // contiene el resultado a retornar, opcional
    let resultado = null;

    // se verifica que tipo de evento es solicitado
    switch (evento) {

      // evento para OBTENER algun valor del local-store
      case TipoEventoConstant.GET: {
        const value = localStorage.getItem(key);
        if (value) {
          resultado = JSON.parse(value);
        }
        break;
      }

      // evento para REMOVER algun valor del local-store
      case TipoEventoConstant.REMOVE: {
        localStorage.removeItem(key);
        break;
      }

      // evento para SET algun valor del local-store
      case TipoEventoConstant.SET: {
        localStorage.setItem(key, JSON.stringify(dataUpdate));
        break;
      }
    }
    return resultado;
  }
}
