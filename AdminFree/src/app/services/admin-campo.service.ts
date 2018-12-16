import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
 * Clase que contiene todos los servicios para la administracion
 * de los campos de entrada de informacion para solicitar un consecutivo
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class AdminCampoService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}


}
