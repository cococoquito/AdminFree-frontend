import { TipoDocumentalDTO } from '../dtos/archivogestion/tipo-documental.dto';

/**
 * Model del componente autocomplete de primeng
 *
 * @author Carlos Andres Diaz
 *
 */
export class AutoCompleteModel {

  /** Identificadores de los tipos de items que soporta el AutoComplete*/
  public static readonly TIPOS_DOCUMENTALES: number = 1;

  /** Son todos los items del componente**/
  public items: Array<any>;

  /** Son todos los items filtrados de acuerdo al valor ingresado**/
  public suggestions: Array<any>;

  /** Es el valor ingresado por el usuario **/
  public valor: string;

  /**
    * Metodo que se ejecuta cuando van ingresando valores en el componente
    * donde se consultan los valores que coincidan con el valor ingresado
    *
    * @param event , contiene el valor ingresado
    */
  public search(event): void {
    this.suggestions = new Array<any>();
    if (this.items && this.items.length) {
      for (const item of this.items) {
        if (item.nombre.toLowerCase().indexOf(event.query.toLowerCase()) >= 0) {
          this.suggestions.push(item.nombre);
        }
      }
    }
  }

  /**
    * Metodo que busca el valor ingresado si existe en los items
    * @param type, indica el tipo de item se debe instanciar
    */
  public getItemSelected(type: number): any {
    let itemSelected = null;

    // se remueve los espacios en blanco ingresado
    this.valor = this.setTrimFilter(this.valor);

    // se valida si hay valor ingresado
    if (this.valor) {

      // se configura la instancia del item seleccionado a retornar
      if (type === AutoCompleteModel.TIPOS_DOCUMENTALES) {
        itemSelected = new TipoDocumentalDTO();
        itemSelected.nombre = this.valor;
      }

      // se procede a buscar el item que coincida con el nombre ingresado
      if (this.items && this.items.length) {
        for (const item of this.items) {
          if (item.nombre === this.valor) {
            itemSelected.id = item.id;
            break;
          }
        }
      }

      // se limpia el valor ingresado dado que ya lo solicitaron
      this.valor = null;
    }
    return itemSelected;
  }

  /**
   * Metodo que permite to reset el autocomplete
   */
  public reset(): void {
    this.suggestions = new Array<any>();
    this.valor = null;
  }

  /**
   * Metodo remueve los espacios en blanco del comienzo y final
   */
  private setTrimFilter(valor: string): string {
    valor = (valor) ? valor.trim() : null;
    valor = (valor !== null && valor.length === 0) ? null : valor;
    return valor;
  }
}
