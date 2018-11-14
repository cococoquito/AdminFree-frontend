import { ClienteDTO } from './../dtos/configuraciones/cliente.dto';
import { WelcomeDTO } from './../dtos/seguridad/welcome.dto';
import { CredencialesDTO } from './../dtos/seguridad/credenciales.dto';
import { TipoEventoConstant } from './../constants/tipo-evento.constant';

/**
 * Clase utilitaria para la administracion del localstore
 *
 * @author Carlos Andres Diaz
 */
export class LocalStoreUtil {

  /** Key que representa los clientes en el local-store*/
  private static readonly KEY_CLIENTES: string = 'CLIENTES';

  /** Key que representa las credenciales para admin-clientes en el local-store*/
  private static readonly KEY_ADMIN_CLIENTES: string = 'ADMIN_CLIENTES';

  /** Key que representa los datos de entrada al sistema*/
  private static readonly KEY_WELCOME: string = 'WELCOME';

  /**
   * Metodo que permite administrar los clientes en el LOCAL-STORE
   */
  public static clientes(evento: TipoEventoConstant, clientes?: Array<ClienteDTO>): Array<ClienteDTO> {
    return this.implementarEvento(evento, this.KEY_CLIENTES, clientes);
  }

  /**
   * Metodo que permite administrar los datos de las credenciales
   * del usuario quien administra los clientes en el sistema
   */
  public static credencialesAdminClientes(evento: TipoEventoConstant, adminClientes?: CredencialesDTO): CredencialesDTO {
    return this.implementarEvento(evento, this.KEY_ADMIN_CLIENTES, adminClientes);
  }

  /**
   * Metodo que permite administrar el DTO que contiene
   * los datos de inicio de sesion en el sistema
   */
  public static welcome(evento: TipoEventoConstant, welcomeDTO?: WelcomeDTO): WelcomeDTO {
    return this.implementarEvento(evento, this.KEY_WELCOME, welcomeDTO);
  }

  /**
   * Metodo que permite obtener las credenciales del admin-clientes o
   * del funcionario o del administrador del sistema
   */
  public static getCurrentCredenciales(): CredencialesDTO {
    const welcome: WelcomeDTO = this.welcome(TipoEventoConstant.GET);
    if (welcome && welcome.credenciales) {
      return welcome.credenciales;
    }
    return this.credencialesAdminClientes(TipoEventoConstant.GET);
  }

  /**
   * Metodo que permite limpiar todo el local-store para ADMIN-FREE
   */
  public static cleanAll(): void {
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
  private static implementarEvento(evento: TipoEventoConstant, key: string, dataUpdate?: any): any {
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
