import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShellState } from '../../../../states/shell.state';
import { LocalStoreState } from './../../../../states/local-store.state';
import { MenuItem } from 'primeng/api';

/**
 * Es el menu de configuraciones del usuario donde se
 * visualiza en el header de la aplicacion
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  /** Son los items a mostrar en el menu de user-settings */
  public items: MenuItem[];

  /**
   * Constructor del componente
   *
   * @param estado , estado del shell de la app
   * @param localStoreState , estado del local-store
   * @param router , router para la navegacion
   */
  constructor(
    public estado: ShellState,
    private localStoreState: LocalStoreState,
    private router: Router) {}

  ngOnInit() {
    // se construye los items del menu
    this.construirItems();
  }

  /**
   * Metodo que permite construir los items del menu
   * de configuraciones para el usuario
   */
  private construirItems(): void {
    this.items = [
      { label: 'Página de Inicio', icon: 'fa fa-fw fa-home' },
      { label: 'Cambiar Contraseña', icon: 'fa fa-fw fa-gear'},
      { label: 'Cerrar Sesión', icon: 'fa fa-fw fa-power-off', command: (click) => this.cerrarSesion() }
    ];
  }

  /**
   * Metodo que soporta el evento cerrar sesion del menu
   */
  public cerrarSesion(): void {
    // se limpia todo los datos almacenados del localstore
    this.localStoreState.cleanAll();

    // se redirecciona al LOGIN
    this.router.navigate(['/login']);
  }
}
