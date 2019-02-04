import { ItemDTO } from './../configuraciones/item.dto';

/**
 * DTO que se utiliza para consultar los campos relacionados
 * a la nomenclatura seleccionada cuando se solicita o edita
 * los consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
export class CampoEntradaDetalleDTO {

  /** Identificador del campo */
  public id: string;

  /** Identificador de la siguiente tabla NOMENCLATURAS_CAMPOS_ENTRADA.ID_NOME_CAMPO */
  public idCampoNomenclatura: number;

  /** nombre del campo */
  public nombre: string;

  /** descripcion del campo */
  public descripcion: string;

  /** identifica el tipo de campo */
  public tipoCampo: number;

  /** son las restricciones que tiene este campo */
  public restricciones: Array<string>;

  /** Son los items para este campo, solo aplica para lista desplegable */
  public items: Array<ItemDTO>;
}
