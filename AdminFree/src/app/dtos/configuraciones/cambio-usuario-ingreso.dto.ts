/**
 * DTO para el proceso de negocio de cambio de usuario de ingreso
 *
 * @author Carlos Andres Diaz
 *
 */
export class CambioUsuarioIngresoDTO {

    /** Identificador del user a modificar el usuario de ingreso **/
    public idUsuario: number;

    /** Es el nuevo usuario a modificar */
    public usuario: string;

    /** Es la clave actual que tiene el usuario */
    public claveActual: string;
}
