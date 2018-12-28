import { UsuarioDTO } from './../seguridad/usuario.dto';

/**
 * DTO que se utiliza para la edicion de los usuarios
 *
 * @author Carlos Andres Diaz
 */
export class UsuarioEdicionDTO {

  /** Contiene los datos del usuario a modificar */
  public usuario: UsuarioDTO;

  /** Indica si los datos basicos del usuario se debe editar */
  public datosBasicosEditar: boolean;

  /** Indica si los modulos asignados fueron modificados */
  public modulosEditar: boolean;
}
