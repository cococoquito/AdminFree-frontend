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

  /** Es el usuario de ingreso al sistema */
  public usuarioIngreso: string;

  /** Clave de ingreso para el USER */
  public claveIngreso: string;

  /** Es el cargo del usuario */
  public cargo: string;

  /** Estado que se encuentra el USUARIO */
  public estado: number;

  /** Es el nombre del Estado que se encuentra el USUARIO */
  public estadoNombre: string;

  /** Cliente donde pertenece el usuario */
  public cliente: ClienteDTO;

  /** Lista de Tokens de modulos asignados al usuario */
  public modulosTokens: Array<string>;
}
