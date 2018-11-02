import { Component } from '@angular/core';

/**
 * Es el body del shell de la aplicacion, contiene toda la estructura tales como
 * header, content, footer, el modulo shell exporta unicamente este componente
 * para que los demas componentes lo pueda incluir en sus modulos
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {}
