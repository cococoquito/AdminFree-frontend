/**
 * Clase utilitaria para validar las expresiones regulares del sistema
 *
 * @author Carlos Andres Diaz
 */
export class RegexUtil {

  /** Se utiliza para validar que la expresion sea solo numeros */
  public readonly SOLO_NUMEROS: RegExp = /^[0-9]*$/;

  /** Alfanumerico sin caracteres especiales */
  public readonly ALFANUMERICO: RegExp = /^[^!]+$/;

  /** Mensaje cuando el valor no es numerico */
  private readonly SOLO_NUMEROS_MSJ = '? debe ser numérico';

  /**
   * Metodo que permite validar si una cadena es solo numero
   *
   * @param cadena , es el valor a evaluar
   */
  public isValorNumerico(cadena: string): boolean {
    return this.SOLO_NUMEROS.test(cadena);
  }

  /**
   * Metodo que permite configurar el mensaje el campo
   * debe ser numerico para ser visualizado en pantalla
   *
   * @param nombreCampo , nombre del campo que debe ser numerico
   */
  public getMsjSoloNumeros(nombreCampo: string): string {
    return this.SOLO_NUMEROS_MSJ.replace('?', nombreCampo);
  }
}
