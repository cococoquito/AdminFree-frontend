import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { ScreenState } from './screen.state';
import { MenuItem } from './../modules/shell/menus/model/menu-item';
import { ModulosConstant } from './../constants/modulos.constant';

/**
 * Se utiliza para administrar el estado del Menu
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class MenuState {

  /** Se utiliza para mostrar/ocultar el menu **/
  public isMenuOpen = false;

  /** Indica si el toogle del menu se visualiza por primera vez **/
  public isToogleMenuFirstTime = true;

  /** Indica si el menu se visualiza por primera vez **/
  public isMenuShowFirstTime = true;

  /** Son los modulos a visualizar en el menu **/
  public modulos: Array<MenuItem>;

  /**
   * @param screenState, se utiliza para la visualizacion del menu
   */
  constructor(public screenState: ScreenState,
    private router: Router
    ) {
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
        this.moduloSeleccionado(val.url);
        }
    });
    this.construirMenu();
  }

  private moduloSeleccionado(url: string): void {
    console.log(url);
    let moduloSle: MenuItem;
    for (const modulo  of this.modulos) {

      if (modulo.isPaginaInicio) {
        if (modulo.router === url) {
          modulo.isSeleccionado = true;
        } else {
          modulo.isSeleccionado = false;
        }
      } else {
        for (const item of modulo.items) {
          if (item.router === url) {
            item.isSeleccionado = true;
            modulo.isSeleccionado = true;
            moduloSle = modulo;
          } else {
            item.isSeleccionado = false;
            if (moduloSle !== modulo) {
              modulo.isSeleccionado = false;
            }
          }
        }
      }
    }
  }

  /**
   * Metodo que soporta el evento click del boton
   * toogle del menu que se visualiza en el header
   */
  public toggleMenu(): void {
    if (this.isToogleMenuFirstTime && this.screenState.isBigScreen()) {
      this.isMenuOpen = true;
    }
    this.isMenuOpen = !this.isMenuOpen;
    this.isToogleMenuFirstTime = false;
  }

  public toogleMenuItem(modulo: MenuItem) {
    this.isMenuShowFirstTime = false;
    modulo.isOpen = !modulo.isOpen;
    for (const modulo2  of this.modulos) {
      if (modulo2 !== modulo) {
        modulo2.isOpen = false;
      }
    }
  }

  /**
   * Metodo que permite construir los modulos con sus items
   * para ser visualizados en el menu de la aplicacion
   */
  private construirMenu() {
    this.modulos = new Array<MenuItem>();

    // se agrega la pagina de inicio
    this.modulos.push(this.getItemPaginaInicio());

    // se agregan los modulos en la lista a visualizar
    this.modulos.push(this.getModuloCorrespondencia());
    this.modulos.push(this.getModuloArchivoGestion());
    this.modulos.push(this.getModuloReportes());
    this.modulos.push(this.getModuloConfiguraciones());
  }

  private getItemPaginaInicio(): MenuItem {
    const inicio = new MenuItem();
    inicio.nombre = 'Página de Inicio';
    inicio.icono = 'fa fa-fw fa-dashboard';
    inicio.router = '/autenticado/bienvenida';
    inicio.isPaginaInicio = true;
    return inicio;
  }

  /**
   * Metodo que permite construir el modulo del CORRESPONDENCIA
   */
  private getModuloCorrespondencia(): MenuItem {
    // se crea el Modulo de correspondencia
    const correspondencia = new MenuItem();
    correspondencia.nombre = 'Correspondencia';
    correspondencia.icono = 'fa fa-fw fa-envelope';
    correspondencia.moduloToken = ModulosConstant.TK_CORRESPONDENCIA;

    // ITEM1, Solicitar consecutivo de correspondencia
    const solicitarConsecutivo = new MenuItem();
    solicitarConsecutivo.nombre = 'Solicitar Consecutivo';
    solicitarConsecutivo.router = '/autenticado/correspondencia/solicitar';

    // ITEM2, prueba
    const prueba  = new MenuItem();
    prueba.nombre = 'Prueba';
    prueba.router = '/autenticado/correspondencia/prueba';
    prueba.isUltimoItem = true;

    // se agrega los items para este modulo
    correspondencia.agregarItem(solicitarConsecutivo);
    correspondencia.agregarItem(prueba);
    return correspondencia;
  }

  /**
   * Metodo que permite construir el modulo de ARCHIVO GESTION
   */
  private getModuloArchivoGestion(): MenuItem {
    // se crea el Modulo de Archivo de Gestion
    const archivoGestion = new MenuItem();
    archivoGestion.nombre = 'Archivo de Gestión';
    archivoGestion.icono = 'fa fa-fw fa-folder-open';
    archivoGestion.moduloToken = ModulosConstant.TK_ARCHIVO_GESTION;

    // ITEM1, Admin Series documentales
    const series = new MenuItem();
    series.nombre = 'Series Documentales';
    series.router = '/autenticado/archivogestion/series';

    // ITEM2, prueba
    const prueba  = new MenuItem();
    prueba.nombre = 'Prueba Archivo';
    prueba.router = '/autenticado/archivogestion/prueba';
    prueba.isUltimoItem = true;

    // se agrega los items para este modulo
    archivoGestion.agregarItem(series);
    archivoGestion.agregarItem(prueba);
    return archivoGestion;
  }

  /**
   * Metodo que permite construir el modulo de REPORTES
   */
  private getModuloReportes(): MenuItem {
    // se crea el Modulo de REPORTES
    const reportes = new MenuItem();
    reportes.nombre = 'Reportes';
    reportes.icono = 'fa fa-fw fa-bar-chart';
    reportes.moduloToken = ModulosConstant.TK_REPORTES;

    // ITEM1, Generar reportes
    const generar = new MenuItem();
    generar.nombre = 'Generar Reportes';
    generar.router = '/autenticado/reportes/generar';

    // ITEM2, prueba
    const prueba  = new MenuItem();
    prueba.nombre = 'Prueba Reportes';
    prueba.router = '/autenticado/reportes/prueba';
    prueba.isUltimoItem = true;

    // se agrega los items para este modulo
    reportes.agregarItem(generar);
    reportes.agregarItem(prueba);
    return reportes;
  }

  /**
   * Metodo que permite construir el modulo de CONFIGURACIONES
   */
  private getModuloConfiguraciones(): MenuItem {
    // se crea el Modulo de CONFIGURACIONES
    const configuraciones = new MenuItem();
    configuraciones.nombre = 'Configuraciones';
    configuraciones.icono = 'fa fa-fw fa-wrench';
    configuraciones.moduloToken = ModulosConstant.TK_CONFIGURACIONES;

    // ITEM1, Administrar Usuarios
    const adminUsers = new MenuItem();
    adminUsers.nombre = 'Administrar Usuarios';
    adminUsers.router = '/autenticado/configuraciones/users';

    // ITEM2, prueba
    const prueba  = new MenuItem();
    prueba.nombre = 'Prueba Conf';
    prueba.router = '/autenticado/configuraciones/prueba';
    prueba.isUltimoItem = true;

    // se agrega los items para este modulo
    configuraciones.agregarItem(adminUsers);
    configuraciones.agregarItem(prueba);
    return configuraciones;
  }
}
