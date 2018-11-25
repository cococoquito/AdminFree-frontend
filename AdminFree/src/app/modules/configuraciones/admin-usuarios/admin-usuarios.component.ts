import { Component, OnInit } from '@angular/core';
import { LocalStoreUtil } from './../../../util/local-store.util';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';
import { AdminUsuarioService } from './../../../services/admin-usuario.service';

/**
 * Componente para la administracion de los Usuarios del sistema
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css'],
  providers: [AdminUsuarioService]
})
export class AdminUsuariosComponent implements OnInit {
  public usuarios: Array<UsuarioDTO>;

  private cliente: ClienteDTO;

  constructor(private adminUsuarioService: AdminUsuarioService) {}

  ngOnInit() {
    this.init();
  }

  private init(): void {
    this.cliente = LocalStoreUtil.getCurrentCliente();
    this.adminUsuarioService.getUsuariosCliente(this.cliente).subscribe(
      data => {
        this.usuarios = data;
      },
      error => {}
    );
  }
}
