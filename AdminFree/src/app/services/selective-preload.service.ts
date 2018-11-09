import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { of, Observable } from 'rxjs';

/**
 * Servicio que permite cargar solamente los modulos
 * que tiene la marca de preload=true
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class SelectivePreload implements PreloadingStrategy {

  /**
   * Metodo que permite validar si un modulo se puede
   * descargar asincronamente, solamente se usa para los
   * modulos que son de uso frecuente
   */
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}
