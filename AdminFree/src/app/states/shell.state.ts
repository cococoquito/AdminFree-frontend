import { Injectable } from '@angular/core';
import { MenuItem } from './../model/common/menu-item';

export let initialMenuItems: Array<MenuItem> = [
  {
      text: 'Dashboard',
      icon: 'glyphicon-dashboard',
      route: '/zaqwsx',
      submenu: null
  },
  {
      text: 'Countries',
      icon: 'glyphicon-flag',
      route: null,
      submenu: [
          {
              text: 'Select',
              icon: 'glyphicon-expand',
              route: null,
              submenu: [
                  {
                      text: 'USA',
                      icon: 'glyphicon-flag',
                      route: '/authenticated/country-detail/USA',
                      submenu: null
                  },
                  {
                      text: 'India',
                      icon: 'glyphicon-flag',
                      route: '/authenticated/country-detail/India',
                      submenu: null
                  },
                  {
                      text: 'Switzerland',
                      icon: 'glyphicon-flag',
                      route: '/authenticated/country-detail/Switzerland',
                      submenu: null
                  }
              ]
          },
          {
              text: 'Top 3',
              icon: 'glyphicon-flag',
              route: '/authenticated/country-list/3',
              submenu: null
          },
          {
              text: 'Top 10',
              icon: 'glyphicon-flag',
              route: '/authenticated/country-list/10',
              submenu: null
          },
          {
              text: 'All',
              icon: 'glyphicon-flag',
              route: '/authenticated/country-list/0',
              submenu: null
          }
      ],
  },
  {
      text: 'Maintenance',
      icon: 'glyphicon-wrench',
      route: null,
      submenu: [
          {
              text: 'Country Maint',
              icon: 'glyphicon-th-list',
              route: '/authenticated/country-maint',
              submenu: null
          },
          {
              text: 'Settings',
              icon: 'glyphicon-cog',
              route: '/authenticated/settings',
              submenu: null
          }
      ]
  }
];


/**
 * Es el estado en la que se encuentra el Shell de la app
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class ShellState {

  /** Son los items del menu **/
  public menuItems: Array<MenuItem>;

  /** Indica si el menu se debe visualizar **/
  public isMenuOpen = false;

  /** Indica si el menu se visualiza por primera vez **/
  public isInicio = true;

  /** Variables para identificar que tamanio tiene el dispositivo **/
  public largeBreakpoint = 1024;
  public screenWidth = 1000;
  public screenHeight = 800;

  /**
   * Constructor del servicio donde se identifica que
   * tipo de resolucion tiene la pantalla
   */
  constructor() {
    try {
      this.menuItems = initialMenuItems;
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      window.addEventListener('resize', event => this.onResize(event));
    } catch (e) {
      // we're going with default screen dimensions
    }
  }

  /**
   * Metodo que permite ocultar o mostrar el Menu
   */
  public toggleMenu(): void {
    if (this.isInicio && this.isGrande()) {
      this.isMenuOpen = true;
    }
    this.isMenuOpen = !this.isMenuOpen;
    this.isInicio = false;
  }

  /**
   * Metodo que identifica si la resolucion de la pantalla es grande
   */
  public isGrande(): boolean {
    return this.screenWidth >= this.largeBreakpoint;
  }

  /**
   * Metodo que es invocado cuando el tamanio
   * de la pantalla cambia
   *
   * @param $event, es la nueva resolucion donde
   * se toma los nuevos valores
   */
  private onResize($event): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
}
