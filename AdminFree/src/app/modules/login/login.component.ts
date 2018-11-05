import { Component, OnInit } from '@angular/core';
import { CommonComponent } from './../../util-class/common.component';
import { CredencialesDTO } from './../../dtos/seguridad/credenciales.dto';

/**
 * Componente para la autenticacion del sistema ADMINFREE
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends CommonComponent implements OnInit {

  /** Se utiliza para capturar las credenciales del usuario o admin */
  public credenciales: CredencialesDTO;

  constructor() { super(); }

  ngOnInit() {
    this.credenciales = new CredencialesDTO();
    this.credenciales.administrador = false;
  }

  public iniciarSesion(): void {
    alert(this.credenciales.usuario + '  ' + this.credenciales.clave);
    console.log(this.credenciales.usuario);
    console.log(this.credenciales.clave);
  }

  /**
   * Metodo que soporta el evento click del check
   * ingresar como administrador
   */
  public toogleAdmin(): void {
    this.credenciales.administrador = !this.credenciales.administrador;
  }
}
