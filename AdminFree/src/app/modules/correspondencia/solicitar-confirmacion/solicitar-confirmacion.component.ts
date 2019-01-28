import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { CorrespondenciaService } from './../../../services/correspondencia.service';
import { CorrespondenciaState } from './../../../states/correspondencia/correspondencia.state';
import { TipoCamposConstant } from './../../../constants/tipo-campos.constant';

/**
 * Componente para la confirmacion para la solicitud de los
 * consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-solicitar-confirmacion',
  templateUrl: './solicitar-confirmacion.component.html'
})
export class SolicitarConfirmacionComponent implements OnInit {

  /** Es el detalle de la nomenclatura seleccionada*/
  @Input() dtlNomenclatura: TemplateRef<any>;

  /** identificadores de cada tipo de campo*/
  public ID_CAMPO_TEXTO = TipoCamposConstant.ID_CAMPO_TEXTO;
  public ID_LISTA_DESPLEGABLE = TipoCamposConstant.ID_LISTA_DESPLEGABLE;
  public ID_CASILLA_VERIFICACION = TipoCamposConstant.ID_CASILLA_VERIFICACION;
  public ID_CAMPO_FECHA = TipoCamposConstant.ID_CAMPO_FECHA;

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
