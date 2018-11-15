import { Injectable } from '@angular/core';
import { MenuModulo } from './../modules/shell/model/menu-modulo';

/**
 * Es el estado en la que se encuentra el Menu de la app
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class MenuState {

  public modulos: Array<MenuModulo>;

  constructor() {
    console.log('MenuState CREADO');
    this.construirMenu();
  }

  private construirMenu() {
    this.modulos = new Array<MenuModulo>();

    const correspondencia: MenuModulo = new MenuModulo();
    correspondencia.nombre = 'Correspondencia';
    this.modulos.push(correspondencia);

    const archivoGestion: MenuModulo = new MenuModulo();
    archivoGestion.nombre = 'Archivo de Gestión';
    this.modulos.push(archivoGestion);

    const reportes: MenuModulo = new MenuModulo();
    reportes.nombre = 'Reportes';
    this.modulos.push(reportes);

    const configuraciones: MenuModulo = new MenuModulo();
    configuraciones.nombre = 'Configuraciones';
    this.modulos.push(configuraciones);
  }

}
