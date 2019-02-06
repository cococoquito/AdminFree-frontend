import { Pipe, PipeTransform } from '@angular/core';
import { LabelsConstant } from '../constants/labels.constant';

/**
 * Pipe para visualizar el consecutivo en un formato de 4 digitos
 * ejemplo, valor = 1 resultado = 0001
 *
 * @author Carlos Andres Diaz
 */
@Pipe({ name: 'consecutivo' })
export class ConsecutivoPipe implements PipeTransform {

  /**
   * Metodo que permite transformar el consecutivo al formato correcto
   *
   * @param value , es el consecutivo a dar formato,
   * puede ser numerico o string
   *
   * @param text, texto a mostrar cuando el valor del consecutivo
   * es nulo o idenfinido o cero
   */
  transform(value: any, text: string): string {
    if (value) {
      return LabelsConstant.RANGO.substring(value.toString().length) + value;
    }
    return text;
  }
}
