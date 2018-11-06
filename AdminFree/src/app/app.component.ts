import { Component } from '@angular/core';

/**
 * Componente de inicio de la aplicacion AdminFree
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-root',
  template: '<admin-spinner></admin-spinner> <router-outlet></router-outlet>'
})
export class AppComponent {}
