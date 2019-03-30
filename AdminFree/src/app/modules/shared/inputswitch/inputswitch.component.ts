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

  /** bandera que indica si el componente inicia como NO APLICA */
  @Input() public isNA: boolean;

  /**
   * Metodo que soporta el evento click del input-switch
   *
   * @param event , se utiliza para no propagar el evento y asi evitar
   * que seleccione o deseleccione la fila de la tabla
   */
  public change(event) {

    // se cambia la bandera
    this.isChecked = !this.isChecked;

    // El componente si APLICA
    this.isNA = false;

    // se notifica el cambio
    this.switchChange.emit(this.isChecked);

    // se para la propagacion del evento
    event.stopPropagation();
  }
}
