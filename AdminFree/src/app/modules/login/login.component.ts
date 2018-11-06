import { Component, OnInit } from '@angular/core';
import { CommonComponent } from './../../util-class/common.component';
import { SeguridadService } from './../../services/seguridad.service';
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

  /** Contiene el mensaje de error presentada en la autenticacion */
  public msjError: string;

  /**
   * Constructor del login de la aplicacion
   *
   * @param segService, contiene los servicios de seguridad
   */
  constructor(private segService: SeguridadService) {
    super();
  }

  /**
   * Aca se debe inicializar las variables globales del LOGIN
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Metodo que soporta el evento click del check
   * ingresar como administrador
   */
  public toogleAdmin(): void {
    this.credenciales.administrador = !this.credenciales.administrador;
  }

  /**
   * Metodo que soporta el evento click del boton iniciar sesion
   */
  public iniciarSesion(): void {
    this.msjError = null;
    if (
      this.credenciales &&
      this.credenciales.clave &&
      this.credenciales.usuario
    ) {
      this.segService.iniciarSesion(this.credenciales).subscribe(
        data => {},
        error => {
          this.msjError = this.showMensajeError(error);
          this.credenciales.clave = null;
          this.cleanSubmit();
        }
      );
    }
  }

  /**
   * Metodo que permite inicializar las variables globales
   */
  private init(): void {
    this.credenciales = new CredencialesDTO();
    this.credenciales.administrador = false;
  }
}
