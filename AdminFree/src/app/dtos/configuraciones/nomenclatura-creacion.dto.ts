import { NomenclaturaDTO } from './nomenclatura.dto';

/**
 * DTO que se utiliza para la creacion de la nomenclatura
 *
 * @author Carlos Andres Diaz
 */
export class NomenclaturaCreacionDTO {

  /** Contiene los datos de la nomenclatura a crear */
  public nomenclatura: NomenclaturaDTO;

  /** Son los campos asociados a la nomenclatura */
  public idsCampos: Array<number>;
}
