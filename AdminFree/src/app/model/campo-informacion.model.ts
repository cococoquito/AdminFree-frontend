import { CampoEntradaDetalleDTO } from './../dtos/correspondencia/campo-entrada-detalle.dto';

/**
 * Contiene el model de un campo de entrada informacion a visualizar en pantalla
 *
 * @author Carlos Andres Diaz
 *
 */
export class CampoInformacionModel {

  /** Contiene los datos del campo */
  public campo: CampoEntradaDetalleDTO;

  /** Es el valor ingresado o seleccionado */
  public valor: any;

  /** Indica si el campo es requerido */
  public isRequerido: boolean;

  /** Indica si el campo de texto debe ser solo numeros */
  public isSoloNumeros: boolean;

  /** Indica si el componente tiene un valor valido */
  public isValido: boolean;
}
