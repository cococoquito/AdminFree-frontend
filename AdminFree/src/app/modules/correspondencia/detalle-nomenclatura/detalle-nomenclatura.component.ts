import { Component, Input, OnInit } from '@angular/core';
import { NomenclaturaDetalleDTO } from './../../../dtos/correspondencia/nomenclatura-detalle.dto';
import { LabelsConstant } from '../../../constants/labels.constant';

/**
 * Componente para visualizar el detalle de la NOMENCLATURA
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-detalle-nomenclatura',
  templateUrl: './detalle-nomenclatura.component.html'
})
export class DetalleNomenclaturaComponent implements OnInit {

  /** Contiene los datos del detalle de la nomenclatura a visualizar*/
  @Input() public detalle: NomenclaturaDetalleDTO;

  /** Valor del consecutivo inicial a visualizar*/
  public consecutivoInicial: string;

  /** Valor del ultimo consecutivo generado a visualizar*/
  public ultimoConsecutivoGenerado: string;

  /**
   * Metodo que define las variables globales
   */
  ngOnInit() {
    let rango: string;

    // se configura el valor del 'ultimo consecutivo generado'
    this.ultimoConsecutivoGenerado = LabelsConstant.NO_HAY_CONSECUTIVOS;
    if (this.detalle.ultimoConsecutivoSolicitado) {
      rango = LabelsConstant.RANGO.substring(this.detalle.ultimoConsecutivoSolicitado.toString().length);
      this.ultimoConsecutivoGenerado = rango + this.detalle.ultimoConsecutivoSolicitado;
    }

    // se configura el valor del 'consecutivo inicial'
    rango = LabelsConstant.RANGO.substring(this.detalle.consecutivoInicial.toString().length);
    this.consecutivoInicial = rango + this.detalle.consecutivoInicial;
  }
}
