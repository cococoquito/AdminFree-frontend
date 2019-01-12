import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
 * Clase que contiene los servicios del modulo de Correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class CorrespondenciaService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}
}
