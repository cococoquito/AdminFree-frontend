import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ScreenST } from './screen.st';
import { BreadCrumbST } from './breadcrumb.st';
import { LocalStoreUtil } from './../../../util/local-store.util';
import { MenuItem } from 'primeng/api';
import { WelcomeDTO } from '../../../dtos/seguridad/welcome.dto';
import { ModulesTokenConstant } from '../../../constants/modules-token.constant';
import { RouterConstant } from '../../../constants/router.constant';
import { TipoEventoConstant } from './../../../constants/tipo-evento.constant';
import { LabelsConstant } from './../../../constants/labels.constant';

/**
 * Se utiliza para administrar el estado del Menu
 *
 * @author Carlos Andres Diaz
 */
export class MenuST {

  /** Se utiliza para mostrar/ocultar el menu **/
  public isMenuOpen = false;

  /** Indica si el toogle del menu se visualiza por primera vez **/
  public isToogleMenuFirstTime = true;

  /** Son los modulos a visualizar en el menu **/
  public modulos: Array<MenuItem>;

  /** Contiene la subscripcion del router **/
  private subscriptionRouter: Subscription;

  /**
   * Cuando se carga la pagina se crea la instancia del estado del menu,
   * se debe tomar los datos del local-store, ya que en este punto son nulos
   *
   * @param screen, se utiliza para validar el tamanio de la pantalla
   * @param bread, se utliza para configurar los datos de la miga de pan
   * @param router, se utiliza para ser notificado cuando el router cambia
   */
  constructor(
    public screen: ScreenST,
    private bread: BreadCrumbST,
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

      // se obtiene los items del menu del localstore
      const items: Array<MenuItem> = LocalStoreUtil.menu(TipoEventoConstant.GET);
      if (items && items.length > 0) {

        // se configura los items
        this.modulos = items;

        // se obtiene la suscripcion del router para ser notificado
        this.getSuscribeRouter();
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

    // se configura los items del menu en el localstore
    LocalStoreUtil.menu(TipoEventoConstant.SET, this.modulos);
  }

  /**
   * Metodo que permite destruir el Menu liberando memoria
   */
  public destroyMenu(): void {
    this.isMenuOpen = false;
    this.isToogleMenuFirstTime = true;
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
   * Metodo que permite notificar el cambio de navegacion
   * al componente miga de pan, para asi pintar la ubicacion
   *
   * @param url, es la nueva url donde el usuario va navegar
   */
  private notificarItemSeleccionado(url: string): void {

    // miga de pan para administracion de cuenta de usuario
    if (url.includes(RouterConstant.ROUTER_CUENTA_USER)) {
      this.bread.url = '/' + LabelsConstant.MENU_CUENTA_USER;
      this.bread.icono = 'fa-gear';
    }

    // programacion defensiva para los modulos
    if (this.modulos) {

      // se recorre todos los modulos para validar el router de sus items
      for (const modulo of this.modulos) {

        // el modulo de la pagina inicio no tiene items pero si router
        if (!modulo.items) {
          if (modulo.routerLink[0] === url) {
            this.bread.url = '/' + modulo.label;
            this.bread.icono = modulo.id;
          }
        } else {
          modulo.expanded = false;

          // se recorre los items de este modulo validando su router
          for (const item of modulo.items) {
            const submodulo = item as MenuItem;
            if (submodulo.routerLink[0] === url) {
              this.bread.url = '/' + modulo.label + '/' + submodulo.label;
              this.bread.icono = modulo.id;
              modulo.expanded = true;
              break;
            }
          }
        }
      }
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
        const privilegios: Array<string> = welcomeDTO.usuario.modulosTokens;
        if (privilegios) {

          // se recorre todos los privilegios asignados al usuario
          for (const privilegio of privilegios) {

            // se configura los modulos del negocio dependiendo de los privilegios
            switch (privilegio) {

              case ModulesTokenConstant.TK_CORRESPONDENCIA: {
                this.modulos.push(this.getModuloCorrespondencia());
                break;
              }
              case ModulesTokenConstant.TK_ARCHIVO_GESTION: {
                this.modulos.push(this.getModuloArchivoGestion());
                break;
              }
              case ModulesTokenConstant.TK_REPORTES: {
                this.modulos.push(this.getModuloReportes());
                break;
              }
              case ModulesTokenConstant.TK_CONFIGURACIONES: {
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
    return {
      id: 'fa-dashboard',
      label: LabelsConstant.MENU_PAGINA_INICIO,
      icon: 'fa fa-fw fa-dashboard font-size-20',
      routerLink: [RouterConstant.NAVIGATE_BIENVENIDA]
    };
  }

  /**
   * Metodo que permite construir el modulo del CORRESPONDENCIA
   */
  private getModuloCorrespondencia(): MenuItem {
    return {
      id: 'fa-envelope',
      label: LabelsConstant.MODULO_CORRESPONDENCIA,
      icon: 'fa fa-fw fa-envelope pl-1 mr-2',
      items: [
        {
          id: 'fa-envelope-open',
          label: LabelsConstant.MENU_SOLICITAR_CONSECUTIVOS,
          icon: 'fa fa-fw fa-envelope-open',
          routerLink: [RouterConstant.NAVIGATE_SOLICITAR_CONSECUTIVOS],
        }
      ]
    };
  }

  /**
   * Metodo que permite construir el modulo de ARCHIVO GESTION
   */
  private getModuloArchivoGestion(): MenuItem {
    return {
      id: 'fa-folder-open',
      label: LabelsConstant.MODULO_ARCHIVO_GESTION,
      icon: 'fa fa-fw fa-folder-open pl-1 mr-2',
      items: [
        {
          label: 'Series Documentales',
          icon: '',
          routerLink: ['/autenticado/archivogestion/series'],
        },
        {
          label: 'Prueba Archivo',
          icon: '',
          routerLink: ['/autenticado/archivogestion/prueba'],
        }
      ]
    };
  }

  /**
   * Metodo que permite construir el modulo de REPORTES
   */
  private getModuloReportes(): MenuItem {
    return {
      id: 'fa-bar-chart',
      label: LabelsConstant.MODULO_REPORTES,
      icon: 'fa fa-fw fa-bar-chart pl-1 mr-2',
      items: [
        {
          label: 'Generar Reportes',
          icon: '',
          routerLink: ['/autenticado/reportes/generar'],
        },
        {
          label: 'Prueba Reportes',
          icon: '',
          routerLink: ['/autenticado/reportes/prueba'],
        }
      ]
    };
  }

  /**
   * Metodo que permite construir el modulo de CONFIGURACIONES
   */
  private getModuloConfiguraciones(): MenuItem {
    return {
      id: 'fa-cog',
      label: LabelsConstant.MODULO_CONFIGURACIONES,
      icon: 'fa fa-fw fa-cog font-size-20',
      items: [
        {
          id: 'fa-user-plus',
          label: LabelsConstant.MENU_ADMIN_USERS,
          icon: 'fa fa-fw fa-user-plus',
          routerLink: [RouterConstant.NAVIGATE_ADMIN_USERS]
        },
        {
          id: 'fa-list-alt',
          label: LabelsConstant.MENU_ADMIN_CAMPOS,
          icon: 'fa fa-fw fa-list-alt',
          routerLink: [RouterConstant.NAVIGATE_ADMIN_CAMPOS]
        },
        {
          id: 'fa-ils',
          label: LabelsConstant.MENU_ADMIN_NOMENCLATURAS,
          icon: 'fa fa-fw fa-ils',
          routerLink: [RouterConstant.NAVIGATE_ADMIN_NOMENCLATURAS]
        }
      ]
    };
  }
}
