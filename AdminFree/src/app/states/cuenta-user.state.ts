
import { Injectable } from '@angular/core';
import { LocalStoreService } from './../services/local-store.service';
import { UsuarioDTO } from './../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../dtos/configuraciones/cliente.dto';
import { TipoEventoConstant } from './../constants/tipo-evento.constant';

/**
 * Es el estado en la que se encuentra los datos de la cuenta
 * del usuario autenticado en el sistema
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class CuentaUserState {

  /**
   * Es el usuario autenticado en el sistema,
   * ClienteDTO = admin, UsuarioDTO = es un funcionario
   */
  public usuario: ClienteDTO | UsuarioDTO;

  /**
   * @param localStoreService, se utiliza para obtener los datos
   * de la cuenta del usuario autenticado en el sistema
   */
  constructor(private localStoreService: LocalStoreService) {
    this.getUsuarioAutenticado();
  }

  /**
   * Metodo que permite obtener los datos del usuario autenticado
   * del local-store, cliente = cuando es administrador, usuario = funcionario
   */
  public getUsuarioAutenticado(): void {
    this.usuario = this.localStoreService.userAuth(TipoEventoConstant.GET);
    if (!this.usuario) {
      this.usuario = this.localStoreService.adminAuth(TipoEventoConstant.GET);
    }
  }
}
