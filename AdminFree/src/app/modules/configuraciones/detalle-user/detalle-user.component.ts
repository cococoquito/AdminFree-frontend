import { Component, Input } from '@angular/core';
import { ModulosCheck } from './../../../model/modulos-check';
import { UsuarioEdicionDTO } from './../../../dtos/configuraciones/usuario-edicion.dto';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';

/**
 * Componente para visualizar el detalle del USUARIO
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-detalle-user',
  templateUrl: './detalle-user.component.html'
})
export class DetalleUserComponent {

  /** Se utiliza para visualizar el detalle del User*/
  @Input() public user: UsuarioDTO;

  /** Se utiliza para visualizar los modulos asignados al usuario */
  @Input() public selectedModulos: ModulosCheck;

  /** Se utiliza para validar los pasos modificados */
  @Input() public modificaciones: UsuarioEdicionDTO;
}
