import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Screen } from './micro-state/screen';
import { Menu } from './micro-state/menu';
import { UserAccount } from './micro-state/user-account';

/**
 * Se utiliza para administrar el estado del Shell de la aplicacion
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class ShellState implements OnDestroy {

  /** Administra el estado de la pantalla del dispositivo */
  public screen: Screen;

  /** Administra el estado del menu de la aplicacion */
  public menu: Menu;

  /** Administra el estado de la cuenta de usuario */
  public userAccount: UserAccount;

  /**
   * Constructor donde se crea todo el modelo del estado del Shell
   * @param router, se utiliza para ser notificado cuando el router cambia
   */
  constructor(private router: Router) {
    // Estado para notificar el tamanio de la pantalla
    this.screen = new Screen();

    // Se utiliza para administrar el estado del Menu
    this.menu = new Menu(this.screen, this.router);

    // Estado para administrar la cuenta del usuario
    this.userAccount = new UserAccount(this.menu);
  }

  /**
   * Se utiliza para liberar recursos
   */
  ngOnDestroy(): void {
    this.menu.destroyMenu();
  }
}
