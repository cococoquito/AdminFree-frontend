import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CampoInformacionModel } from './../../../model/campo-informacion.model';
import { CampoModel } from './../../../model/campo-model';
import { RegexUtil } from './../../../util/regex-util';
import { MsjUtil } from './../../../util/messages.util';
import { TipoCamposConstant } from '../../../constants/tipo-campos.constant';
import { RestriccionesKeyConstant } from './../../../constants/restricciones-key.constant';
import { LabelsConstant } from '../../../constants/labels.constant';

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
  @Input() public model: CampoInformacionModel;

  /** Esta es la lista de campos a visualizar en pantalla*/
  public camposVisualizar: Array<CampoModel>;

  /** Se utiliza para validar los valores de los inputs*/
  public regex: RegexUtil;

  /** labels para el componente de los calendars */
  public calendarEspanish: any;

  /** identificadores de cada tipo de campo*/
  public ID_CAMPO_TEXTO = TipoCamposConstant.ID_CAMPO_TEXTO;
  public ID_LISTA_DESPLEGABLE = TipoCamposConstant.ID_LISTA_DESPLEGABLE;
  public ID_CASILLA_VERIFICACION = TipoCamposConstant.ID_CASILLA_VERIFICACION;
  public ID_CAMPO_FECHA = TipoCamposConstant.ID_CAMPO_FECHA;

  /**
   * @param messageService, mensajes en pantalla
   */
  constructor(private messageService: MessageService) {}

  /**
   * Metodo que define las variables globales
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Metodo que permite configurar las variables iniciales
   */
  private init(): void {

    // se define las variables globales
    this.regex = new RegexUtil();
    this.calendarEspanish = LabelsConstant.calendarEspanish;

    // se configura el modelo de los campos
    this.setCamposModel();
  }

  /**
   * Metodo que permite configurar el model de los campos
   */
  private setCamposModel(): void {

    // se valida si hay campos para esta nomenclatura
    if (this.model && this.model.campos && this.model.campos.length > 0) {

      // se crea los campos a visualizar en pantalla
      this.camposVisualizar = new Array<CampoModel>();

      // se recorre todos los campos
      let campoModel;
      for (const campo of this.model.campos) {

        // se crea el modelo del campo
        campoModel = new CampoModel();
        campoModel.isValido = true;
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
  private setRestricciones(campoModel: CampoModel): void {

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
          case RestriccionesKeyConstant.KEY_FECHA_ACTUAL_NO_MODIFICABLE: {
            campoModel.isFechaActualNoEditable = true;
            campoModel.valor = this.model.fechaActual;
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_ACTUAL_SI_MODIFICABLE: {
            campoModel.isFechaActualSiEditable = true;
            campoModel.valor = this.model.fechaActual;
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_MAYOR_ACTUAL: {
            campoModel.isFechaMayorActual = true;
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_MENOR_ACTUAL: {
            campoModel.isFechaMenorActual = true;
            break;
          }
          case RestriccionesKeyConstant.KEY_VALOR_INICIAL_CASILLA_NO + '': {
            campoModel.valor = false;
            break;
          }
          case RestriccionesKeyConstant.KEY_VALOR_INICIAL_CASILLA_SI: {
            campoModel.valor = true;
            break;
          }
        }
      }
    }
  }

  /**
   * Metodo que comprueba si la informacion ingresada es valida
   */
  public esInformacionValida(): boolean {

    // se verifica si hay campos de informacion para esta nomenclatura
    if (this.camposVisualizar && this.camposVisualizar.length > 0) {

      // se recorre cada campo
      for (const campoModel of this.camposVisualizar) {

        // se valida dependiendo del tipo de campo
        switch (campoModel.campo.tipoCampo) {

          case this.ID_CAMPO_TEXTO: {
            this.esCampoTextoOK(campoModel);
            break;
          }
          case this.ID_LISTA_DESPLEGABLE: {
            this.esRequeridoOK(campoModel);
            break;
          }
          case this.ID_CAMPO_FECHA: {
            this.esCampoFechaOK(campoModel);
            break;
          }
        }
      }

      // se verifica el resultado a retornar
      for (const campoModel of this.camposVisualizar) {
        if (!campoModel.isValido) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Metodo que permite validar si el valor para el campo de texto es valido
   */
  private esCampoTextoOK(campoModel: CampoModel): void {

    // se valida la obligatorieda del campo
    this.esRequeridoOK(campoModel);

    // se valida si el campo es solo numeros
    if (campoModel.isSoloNumeros && campoModel.valor) {

      // se verifica el valor ingresado para este campo
      campoModel.isValido = this.regex.isValorNumerico(campoModel.valor);

      // se muestra el mensaje en pantalla
      if (!campoModel.isValido) {
        this.messageService.add(MsjUtil.getToastError(this.regex.getMsjSoloNumeros(campoModel.campo.nombre)));
      }
    }
  }

  /**
   * Metodo que permite validar si el campo es requerido y su valor
   */
  private esRequeridoOK(campoModel: CampoModel): void {
    campoModel.isValido = true;

    // se limpian los espacios solamente para campo de texto
    if (this.ID_CAMPO_TEXTO === campoModel.campo.tipoCampo) {
      campoModel.valor = (campoModel.valor) ? campoModel.valor.trim() : null;
    }

    // se valida si este campo es requerido
    if (campoModel.isRequerido) {

      // se valida si el valor fue ingresado por el usuario
      if (!campoModel.valor) {
        campoModel.isValido = false;
      }
    }
  }

  /**
   * Metodo que permite validar si el valor para la fecha es valido
   */
  private esCampoFechaOK(campoModel: CampoModel): void {

    // se valida la obligatorieda del campo
    this.esRequeridoOK(campoModel);
  }
}
