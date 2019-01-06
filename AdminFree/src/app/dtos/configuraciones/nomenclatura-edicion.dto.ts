import { NomenclaturaDTO } from './nomenclatura.dto';

/**
 * DTO que se utiliza para la edicion de la nomenclatura
 *
 * @author Carlos Andres Diaz
 */
export class NomenclaturaEdicionDTO {

  /** Contiene los datos de la nomenclatura a editar */
  public nomenclatura: NomenclaturaDTO;

  /** Indica si los datos basicos de la nomenclatura se debe editar */
  public datosBasicosEditar: boolean;

  /** Indica si los campos de entrada se debe editar */
  public camposEntradaEditar: boolean;
}
