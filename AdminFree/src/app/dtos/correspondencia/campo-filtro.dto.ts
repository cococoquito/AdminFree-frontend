/**
 * Contiene los valores de un campo que se utiliza en los
 * componentes que tiene filtro de busqueda
 *
 * @author Carlos Andres Diaz
 */
export class CampoFiltroDTO {

  /** Identificador del campo */
  public idCampo: number;

  /** Es el nombre del campo */
  public nombreCampo: string;

  /** Es el tipo de campo */
  public tipoCampo: number;

  /** es el valor ingresado para los componentes input o select item */
  public inputValue: any;

  /** es la fecha inicial para el componente fecha */
  public dateInicial: Date;

  /** es la fecha final para el componente fecha */
  public dateFinal: Date;

  /************** Variables utilizados solamente en angular ****************/
  /** Indica si el campo fue seleccionado para ser agregado al filtro */
  public agregado: boolean;

  /** Indica si este campo fue aplicado para un filtro busqueda */
  public isFiltroAplicado: boolean;
}
