import { CredencialesDTO } from './credenciales.dto';
import { ClienteDTO } from './../configuraciones/cliente.dto';
import { UsuarioDTO } from './usuario.dto';
import { WelcomeInitDTO } from '../correspondencia/welcome-init.dto';

/**
 * DTO para transportar los datos de inicio cuando el user o admin se autentique
 * frente al sistema
 *
 * @author Carlos Andres Diaz
 *
 */
export class WelcomeDTO {

  /** Es el USUARIO autenticado en el sistema */
  public usuario: UsuarioDTO;

  /** Es el ADMIN autenticado en el sistema */
  public administrador: ClienteDTO;

  /** Son las credenciales del USUARIO o ADMIN */
  public credenciales: CredencialesDTO;

  /** Contiene los datos de la bienvenida de la aplicacion */
  public datosWelcome: WelcomeInitDTO;
}
