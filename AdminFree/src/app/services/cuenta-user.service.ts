import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UsuarioDTO } from './../dtos/seguridad/usuario.dto';
import { MessageResponseDTO } from './../dtos/transversal/message-response.dto';
import { CambioClaveDTO } from './../dtos/configuraciones/cambio-clave.dto';
import { ConfiguracionesConstant } from './../constants/configuraciones.constant';

/**
 * Clase que contiene todos los servicios para
 * la administracion de la cuenta del usuario
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class CuentaUserService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}

  /**
   * Servicio que permite actualizar los datos de la cuenta
	 * del usuario, solamente aplica (Nombre, Usuario Ingreso)
   *
   * @param usuario, DTO 	que contiene los datos del usuario
   * @return OK, si todo el proceso se ejecuto sin errores
   */
  public modificarDatosCuenta(usuario: UsuarioDTO): Observable<MessageResponseDTO> {
    return this.http.put<MessageResponseDTO>(
      ConfiguracionesConstant.URL_MODIFICAR_DATOS_CUENTA,
      usuario
    );
  }

  /**
   * Servicio que permite soportar el proceso de modificar la clave de ingreso
   *
   * @param datos, DTO que contiene los datos para el proceso de la modificacion
   * @return OK, si todo el proceso se ejecuto sin errores
   */
  public modificarClaveIngreso(datos: CambioClaveDTO): Observable<MessageResponseDTO> {
    return this.http.put<MessageResponseDTO>(
      ConfiguracionesConstant.URL_MODIFICAR_CLAVE,
      datos
    );
  }
}
