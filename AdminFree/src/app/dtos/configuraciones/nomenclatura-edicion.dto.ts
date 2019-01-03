import { NomenclaturaCampoDTO } from './nomenclatura-campo.dto';
import { NomenclaturaDTO } from './nomenclatura.dto';

/**
 * DTO que se utiliza para la edicion de la nomenclatura
 *
 * @author Carlos Andres Diaz
 */
export class NomenclaturaEdicionDTO {

  /** Contiene los datos de la nomenclatura a editar */
  public nomenclatura: NomenclaturaDTO;

  /** Son los campos asociados de la nomenclatura para la edicion */
  public campos: Array<NomenclaturaCampoDTO>;

  /** Indica si los datos basicos de la nomenclatura se debe editar */
  public datosBasicosEditar: boolean;

  /** Indica si los campos de entrada se debe editar */
  public camposEntradaEditar: boolean;

  /** Indica si la nomenclatura esta asociada a un consecutivo */
  public tieneConsecutivos: boolean;
}
