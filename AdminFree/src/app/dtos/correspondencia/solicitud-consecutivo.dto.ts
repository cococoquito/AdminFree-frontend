import { CampoEntradaValueDTO } from './campo-entrada-value.dto';

/**
 * Contiene los datos de la solicitud para un consecutivo de correspondencia
 *
 * @author Carlos Andres Diaz
 */
export class SolicitudConsecutivoDTO {

  /** Identificador del cliente autenticado */
  public idCliente: number;

  /** Identificador de la nomenclatura seleccionada */
  public idNomenclatura: number;

  /** Son los valores ingresados para la solicitud o edicion del consecutivo */
  public valores: Array<CampoEntradaValueDTO>;
}
