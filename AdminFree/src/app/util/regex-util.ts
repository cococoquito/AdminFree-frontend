/**
 * Clase utilitaria para validar las expresiones regulares del sistema
 *
 * @author Carlos Andres Diaz
 */
export class RegexUtil {

  /** Mensaje cuando el valor no es numerico */
  public readonly SOLO_NUMEROS_MSJ = '? debe ser numérico';

  /** Se utiliza para validar que la expresion sea solo numeros */
  public readonly SOLO_NUMEROS: RegExp = /^[0-9]*$/;

  /**
   * Metodo que permite validar si una cadena es solo numeros
   */
  public isValorNumerico(cadena: string): boolean {
    return this.SOLO_NUMEROS.test(cadena);
  }
}
