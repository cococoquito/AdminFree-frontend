import { AppDomainConstant } from './app-domain.constant';

/**
 * Clase que contiene todas las constantes para el modulo de seguridad
 *
 * @author Carlos Andres Diaz
 */
export class SeguridadConstant {

  /** Nombre del REST para el modulo seguridad*/
  static readonly SEGURIDAD_API: string = 'authapi/';

  /** URL del recurso para la autenticacion para el modulo administracion de clientes*/
  static readonly URL_ADMIN_CLIENTES_AUTH: string =
    AppDomainConstant.ADMINFREE +
    SeguridadConstant.SEGURIDAD_API +
    'adminclientesauth';

  /** URL del recurso para la autenticacion en el sistema*/
  static readonly URL_AUTH: string =
    AppDomainConstant.ADMINFREE +
    SeguridadConstant.SEGURIDAD_API +
    'auth';
}
