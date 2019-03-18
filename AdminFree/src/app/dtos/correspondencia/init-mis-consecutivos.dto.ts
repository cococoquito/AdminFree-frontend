import { PaginadorResponseDTO } from '../transversal/paginador-response.dto';

/**
 * Clase que contiene los datos iniciales al momento de entrar al
 * submodulo de mis consecutivos solicitados para el anio actual
 *
 * @author Carlos Andres Diaz
 */
export class InitMisConsecutivosDTO {

    /** Es el response inicial de los consecutivos paginados **/
    public consecutivos: PaginadorResponseDTO;

    /**
     * Es la fecha actual del sistema, no se puede tomar directamente desde angular
     * ya que se tomaria la fecha de la maquina del cliente
     */
    public fechaActual: Date;
}
