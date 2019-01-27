import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { CorrespondenciaService } from './../../../services/correspondencia.service';
import { CorrespondenciaState } from './../../../states/correspondencia/correspondencia.state';

/**
 * Componente para la confirmacion para la solicitud de los
 * consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-solicitar-confirmacion',
  templateUrl: './solicitar-confirmacion.component.html',
  styleUrls: ['./solicitar-confirmacion.component.css']
})
export class SolicitarConfirmacionComponent implements OnInit {

  /** Es el detalle de la nomenclatura seleccionada*/
  @Input() dtlNomenclatura: TemplateRef<any>;

  /**
   * @param state, estado para administrar los datos para las
   * solicitudes de creacion, edicion de consecutivos de correspondencia
   *
   * @param correspondenciaService, contiene los servicios
   * del modulo de correspondencia
   */
  constructor(
    public state: CorrespondenciaState,
    private correspondenciaService: CorrespondenciaService) {}

  ngOnInit() {}
}
