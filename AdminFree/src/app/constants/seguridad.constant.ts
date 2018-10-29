/**
 * Clase que contiene todas las constantes para el modulo de seguridad
 *
 * @author Carlos Andres Diaz
 */
class SeguridadConstant {

  /** Nombre del REST para el modulo seguridad*/
  static readonly SEGURIDAD_API: string = 'authapi/';

  /** URL del recurso para la autenticacion de administracion de clientes*/
  static readonly URL_ADMIN_CLIENTES_AUTH: string =
    AppDomainConstant.ADMINFREE +
    SeguridadConstant.SEGURIDAD_API +
    'adminclientesauth';
}
