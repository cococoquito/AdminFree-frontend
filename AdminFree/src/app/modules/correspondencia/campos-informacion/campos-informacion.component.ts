import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CampoInformacionModel } from './../../../model/campo-informacion.model';
import { CampoModel } from './../../../model/campo-model';
import { RegexUtil } from './../../../util/regex-util';
import { MsjUtil } from './../../../util/messages.util';
import { FechaUtil } from './../../../util/fecha-util';
import { TipoCamposConstant } from '../../../constants/tipo-campos.constant';
import { RestriccionesKeyConstant } from './../../../constants/restricciones-key.constant';
import { LabelsConstant } from '../../../constants/labels.constant';
import { MsjFrontConstant } from '../../../constants/messages-frontend.constant';

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

  /** Contiene los datos que se necesitan para este componente*/
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

    // se valida si existe el backup de los campos a visualizar
    if (!this.model.camposVisualizar) {

      // se valida si para la nomenclatura seleccionada existen campos
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
    } else {
      this.camposVisualizar = this.model.camposVisualizar;
      if (this.camposVisualizar && this.camposVisualizar.length > 0) {
        for (const campo of this.camposVisualizar) {
          campo.isValido = true;
        }
      }
    }
  }

  /**
   * Metodo que permite configurar las restricciones de un campo
   *
   * @param campoModel, modelo del campo a configurar
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
          case RestriccionesKeyConstant.KEY_VALOR_INICIAL_CASILLA_NO + '': {
            campoModel.valor = false;
            break;
          }
          case RestriccionesKeyConstant.KEY_VALOR_INICIAL_CASILLA_SI: {
            campoModel.valor = true;
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_ACTUAL_NO_MODIFICABLE: {
            campoModel.isFechaActualNoEditable = true;
            campoModel.valor = this.model.fechaActual;
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_ACTUAL_SI_MODIFICABLE: {
            campoModel.valor = new Date(this.model.fechaActual);
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_MAYOR_ACTUAL: {
            campoModel.isFechaMayorActual = true;
            campoModel.minDate = new Date(this.model.fechaActual);
            campoModel.minDate.setDate(campoModel.minDate.getDate() + 1);
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_MAYOR_IGUAL_ACTUAL: {
            campoModel.isFechaMayorIgualActual = true;
            campoModel.minDate = new Date(this.model.fechaActual);
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_MENOR_ACTUAL: {
            campoModel.isFechaMenorActual = true;
            campoModel.maxDate = new Date(this.model.fechaActual);
            campoModel.maxDate.setDate(campoModel.maxDate.getDate() - 1);
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_MENOR_IGUAL_ACTUAL: {
            campoModel.isFechaMenorIgualActual = true;
            campoModel.maxDate = new Date(this.model.fechaActual);
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
   * Metodo que permite retornar los campos configurados
   */
  public getCamposVisualizar(): Array<CampoModel> {
    return this.camposVisualizar;
  }

  /**
   * Metodo que permite validar si el valor para el campo de texto es valido
   *
   * @param campoModel, campo de texto a validar si su valor es valido
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
   *
   * @param campoModel, campo a validar si su valor es obligatorio
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
   *
   * @param campoModel, fecha a validar si su valor es valido
   */
  private esCampoFechaOK(campoModel: CampoModel): void {

    // se valida la obligatorieda del campo
    this.esRequeridoOK(campoModel);

    // para la demas validaciones debe existir el valor
    if (campoModel.valor) {

      // debe existir alguna validacion asignada
      if (campoModel.isFechaMayorActual ||
        campoModel.isFechaMenorActual ||
        campoModel.isFechaMayorIgualActual ||
        campoModel.isFechaMenorIgualActual) {

        // se hace la comparacion de las fechas
        const resultado = FechaUtil.compareDate(new Date(campoModel.valor), new Date(this.model.fechaActual));

        // constantes que indica cual fue su resultado
        const iguales = resultado === 0;
        const esMayor = resultado === 1;
        const esMenor = resultado === -1;

        // validacion cuando la fecha debe ser mayor a la fecha actual
        if (campoModel.isFechaMayorActual) {
          if (iguales || esMenor) {
            campoModel.isValido = false;
            this.messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MAYOR_ACTUAL));
          }
        } else if (campoModel.isFechaMenorActual) {
          // validacion cuando la fecha debe ser menor a la fecha actual
          if (iguales || esMayor) {
            campoModel.isValido = false;
            this.messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MENOR_ACTUAL));
          }

        } else if (campoModel.isFechaMayorIgualActual) {
          // validacion cuando la fecha debe ser mayor o igual que la fecha actual
          if (esMenor) {
            campoModel.isValido = false;
            this.messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MAYOR_IGUAL_ACTUAL));
          }

        } else if (campoModel.isFechaMenorIgualActual) {
          // validacion cuando la fecha debe ser menor o igual que la fecha actual
          if (esMayor) {
            campoModel.isValido = false;
            this.messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MENOR_IGUAL_ACTUAL));
          }
        }
      }
    }
  }
}
