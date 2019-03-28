import { CampoEntradaDetalleDTO } from './campo-entrada-detalle.dto';

/**
 * Este DTO se utiliza para encapsular los atributos de un valor
 * de un consecutivo para su respectiva edicion
 *
 * @author Carlos Andres Diaz
 */
export class ConsecutivoEdicionValueDTO {

    /** Identificador del value del consecutivo */
    public idValue: number;

    /** Es el valor ingresado a editar, este valor puede ser nulo */
    public value: any;

    /** Identificador de la relacion entre la nomenclatura y el campo */
    public idCampoNomenclatura: number;

    /** Es el detalle del campo, tipo, nombre, ayuda restricciones */
    public campo: CampoEntradaDetalleDTO;
}
