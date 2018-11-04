import { Component, OnInit } from '@angular/core';
import { AutenticacionDTO } from './../../dtos/seguridad/autenticacion.dto';
import { CommonComponent } from './../../util-class/common.component';

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
  public credenciales: AutenticacionDTO;

  constructor() { super(); }

  ngOnInit() {
    this.credenciales = new AutenticacionDTO();
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
