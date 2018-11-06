import { TipoEventoConstant } from './../../constants/tipo-evento.constant';
import { LocalStoreState } from './../../states/local-store.state';
import { Component, OnInit } from '@angular/core';
import { CommonComponent } from './../../util-class/common.component';
import { SeguridadService } from './../../services/seguridad.service';
import { CredencialesDTO } from './../../dtos/seguridad/credenciales.dto';
import { UsuarioDTO } from './../../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../../dtos/configuraciones/cliente.dto';

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
   */
  constructor(
    private segService: SeguridadService,
    private localStoreState: LocalStoreState) {
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
          // se configura el usuario o el admin dependiendo del tipo autenticacion
          if (data instanceof UsuarioDTO) {
              this.localStoreState.credenciales(TipoEventoConstant.SET, data.credenciales);
              data.credenciales = null;
              this.localStoreState.userAuth(TipoEventoConstant.SET, data);
          } else if (data instanceof ClienteDTO) {
            this.localStoreState.credenciales(TipoEventoConstant.SET, data.credenciales);
            data.credenciales = null;
            this.localStoreState.adminAuth(TipoEventoConstant.SET, data);
          }
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
