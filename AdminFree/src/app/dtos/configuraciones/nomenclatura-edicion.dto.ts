import { NomenclaturaDTO } from './nomenclatura.dto';
import { CampoEntradaDTO } from './campo-entrada.dto';

/**
 * DTO que se utiliza para la edicion de la nomenclatura
 *
 * @author Carlos Andres Diaz
 */
export class NomenclaturaEdicionDTO {

  /** Contiene los datos de la nomenclatura a editar */
  public nomenclatura: NomenclaturaDTO;

  /** Si no hay campos al momento de editar la nomenclatura*/
  public campos: Array<CampoEntradaDTO>;

  /** Indica si los datos basicos de la nomenclatura se debe editar */
  public datosBasicosEditar: boolean;

  /** Indica si los campos de entrada se deben editar */
  public camposEntradaEditar: boolean;

  /** Indica si las restricciones se deben editar */
  public restriccionesEditar: boolean;
}
