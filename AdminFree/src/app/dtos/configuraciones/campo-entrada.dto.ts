import { ItemDTO } from './item.dto';
import { RestriccionDTO } from './restriccion.dto';
import { NomenclaturaCampoDTO } from './nomenclatura-campo.dto';

/**
 * DTO que contiene los atributos para los campos de entrada de informacion
 *
 * @author Carlos Andres Diaz
 *
 */
export class CampoEntradaDTO {

  /** Es el identificador del campo de entrada */
  public id: number;

  /** Los campos de ingreso estan asociados a un cliente */
  public idCliente: number;

  /** Nombre del campo de entrada */
  public nombre: string;

  /** Descripcion del campo de entrada */
  public descripcion: string;

  /** Identifica el tipo de campo (input,list,check,date) */
  public tipoCampo: number;

  /** Nombre del tipo de campo */
  public tipoCampoNombre: string;

  /** Son los items para este campo, solo aplica para lista desplegable */
  public items: Array<ItemDTO>;

  /** Son las restricciones que contiene este campo */
  public restricciones: Array<RestriccionDTO>;

  /** Se utiliza al momento de crear la nomenclatura */
  public aplica: boolean;

  /** Se usa en ANGULAR y se utiliza para la edicion de la nomenclatura */
  public campoNomenclatura: NomenclaturaCampoDTO;
}
