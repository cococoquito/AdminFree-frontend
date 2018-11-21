import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShellState } from './../../../../states/shell/shell.state';
import { MenuItem } from 'primeng/api';
import { RouterConstant } from './../../../../constants/router.constant';

/**
 * Es el menu de configuraciones del usuario donde se
 * visualiza en el header de la aplicacion
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  /** Son los items a mostrar en el menu de user-settings */
  public items: MenuItem[];

  /**
   * @param shellState , se utiliza para validar el tamanio de la pantalla y
   * para mostrar el nombre del user autenticado
   * @param router , router para la navegacion
   */
  constructor(
    public shellState: ShellState,
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
      { label: 'Página de Inicio', icon: 'fa fa-fw fa-dashboard', command: (click) => this.goToBienvenida() },
      { label: RouterConstant.TITLE_CUENTA_USER, icon: 'fa fa-fw fa-gear', command: (click) => this.goToConfiguracionCuenta() },
      { label: 'Cerrar Sesión', icon: 'fa fa-fw fa-power-off', command: (click) => this.cerrarSesion() }
    ];
  }

  /**
   * Metodo que soporta el evento cerrar sesion del menu
   */
  public cerrarSesion(): void {
    // se cambia el estado de la cuenta a sesion cerrada
    this.shellState.userAccount.changeStateSesionCerrada();

    // se destruye el menu para limpiar memoria
    this.shellState.menu.destroyMenu();

    // se redirecciona al LOGIN
    this.router.navigate([RouterConstant.NAVIGATE_LOGIN]);
  }

  /**
   * Metodo que soporta el evento click del menu Pagina de inicio
   */
  public goToBienvenida(): void {
    this.router.navigate([RouterConstant.NAVIGATE_BIENVENIDA]);
  }

  /**
   * Metodo que soporta el evento click del menu Configuración de Cuenta
   */
  public goToConfiguracionCuenta(): void {
    this.router.navigate([RouterConstant.NAVIGATE_CUENTA_USER]);
  }
}
