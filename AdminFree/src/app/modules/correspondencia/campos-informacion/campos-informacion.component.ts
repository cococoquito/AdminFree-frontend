import { Component, OnInit, Input } from '@angular/core';
import { CampoEntradaDetalleDTO } from '../../../dtos/correspondencia/campo-entrada-detalle.dto';
import { CampoInformacionModel } from './../../../model/campo-informacion.model';
import { TipoCamposConstant } from '../../../constants/tipo-campos.constant';
import { RestriccionesKeyConstant } from './../../../constants/restricciones-key.constant';

/**
 * Componente para la administracion de los campos de informacion
 * para las solicitudes de consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-campos-informacion',
  templateUrl: './campos-informacion.component.html',
  styleUrls: ['./campos-informacion.component.css']
})
export class CamposInformacionComponent implements OnInit {

  /** Contiene el detalle de los campos de entrada informacion*/
  @Input() public campos: Array<CampoEntradaDetalleDTO>;

  /** Esta es la lista a visualizar en pantalla*/
  public camposVisualizar: Array<CampoInformacionModel>;

  /** identificadores de cada tipo de campo*/
  public ID_CAMPO_TEXTO = TipoCamposConstant.ID_CAMPO_TEXTO;
  public ID_LISTA_DESPLEGABLE = TipoCamposConstant.ID_LISTA_DESPLEGABLE;
  public ID_CASILLA_VERIFICACION = TipoCamposConstant.ID_CASILLA_VERIFICACION;
  public ID_CAMPO_FECHA = TipoCamposConstant.ID_CAMPO_FECHA;

  /**
   * Se construye el modelo de cada campo, donde se indica sus restricciones
   */
  ngOnInit() {
    this.setCamposModel();
  }

  /**
   * Metodo que permite configurar el model de los campos
   */
  private setCamposModel(): void {

    // se valida si hay campos para esta nomenclatura
    if (this.campos && this.campos.length > 0) {

      // se crea el campo a visualizar en pantalla
      this.camposVisualizar = new Array<CampoInformacionModel>();

      // se recorre todos los campos
      let campoModel: CampoInformacionModel;
      for (const campo of this.campos) {

        // se crea el modelo del campo
        campoModel = new CampoInformacionModel();
        campoModel.campo = campo;

        // se configura las restricciones de este campo
        this.setRestricciones(campoModel);

        // se agrega a la lista a visualizar
        this.camposVisualizar.push(campoModel);
      }
    }
  }

  /**
   * Metodo que permite configurar las restricciones de un campo
   */
  private setRestricciones(campoModel: CampoInformacionModel): void {

    // se valida si este campo tiene restricciones
    const restricciones: Array<string> = campoModel.campo.restricciones;
    if (restricciones && restricciones.length > 0) {

      // se recorre todas las restricciones
      for (const restriccion of restricciones) {

        // se valida cada restriccion
        switch (restriccion) {

          case RestriccionesKeyConstant.KEY_CAMPO_OBLIGATORIO: {
            campoModel.isRequerido = true;
            break;
          }
          case RestriccionesKeyConstant.KEY_CAMPO_SOLO_NUMEROS: {
            campoModel.isSoloNumeros = true;
            break;
          }
        }
      }
    }
  }
}
