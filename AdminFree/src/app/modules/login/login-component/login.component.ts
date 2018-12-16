import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from './../../../util/common.component';
import { ShellState } from './../../../states/shell/shell.state';
import { AutenticacionService } from './../../../services/autenticacion.service';
import { CredencialesDTO } from './../../../dtos/seguridad/credenciales.dto';
import { RouterConstant } from './../../../constants/router.constant';

/**
 * Componente para la autenticacion del sistema ADMINFREE
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AutenticacionService]
})
export class LoginComponent extends CommonComponent implements OnInit {

  /** Se utiliza para capturar las credenciales del usuario o admin */
  public credenciales: CredencialesDTO;

  /** Contiene el mensaje de error presentada en la autenticacion */
  public msjError: string;

  /**
   * @param shellState, se utiliza para notificar el inicio de sesion
   * @param autenticacionService, contiene los servicios para la autenticacion
   * @param router, Router para la navegacion a la pagina bienvenida
   */
  constructor(
    private shellState: ShellState,
    private autenticacionService: AutenticacionService,
    private router: Router) {
    super();
  }

  /**
   * Aca se debe inicializar las variables globales del LOGIN
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Metodo que soporta el evento click del boton iniciar sesion
   */
  public iniciarSesion(formLogin): void {

    // se valida la nulalidad de las credenciales
    if (this.credenciales &&
        this.credenciales.clave &&
        this.credenciales.usuario) {

      // se procede a iniciar sesion en el sistema
      this.autenticacionService.iniciarSesion(this.credenciales).subscribe(
        data => {
          // se cambia el estado de la cuenta a sesion iniciada
          this.shellState.userAccount.changeStateAutenticado(data);

          // se construye el menu de la aplicacion
          this.shellState.menu.initMenu(data);

          // se redirecciona a la pagina de bienvenida
          this.router.navigate([RouterConstant.NAVIGATE_BIENVENIDA]);
        },
        error => {
          this.msjError = this.showMensajeError(error);
          this.credenciales.clave = null;
          formLogin.submitted = false;
        }
      );
    }
  }

  /**
   * Metodo que es ejecutado antes de invocar el metodo iniciar sesion
   */
  public beforeIniciarSesion(): boolean {
    this.msjError = null;
    return true;
  }

  /**
   * Metodo que soporta el evento click del check
   * ingresar como administrador
   */
  public toogleAdmin(): void {
    this.credenciales.administrador = !this.credenciales.administrador;
  }

  /**
   * Metodo que permite inicializar las variables globales
   */
  private init(): void {
    this.credenciales = new CredencialesDTO();
    this.credenciales.administrador = false;
  }
}
