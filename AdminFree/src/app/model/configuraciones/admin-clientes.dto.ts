import { AutenticacionDTO } from './autenticacion.dto';
import { ClienteDTO } from './cliente.dto';

/**
 * DTO para transportar los datos iniciales del modulo administrar clientes
 *
 * @author Carlos Andres Diaz
 *
 */
export class AdminClientesDTO {

  /** DTO con los datos de la autenticacion */
  public credenciales: AutenticacionDTO;

  /** Lista de clientes parametrizados en el sistema */
  public clientes: Array<ClienteDTO>;
}
