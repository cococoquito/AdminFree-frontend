import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from './../../../util-class/common.component';
import { SeguridadService } from './../../../services/seguridad.service';
import { LocalStoreState } from './../../../states/local-store.state';
import { CredencialesDTO } from './../../../dtos/seguridad/credenciales.dto';
import { TipoEventoConstant } from './../../../constants/tipo-evento.constant';

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
   * @param localStoreState, se utiliza para almacenar los datos
   * del user o admin autenticado en el sistema
   * @param router, Router para la navegacion a la pagina bienvenida
   */
  constructor(
    private segService: SeguridadService,
    private localStoreState: LocalStoreState,
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
  public iniciarSesion(): void {

    // se valida la nulalidad de las credenciales
    if (this.credenciales &&
        this.credenciales.clave &&
        this.credenciales.usuario) {

      // se procede a iniciar sesion en el sistema
      this.segService.iniciarSesion(this.credenciales).subscribe(
        data => {
          // se configura las credenciales del USER o ADMIN
          this.localStoreState.credenciales(TipoEventoConstant.SET, data.credenciales);

          // se configura los datos del USER o ADMIN
          if (this.credenciales.administrador) {
            this.localStoreState.adminAuth(TipoEventoConstant.SET, data.administrador);
          } else {
            this.localStoreState.userAuth(TipoEventoConstant.SET, data.usuario);
          }

          // se redirecciona a la pantalla de bienvenida
          this.router.navigate(['/autenticado']);
        },
        error => {
          this.msjError = this.showMensajeError(error);
          this.credenciales.clave = null;
          this.cleanSubmit();
        }
      );
    }
  }

  /**
   * Metodo que es ejecutado antes de invocar el metodo iniciar sesion
   */
  public beforeIniciarSesion(): boolean {
    this.onSubmit();
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
