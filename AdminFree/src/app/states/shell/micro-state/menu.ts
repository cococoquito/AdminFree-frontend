import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Screen } from './screen';
import { LocalStoreUtil } from './../../../util/local-store.util';
import { MenuItem } from './../../../model/menu-item';
import { WelcomeDTO } from '../../../dtos/seguridad/welcome.dto';
import { ModuloDTO } from './../../../dtos/seguridad/modulo.dto';
import { ModulosConstant } from '../../../constants/modulos.constant';
import { RouterConstant } from '../../../constants/router.constant';
import { TipoEventoConstant } from './../../../constants/tipo-evento.constant';

/**
 * Se utiliza para administrar el estado del Menu
 *
 * @author Carlos Andres Diaz
 */
export class Menu {

  /** Se utiliza para mostrar/ocultar el menu **/
  public isMenuOpen = false;

  /** Indica si el toogle del menu se visualiza por primera vez **/
  public isToogleMenuFirstTime = true;

  /** Indica si el menu se visualiza por primera vez **/
  public isMenuShowFirstTime = true;

  /** Son los modulos a visualizar en el menu **/
  public modulos: Array<MenuItem>;

  /** Contiene la subscripcion del router **/
  private subscriptionRouter: Subscription;

  /**
   * @param screen, se utiliza para validar el tamanio de la pantalla
   * @param router, se utiliza para ser notificado cuando el router cambia
   */
  constructor(
    public screen: Screen,
    private router: Router) {
    this.init();
  }

  /**
   * Metodo que es invocado del constructor de este State
   */
  private init(): void {
    // se obtiene los datos de la autenticacion del local-store
    const welcomeDTO: WelcomeDTO = LocalStoreUtil.welcome(TipoEventoConstant.GET);

    // se valida que el user si este autenticado
    if (welcomeDTO && welcomeDTO.credenciales) {

      // se obtiene el menu del localstore
      const menu: Menu = LocalStoreUtil.menu(TipoEventoConstant.GET);
      if (menu) {

        // se configurar los atributos del localstore
        this.isMenuOpen = menu.isMenuOpen;
        this.isToogleMenuFirstTime = menu.isToogleMenuFirstTime;
        this.isMenuShowFirstTime = menu.isMenuShowFirstTime;
        this.modulos = menu.modulos;
        this.subscriptionRouter = menu.subscriptionRouter;
      } else {

        // si no hay menu en el local se procede a crearlo de
        // acuerdo a los privilegios del usuario autenticado
        this.initMenu(welcomeDTO);
      }
    }
  }

  /**
   * Metodo que permite inicializar el Menu, construyendo
   * sus items dependiendo de los privilegios del usuario
   *
   * @param welcomeDTO, datos de la autenticacion
   */
  public initMenu(welcomeDTO: WelcomeDTO): void {
    // se construye los modulos con sus items dependiendo de los privilegios del usuario
    this.construirMenu(welcomeDTO);

    // se obtiene la suscripcion del router para ser notificado
    this.getSuscribeRouter();

    // se configura los datos del menu en el localstore
    this.setMenuOnLocalStore();
  }

  /**
   * Metodo que permite destruir el menu liberando memoria
   */
  public destroyMenu(): void {
    this.isMenuOpen = false;
    this.isToogleMenuFirstTime = true;
    this.isMenuShowFirstTime = true;
    this.modulos = null;
    if (this.subscriptionRouter) {
      this.subscriptionRouter.unsubscribe();
    }
  }

  /**
   * Metodo que soporta el evento click del boton
   * toogle del menu que se visualiza en el header
   */
  public toggleMenu(): void {
    if (this.isToogleMenuFirstTime && this.screen.isBigScreen()) {
      this.isMenuOpen = true;
    }
    this.isMenuOpen = !this.isMenuOpen;
    this.isToogleMenuFirstTime = false;

    // se actualiza los datos del menu en el localstore
    this.setMenuOnLocalStore();
  }

  /**
   * Metodo que soporta el evento click del Modulo
   * en el menu, donde se visualiza o esconde sus items
   *
   * @param modulo, es el modulo seleccionado para
   * abrir/ocultar sus items
   */
  public toggleMenuModulo(modulo: MenuItem): void {
    // Se cambia la bandera a Menu visualizado y cargado
    this.isMenuShowFirstTime = false;

    // se cambie el estado de la variable 'isOPen' de este modulo
    modulo.isOpen = !modulo.isOpen;

    // se recorre los demas modulos para cerrar sus items
    for (const otherModulo of this.modulos) {
      // no aplica para el modulo que llega por parametro ni para p-inicio
      if (otherModulo !== modulo && !otherModulo.isPaginaInicio) {
        otherModulo.isOpen = false;
      }
    }

    // se actualiza los datos del menu en el localstore
    this.setMenuOnLocalStore();
  }

  /**
   * Metodo que permite configurar el Menu en el localstore
   */
  private setMenuOnLocalStore() {
    LocalStoreUtil.menu(TipoEventoConstant.SET, this);
  }

