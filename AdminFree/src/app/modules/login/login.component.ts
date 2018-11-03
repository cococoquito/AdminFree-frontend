import { Component, OnInit } from '@angular/core';
import { AutenticacionDTO } from './../../dtos/configuraciones/autenticacion.dto';

/**
 * Componente para la autenticacion del sistema ADMINFREE
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /** Se utiliza para capturar las credenciales del usuario o admin */
  public credenciales: AutenticacionDTO;

  constructor() { }

  ngOnInit() {
    this.credenciales = new AutenticacionDTO();
    this.credenciales.administrador = false;
  }

  public iniciarSesion(): void {
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
