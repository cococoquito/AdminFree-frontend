/**
 * DTO que contiene los atributos de los clientes del sistema
 *
 * @author Carlos Andres Diaz
 */
export class ClienteDTO {

  /** Es el identificador del cliente */
  public id: number;

  /** TOKEN que se utiliza para que el cliente se autentique en el sistema */
  public token: string;

  /** Nombre del cliente */
  public nombre: string;

  /** telefonos del cliente */
  public telefonos: string;

  /** correos del cliente */
  public emails: string;

  /** fecha de activacion del cliente sobre el sistema */
  public fechaActivacion: Date;

  /** fecha de Inaactivacion del cliente sobre el sistema */
  public fechaInactivacion: Date;

  /** Estado que se encuentra el cliente */
  public estado: number;

  /** Es el nombre del Estado que se encuentra el cliente */
  public estadoNombre: string;

  /** Identifica que tipo de accion se va ralizar sobre el cliente */
  public tipoEvento: string;
}
