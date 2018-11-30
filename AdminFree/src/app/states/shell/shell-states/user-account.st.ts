import { LocalStoreUtil } from './../../../util/local-store.util';
import { CredencialesDTO } from './../../../dtos/seguridad/credenciales.dto';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';
import { WelcomeDTO } from './../../../dtos/seguridad/welcome.dto';
import { TipoEventoConstant } from './../../../constants/tipo-evento.constant';

/**
 * Estado para administrar la cuenta del usuario
 *
 * @author Carlos Andres Diaz
 */
export class UserAccountST {

  /** Es el USUARIO autenticado en el sistema cuando aplica */
  public usuario: UsuarioDTO;

  /** Es el ADMIN autenticado en el sistema cuando aplica */
  public administrador: ClienteDTO;

  /** Son las credenciales del USUARIO o ADMIN autenticado */
  public credenciales: CredencialesDTO;

  /**
   * Cuando se carga la pagina se crea la instancia del
   * estado de la cuenta del user, se debe tomar los datos
   * del local-store, dado que en este punto son nulos
   */
  constructor() {
    this.init();
  }

  /**
   * Metodo que es invocado del constructor de este State
   */
  private init(): void {
    const welcomeDTO: WelcomeDTO = LocalStoreUtil.welcome(TipoEventoConstant.GET);
    if (welcomeDTO) {
      this.configurarCuentaUser(welcomeDTO);
    }
  }

  /**
   * Metodo que permite cambiar el estado a autenticado
   *
   * @param welcomeDTO, contiene los datos de la autenticacion
   */
  public changeStateAutenticado(welcomeDTO: WelcomeDTO): void {
    // Se configura los datos de la autenticacion en el local-store
    LocalStoreUtil.welcome(TipoEventoConstant.SET, welcomeDTO);

    // se configura los datos del usuario
    this.configurarCuentaUser(welcomeDTO);
  }

  /**
   * Metodo que permite cambiar el estado a sesion cerrada
   */
  public changeStateSesionCerrada(): void {
    // Se limpia todo los registros del local-store
    LocalStoreUtil.cleanAll();

    // Se limpia las variables globales para notificar los demas componentes
    this.configurarCuentaUser(null);
  }

  /**
   * Permite configurar los datos de la cuenta del usuario
   * @param welcomeDTO, Contiene los datos de la cuenta del user
   */
  private configurarCuentaUser(welcomeDTO: WelcomeDTO): void {
    this.usuario = null;
    this.administrador = null;
    this.credenciales = null;
    if (welcomeDTO) {
      this.usuario = welcomeDTO.usuario;
      this.administrador = welcomeDTO.administrador;
      this.credenciales = welcomeDTO.credenciales;
    }
  }
}
