import { Component, Input, OnInit } from '@angular/core';
import { CampoEntradaDTO } from './../../../dtos/configuraciones/campo-entrada.dto';
import { TipoCamposConstant } from './../../../constants/tipo-campos.constant';

/**
 * Componente para visualizar el detalle de un campo de entrada informacion
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-detalle-campo',
  templateUrl: './detalle-campo.component.html'
})
export class DetalleCampoComponent implements OnInit {

  /** Se utiliza para visualizar el detalle del campo*/
  @Input() public campo: CampoEntradaDTO;

  /** Identifica si el campo tiene restricciones*/
  public tieneRestriccion: boolean;

  /** Identificador del tipo de campo lista desplegable*/
  public ID_LISTA_DESPLEGABLE = TipoCamposConstant.ID_LISTA_DESPLEGABLE;

  /**
   * Metodo que permite validar si tiene restricciones
   */
  ngOnInit() {
    this.setTieneRestriccion();
  }

  /**
   * Metodo que permite validar si el campo tiene restricciones
   */
  private setTieneRestriccion(): void {
    this.tieneRestriccion = false;
    if (this.campo.restricciones) {
      for (const restriccion of this.campo.restricciones) {
        if (restriccion.aplica) {
          this.tieneRestriccion = true;
          break;
        }
      }
    }
  }
}