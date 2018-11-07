import { RolDTO } from './rol.dto';
import { ClienteDTO } from '../configuraciones/cliente.dto';

/**
 * DTO para transportar los datos del usuario del sistema
 *
 * @author Carlos Andres Diaz
 *
 */
export class UsuarioDTO {

  /** Identificador del usuario */
  public id: number;

  /** Nombre del usuario */
  public nombre: string;

  /** Cliente donde pertenece el usuario */
  public cliente: ClienteDTO;

  /** Lista de ROLES que tiene el usuario */
  public roles: Array<RolDTO>;
}
