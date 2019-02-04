import { CampoEntradaValueDTO } from './campo-entrada-value.dto';

/**
 * DTO que es utilizado para los procesos de negocio de solicitar consecutivos
 * de correspondencia y validar los campos de entrada de informacion (paso 2)
 *
 * @author Carlos Andres Diaz
 */
export class SolicitudConsecutivoDTO {

  /** Identificador del cliente autenticado */
  public idCliente: number;

  /** Identificador de la nomenclatura seleccionada */
  public idNomenclatura: number;

  /** Identificador del usuario quien solicita el consecutivo */
  public idUsuario: number;

  /** Son los valores ingresados para la solicitud o edicion del consecutivo */
  public valores: Array<CampoEntradaValueDTO>;
}
