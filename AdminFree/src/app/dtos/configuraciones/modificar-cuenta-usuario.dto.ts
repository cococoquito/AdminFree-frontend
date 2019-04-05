import { UsuarioDTO } from './../seguridad/usuario.dto';
import { CambioClaveDTO } from './cambio-clave.dto';
import { CambioUsuarioIngresoDTO } from './cambio-usuario-ingreso.dto';

/**
 * DTO para el proceso de negocio de cambiar la cuenta de usuario esto aplica
 * para datos personales, usuario ingreso o contrasenia
 *
 * @author Carlos Andres Diaz
 */
export class ModificarCuentaUsuarioDTO {

  /** DTO que contiene los datos personales a modificar **/
  public datosPersonales: UsuarioDTO;

  /** DTO que contiene los datos para el cambio de la contrasenia **/
  public cambioClave: CambioClaveDTO;

  /** DTO que contiene los datos para el cambio del usuario de ingreso **/
  public cambioUsuario: CambioUsuarioIngresoDTO;
}
