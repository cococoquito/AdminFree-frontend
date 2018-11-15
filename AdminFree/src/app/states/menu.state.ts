import { MenuItem } from './../modules/shell/menus/model/menu-item';
import { Injectable } from '@angular/core';

/**
 * Es el estado en la que se encuentra el Menu de la app
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class MenuState {

  public modulos: Array<MenuItem>;

  constructor() {
    console.log('MenuState CREADO');
    this.construirMenu();
  }

  private construirMenu() {
    this.modulos = new Array<MenuItem>();

    const correspondencia = new MenuItem();
    correspondencia.nombre = 'Correspondencia';

    const solicitarConsecutivo = new MenuItem();
    solicitarConsecutivo.nombre = 'Solicitar';

    const consecutivosSolicitados = new MenuItem();
    consecutivosSolicitados.nombre = 'Consecutivos';

    correspondencia.agregarItem(solicitarConsecutivo);
    correspondencia.agregarItem(consecutivosSolicitados);

    this.modulos.push(correspondencia);

    const archivoGestion = new MenuItem();
    archivoGestion.nombre = 'Archivo de Gestión';

    const series = new MenuItem();
    series.nombre = 'Series';

    const archivar = new MenuItem();
    archivar.nombre = 'Archivar';

    archivoGestion.agregarItem(series);
    archivoGestion.agregarItem(archivar);

    this.modulos.push(archivoGestion);
  }

}
