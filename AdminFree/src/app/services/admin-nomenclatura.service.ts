import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NomenclaturaDTO } from './../dtos/configuraciones/nomenclatura.dto';
import { NomenclaturaCreacionDTO } from '../dtos/configuraciones/nomenclatura-creacion.dto';
import { NomenclaturaEdicionDTO } from '../dtos/configuraciones/nomenclatura-edicion.dto';
import { MessageResponseDTO } from '../dtos/transversal/message-response.dto';
import { ConfiguracionesConstant } from './../constants/configuraciones.constant';

/**
 * Clase que contiene todos los servicios para la administracion
 * de las nomenclaturas en el sistema
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class AdminNomenclaturaService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}

  /**
	 * Servicio que permite obtener todas las nomenclaturas asociadas a un cliente
	 *
	 * @param idCliente, identificador del cliente quien le pertenece las nomenclaturas
	 * @return lista de nomenclaturas con sus atributos configuradas
	 */
  public getNomenclaturas(idCliente: number): Observable<Array<NomenclaturaDTO>> {
    return this.http.get<Array<NomenclaturaDTO>>(
      ConfiguracionesConstant.URL_GET_NOMENCLATURAS + idCliente
    );
  }

  /**
	 * Servicio que permite crear una nomenclatura
	 *
	 * @param datos, contiene los datos de la creacion
	 * @return Nomenclatura con el identificador generado
	 */
  public crearNomenclatura(datos: NomenclaturaCreacionDTO): Observable<NomenclaturaDTO> {
    return this.http.post<NomenclaturaDTO>(
      ConfiguracionesConstant.URL_CREAR_NOMENCLATURA,
      datos
    );
  }

  /**
	 * Servicio que permite editar la nomenclatura
	 *
	 * @param datos, contiene los datos de la edicion
	 */
  public editarNomenclatura(datos: NomenclaturaEdicionDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ConfiguracionesConstant.URL_EDITAR_NOMENCLATURA,
      datos
    );
  }

  /**
	 * Servicio que permite validar si la nomenclatura ya existe en el sistema
	 *
	 * @param nomenclatura, DTO que contiene los datos para la validacion
	 */
  public validarExisteNomenclatura(nomenclatura: NomenclaturaDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ConfiguracionesConstant.URL_VALIDAR_EXISTE_NOMENCLATURA,
      nomenclatura
    );
  }

  /**
	 * Servicio que permite eliminar una nomenclatura del sistema
	 *
	 * @param idNomenclatura, identificador de la nomenclatura
	 */
  public eliminarNomenclatura(idNomenclatura: number): Observable<MessageResponseDTO> {
    return this.http.delete<MessageResponseDTO>(
      ConfiguracionesConstant.URL_ELIMINAR_NOMENCLATURA + idNomenclatura);
  }

  /**
	 * Servicio que permite consultar el detalle de la nomenclatura
	 *
	 * @param idNomenclatura, identificador de la nomenclatura
	 */
  public getDetalleNomenclatura(idNomenclatura: number): Observable<NomenclaturaEdicionDTO> {
    return this.http.get<NomenclaturaEdicionDTO>(
      ConfiguracionesConstant.URL_GET_DETALLE_NOMENCLATURA + idNomenclatura
    );
  }
}