  /**
   * Se hace la suscripcion con el router para ser notificado
   * cada vez que el router cambie su navegacion
   */
  private getSuscribeRouter(): void {
    this.subscriptionRouter = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.notificarItemSeleccionado(val.url);
      }
    });
  }

  /**
   * Metodo que permite configurar el modulo/item seleccionado
   * por el usuario a navegar, esto aplica en el menu o cualquier
   * cambio que se realice en el router
   *
   * @param url, es la nueva url donde el usuario va navegar
   */
  private notificarItemSeleccionado(url: string): void {
    // programacion defensiva para los modulos
    if (this.modulos) {
      let moduloFueSeleccionado: MenuItem;

      // se recorre todos los modulos para validar el router de sus items
      for (const modulo of this.modulos) {

        // el modulo de la pagina inicio no tiene items pero si router
        if (modulo.isPaginaInicio) {
            modulo.isSeleccionado = modulo.router === url;
        } else {

          // se recorre los items de este modulo validando su router
          for (const item of modulo.items) {
            if (item.router === url) {
                item.isSeleccionado = true;
                modulo.isSeleccionado = true;
                moduloFueSeleccionado = modulo;
            } else {
              item.isSeleccionado = false;
              if (modulo !== moduloFueSeleccionado) {
                  modulo.isSeleccionado = false;
              }
            }
          }
        }
      }
      // se actualiza los datos del menu en el localstore
      this.setMenuOnLocalStore();
    }
  }

  /**
   * Metodo que permite construir los modulos con sus items
   * para ser visualizados en el menu de la aplicacion
   *
   * @param welcomeDTO, datos de la autenticacion
   */
  private construirMenu(welcomeDTO: WelcomeDTO): void {
    this.modulos = new Array<MenuItem>();

    // se agrega la pagina de inicio
    this.modulos.push(this.getItemPaginaInicio());

    // se verifica si el usuario esta autenticado
    if (welcomeDTO && welcomeDTO.credenciales) {

      // el administrador tiene todo los privilegios
      if (welcomeDTO.credenciales.administrador) {
          this.modulos.push(this.getModuloCorrespondencia());
          this.modulos.push(this.getModuloArchivoGestion());
          this.modulos.push(this.getModuloReportes());
          this.modulos.push(this.getModuloConfiguraciones());
      } else {

        // se verifica si el funcionario tiene privilegios asignados
        const privilegios: Array<ModuloDTO> = welcomeDTO.usuario.modulos;
        if (privilegios) {

          // se recorre todos los privilegios asignados al usuario
          for (const privilegio of privilegios) {

            // se configura los modulos del negocio dependiendo de los privilegios
            switch (privilegio.tokenModulo) {

              case ModulosConstant.TK_CORRESPONDENCIA: {
                this.modulos.push(this.getModuloCorrespondencia());
                break;
              }
              case ModulosConstant.TK_ARCHIVO_GESTION: {
                this.modulos.push(this.getModuloArchivoGestion());
                break;
              }
              case ModulosConstant.TK_REPORTES: {
                this.modulos.push(this.getModuloReportes());
                break;
              }
              case ModulosConstant.TK_CONFIGURACIONES: {
                this.modulos.push(this.getModuloConfiguraciones());
                break;
              }
            }
          }
        }
      }
    }
  }

  /**
   * Metodo que permite construir el Item-Menu de la pagina de inicio
   */
  private getItemPaginaInicio(): MenuItem {
    const inicio = new MenuItem();
    inicio.nombre = 'Página de Inicio';
    inicio.icono = 'fa fa-fw fa-dashboard';
    inicio.router = RouterConstant.NAVIGATE_BIENVENIDA;
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

    // ITEM1, Solicitar consecutivo de correspondencia
    const solicitarConsecutivo = new MenuItem();
    solicitarConsecutivo.nombre = 'Solicitar Consecutivo';
    solicitarConsecutivo.router = '/autenticado/correspondencia/solicitar';

    // ITEM2, prueba
    const prueba = new MenuItem();
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

    // ITEM1, Admin Series documentales
    const series = new MenuItem();
    series.nombre = 'Series Documentales';
    series.router = '/autenticado/archivogestion/series';

    // ITEM2, prueba
    const prueba = new MenuItem();
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

    // ITEM1, Generar reportes
    const generar = new MenuItem();
    generar.nombre = 'Generar Reportes';
    generar.router = '/autenticado/reportes/generar';

    // ITEM2, prueba
    const prueba = new MenuItem();
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

    // ITEM1, Administrar Usuarios
    const adminUsers = new MenuItem();
    adminUsers.nombre = 'Administrar Usuarios';
    adminUsers.router = '/autenticado/configuraciones/users';

    // ITEM2, prueba
    const prueba = new MenuItem();
    prueba.nombre = 'Prueba Conf';
    prueba.router = '/autenticado/configuraciones/prueba';
    prueba.isUltimoItem = true;

    // se agrega los items para este modulo
    configuraciones.agregarItem(adminUsers);
    configuraciones.agregarItem(prueba);
    return configuraciones;
  }
}
