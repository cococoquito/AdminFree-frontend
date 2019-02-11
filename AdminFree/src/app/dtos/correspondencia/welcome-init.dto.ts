import { WelcomeNomenclaturaDTO } from './welcome-nomenclatura.dto';
import { WelcomeUsuarioDTO } from './welcome-usuario.dto';

/**
 * DTO para transportar los datos para la pagina de bienvenida de la aplicacion
 *
 * @author Carlos Andres Diaz
 */
export class WelcomeInitDTO {

  /** Son las nomenclaturas a mostrar en la pagina bienvenida */
  public nomenclaturas: Array<WelcomeNomenclaturaDTO>;

  /** Son los usuarios a mostrar en la pagina bienvenida */
  public usuarios: Array<WelcomeUsuarioDTO>;
}
