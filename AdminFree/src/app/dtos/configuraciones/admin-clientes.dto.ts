import { CredencialesDTO } from './../seguridad/credenciales.dto';
import { ClienteDTO } from './cliente.dto';

/**
 * DTO para transportar los datos iniciales del modulo administrar clientes
 *
 * @author Carlos Andres Diaz
 *
 */
export class AdminClientesDTO {

  /** DTO con los datos de la autenticacion para administrar los clientes */
  public credenciales: CredencialesDTO;

  /** Lista de clientes parametrizados en el sistema */
  public clientes: Array<ClienteDTO>;
}
