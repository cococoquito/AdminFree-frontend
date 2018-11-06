import { Injectable } from '@angular/core';
import { ClienteDTO } from './../dtos/configuraciones/cliente.dto';
import { CredencialesDTO } from './../dtos/seguridad/credenciales.dto';
import { TipoEventoConstant } from './../constants/tipo-evento.constant';

/**
 * Es el estado del local store de la aplicacion
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class LocalStoreState {

  /** Key que representa los clientes en el local-store*/
  private readonly KEY_CLIENTES: string = 'CLIENTES';

  /** Key que representa las credenciales en el local-store*/
  private readonly KEY_CREDENCIALES: string = 'CREDENCIALES';

  /**
   * Metodo que permite administrar las credenciales de seguridad en el LOCAL-STORE
   */
  public credenciales(evento: TipoEventoConstant, credenciales?: CredencialesDTO): CredencialesDTO {
    return this.implementarEvento(evento, this.KEY_CREDENCIALES, credenciales);
  }

  /**
   * Metodo que permite administrar los clientes del LOCAL-STORE
   */
  public clientes(evento: TipoEventoConstant, clientes?: Array<ClienteDTO>): Array<ClienteDTO> {
    return this.implementarEvento(evento, this.KEY_CLIENTES, clientes);
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
