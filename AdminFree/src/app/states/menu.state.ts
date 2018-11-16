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
    correspondencia.icono = 'fa fa-fw fa-envelope';
    correspondencia.isSeleccionado = true;

    const solicitarConsecutivo = new MenuItem();
    solicitarConsecutivo.nombre = 'Solicitar';
    solicitarConsecutivo.isSeleccionado = true;

    const consecutivosSolicitados = new MenuItem();
    consecutivosSolicitados.nombre = 'Consecutivos';
    consecutivosSolicitados.isUltimoItem = true;
    consecutivosSolicitados.isSeleccionado = true;

    correspondencia.agregarItem(solicitarConsecutivo);
    correspondencia.agregarItem(consecutivosSolicitados);

    this.modulos.push(correspondencia);

    const archivoGestion = new MenuItem();
    archivoGestion.icono = 'fa fa-fw fa-folder-open';
    archivoGestion.nombre = 'Archivo de Gestión';
    archivoGestion.isSeleccionado = true;

    const series = new MenuItem();
    series.nombre = 'Series';
    series.isSeleccionado = true;

    const archivar = new MenuItem();
    archivar.nombre = 'Archivar';
    archivar.isUltimoItem = true;
    archivar.isSeleccionado = true;
    archivoGestion.agregarItem(series);
    archivoGestion.agregarItem(archivar);


    this.modulos.push(archivoGestion);

    const reportes = new MenuItem();
    reportes.icono = 'fa fa-fw fa-bar-chart';
    reportes.nombre = 'Reportes';
    reportes.isSeleccionado = true;

    const ConsecutivosSolici = new MenuItem();
    ConsecutivosSolici.nombre = 'Consecutivos Solicitados';
    ConsecutivosSolici.isSeleccionado = true;
    const seriesDoc = new MenuItem();
    seriesDoc.nombre = 'Series Documentales';
    seriesDoc.isUltimoItem = true;
    seriesDoc.isSeleccionado = true;
    reportes.agregarItem(ConsecutivosSolici);
    reportes.agregarItem(seriesDoc);
    this.modulos.push(reportes);

    const configuraciones = new MenuItem();
    configuraciones.icono = 'fa fa-fw fa-wrench';
    configuraciones.nombre = 'Configuraciones';
    configuraciones.isSeleccionado = true;
    const h = new MenuItem();
    h.nombre = 'Series';
    h.isSeleccionado = true;
    const a = new MenuItem();
    a.nombre = 'Archivar';
    a.isUltimoItem = true;
    a.isSeleccionado = true;
    configuraciones.agregarItem(h);
    configuraciones.agregarItem(a);

    this.modulos.push(configuraciones);

  }

}
