import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Componente que es usuado para seleccionar un valor boolean
 */
@Component({
  selector: 'admin-inputswitch',
  templateUrl: './inputswitch.component.html',
  styleUrls: ['./inputswitch.component.css']
})
export class InputswitchComponent {

  /** bandera que indica el valor seleccionado por el usuario */
  @Input() public isChecked: boolean;

  /** texto al lado del componente */
  @Input() public label: string;

  /** Se utiliza para notificar el cambio del input */
  @Output() public switchChange = new EventEmitter<boolean>();

  /**
   * Metodo que soporta el evento click del input-switch
   */
  public change() {
    // se cambia la bandera
    this.isChecked = !this.isChecked;

    // se notifica el cambio
    this.switchChange.emit(this.isChecked);
  }
}
