import { CommonComponent } from './../../../util/common.component';
import { Component, OnInit } from '@angular/core';
import { LocalStoreUtil } from './../../../util/local-store.util';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';
import { AdminUsuarioService } from './../../../services/admin-usuario.service';
import { OverlayPanel } from 'primeng/overlaypanel';

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
export class AdminUsuariosComponent extends CommonComponent implements OnInit {
  public usuarios: Array<UsuarioDTO>;
  public selectedCar1;
  public usuarioCrear: UsuarioDTO;

  private cliente: ClienteDTO;

  constructor(private adminUsuarioService: AdminUsuarioService) {
    super();
  }

  ngOnInit() {
    this.init();
  }

  public crearUsuario(): void {
    if (this.usuarioCrear.nombre && this.usuarioCrear.usuarioIngreso) {
      alert('exitoso');
    }
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

  public showPanelCrearUsuario(): void {
    this.usuarioCrear = new UsuarioDTO();
    this.cleanSubmit();
  }

  public closePanelCrearUsuario(): void {
    this.usuarioCrear = null;
  }
}
