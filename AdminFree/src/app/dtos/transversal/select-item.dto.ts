/**
 * Se utiliza para configurar los atributos de un item para el componente selectItem
 *
 * @author Carlos Andres Diaz
 */
export class SelectItemDTO {

  /** Identificador del item */
  public id: number;

  /** Nombre del item a mostrar en el componente */
  public label: string;

  /** descripcion del item, valor opcional */
  public descripcion: string;
}
