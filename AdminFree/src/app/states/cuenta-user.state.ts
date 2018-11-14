import { Injectable, OnDestroy } from '@angular/core';
import { LocalStoreService } from './../services/local-store.service';
import { UsuarioDTO } from './../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../dtos/configuraciones/cliente.dto';
import { CredencialesDTO } from './../dtos/seguridad/credenciales.dto';

/**
 * Es el estado en la que se encuentra los datos de la cuenta
 * del usuario autenticado en el sistema
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class CuentaUserState implements OnDestroy {

  /**
   * Es el usuario autenticado en el sistema,
   * ClienteDTO = admin, UsuarioDTO = es un funcionario
   */
  public usuario: ClienteDTO | UsuarioDTO;

  /**
   * Son las credenciales del usuario autenticado
   */
  public credenciales: CredencialesDTO;

  ngOnDestroy(): void {
    console.log('DESTRUIDO');
  }

  /**
   * @param localStoreService, se utiliza para obtener los datos
   * de la cuenta del usuario autenticado en el sistema
   */
  constructor(private localStoreService: LocalStoreService) {
    console.log('CREADO');
    // se obtiene los datos del usuario autenticado
    this.getUsuarioAutenticado();

    // se obtiene las credenciales del usuario autenticado
    this.getCredenciales();
  }

  /**
   * Metodo que permite obtener los datos del usuario autenticado
   * del local-store, cliente = cuando es administrador, usuario = funcionario
   */
  public getUsuarioAutenticado(): void {
    this.usuario = this.localStoreService.getDatosUsuarioAutenticado();
  }

  /**
   * Metodo que permite obtener las credenciales del usuario autenticado del local-store
   */
  public getCredenciales() {
    this.credenciales = this.localStoreService.getCredenciales();
  }
}
