import { CampoEntradaDTO } from './campo-entrada.dto';

/**
 * DTO que se utiliza para la edicion de los campos de entrada
 *
 * @author Carlos Andres Diaz
 */
export class CampoEntradaEdicionDTO {

  /** Contiene los datos del campo de entrada a editar */
  public campoEntrada: CampoEntradaDTO;

  /** indica si el campo de entrada tiene nomenclaturas */
  public tieneNomenclaturas: boolean;

  /** Indica si el campo de entrada esta asociado algun consecutivo */
  public tieneConsecutivos: boolean;

  /** Indica si los datos basicas del campo se debe editar */
  public datosBasicosEditar: boolean;

  /** Indica si los items fueron modificados */
  public itemsEditar: boolean;
}
