/**
 * Clase utilitaria para las fechas del sistema
 *
 * @author Carlos Andres Diaz
 */
export class FechaUtil {

  /**
   * Compares two Date objects and returns e number value that represents the result:
   * 0 if the two dates are equal.
   * 1 if the first date is greater than second.
   * -1 if the first date is less than second.
   * @param date1 First date object to compare.
   * @param date2 Second date object to compare.
   */
  public static compareDate(date1: Date, date2: Date): number {

    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), 0, 0, 0);
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), 0, 0, 0);

    // Check if the dates are equal
    const same = d1.getTime() === d2.getTime();
    if (same) {
      return 0;
    }

    // Check if the first is greater than second
    if (d1 > d2) {
      return 1;
    }

    // Check if the first is less than second
    if (d1 < d2) {
      return -1;
    }
  }

  /**
   * Valida si la fecha clone con la fecha ingresada son iguales
   * permitiendo saber si hay una fecha nueva para los criterios busqueda
   *
   * true = si ambos criterios son iguales
   * false = si ambos criterios son diferentes
   */
  public static iqualsDateFilter(clone: Date, filter: Date): boolean {

    // se inicializa la bandera como si no fueran iguales
    let fechasIgual = false;

    // si ambos no son nulo o indefinido se procede a validar su valor
    if (clone && filter) {

      // se procede a validar el valor del clone con el filtro ingresado
      if (this.compareDate(new Date(clone), new Date(filter)) === 0) {
        fechasIgual = true;
      }
    } else if (!clone && !filter) {
      // los dos valores son iguales si ambos son nulos o indefinido
      fechasIgual = true;
    }
    return fechasIgual;
  }

  /**
   * Metodo que permite convertir un string a DATE
   * sincronizada a la zona horaria de colombia
   *
   * @param value , cadena de la fecha retornada desde el server
   */
  public static stringToDate(value: string): Date {
    if (value) {
      return new Date(value.replace(/-/g, '\/').replace(/T.+/, ''));
    }
    return null;
  }
}
