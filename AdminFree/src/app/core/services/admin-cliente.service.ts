import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ClienteDTO } from './../../model/configuraciones/cliente.dto';
import { ApiConfiguracionesEnum, AppEnum } from './../../enums/app-enums';

/**
 * Clase que contiene todos los servicios para
 * la administracion de los clientes
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class AdminClienteService {

  /**
   * Creates an instance of AdminClienteService
   *
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}

  /**
   * Servicio que permite obtener los CLIENTES del sistema
   *
   * @return lista de CLIENTES parametrizados en el sistema
   */
  getClientes(): Observable<ClienteDTO[]> {
    return this.http.get<ClienteDTO[]>(
        AppEnum.DOMINIO_REST +
        ApiConfiguracionesEnum.CONFIGURACIONES_API +
        ApiConfiguracionesEnum.CLIENTES
    );
  }
}
