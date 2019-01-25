import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { CorrespondenciaState } from './../../../states/correspondencia/correspondencia.state';
import { SpinnerState } from './../../../states/spinner.state';

/**
 * Componente para la administracion de los documentos de correspondencia
 * para la solicitud o edicion de los consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-admin-documentos',
  templateUrl: './admin-documentos.component.html',
  styleUrls: ['./admin-documentos.component.css']
})
export class AdminDocumentosComponent implements OnInit {

  /** Es el titulo de la nomenclatura seleccionada*/
  @Input() titleNomenclatura: TemplateRef<any>;

  /**
   * @param state, estado para administrar los datos para las
   * solicitudes de creacion, edicion de consecutivos de correspondencia
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   */
  constructor(
    public state: CorrespondenciaState,
    private spinnerState: SpinnerState) {
  }

  /**
   * Metodo que define las variables globales
   */
  ngOnInit() {
   // this.init();
  }

  /**
   * Metodo que permite soportar el boton siguiente
   */
  public siguiente(): void {

  }
}