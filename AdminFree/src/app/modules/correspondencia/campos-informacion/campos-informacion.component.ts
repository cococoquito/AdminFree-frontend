import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CampoEntradaDetalleDTO } from '../../../dtos/correspondencia/campo-entrada-detalle.dto';
import { CampoInformacionModel } from './../../../model/campo-informacion.model';
import { RegexUtil } from './../../../util/regex-util';
import { MsjUtil } from './../../../util/messages.util';
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

  /** Se utiliza para validar los valores de los inputs*/
  public regex: RegexUtil;

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
   * Se construye el modelo de cada campo, donde se indica sus restricciones
   */
  ngOnInit() {

    // se configura las variables iniciales
    this.init();

    // se configura el modelo de los campos
    this.setCamposModel();
  }

  /**
   * Metodo que comprueba si la informacion ingresada es valida
   */
  public esInformacionValida(): boolean {
    let resultado = true;

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

          case this.ID_CASILLA_VERIFICACION: {
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
          resultado = false;
          break;
        }
      }
    }
    return resultado;
  }

  /**
   * Metodo que permite configurar las variables iniciales
   */
  private init(): void {
    this.regex = new RegexUtil();
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

  /**
   * Metodo que permite validar si el valor para el campo de texto es valido
   */
  private esCampoTextoOK(campoModel: CampoInformacionModel): void {

    // se valida la obligatorieda del campo
    this.esRequeridoOK(campoModel);

    // se valida si el campo es solo numeros
    if (campoModel.isSoloNumeros && campoModel.isValido) {

      // se verifica el valor ingresado para este campo
      campoModel.isValido = this.regex.isValorNumerico(campoModel.valor);

      // se muestra el mensaje en pantalla
      if (!campoModel.isValido) {
        this.messageService.add(MsjUtil.getToastError(this.regex.getMsjSoloNumeros(campoModel.campo.nombre)));
      }
    }
  }

  /**
   * Metodo que permite validar si el valor para la fecha es valido
   */
  private esCampoFechaOK(campoModel: CampoInformacionModel): void {
  }

  /**
   * Metodo que permite validar si el campo es requerido y su valor
   */
  private esRequeridoOK(campoModel: CampoInformacionModel): void {
    campoModel.isValido = true;

    // se limpian los espacios solamente para campo de texto
    if (this.ID_CAMPO_TEXTO === campoModel.campo.tipoCampo) {
      campoModel.valor = this.setTrim(campoModel.valor);
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
   * Metodo remueve los espacios en blanco del comienzo y final
   */
  private setTrim(valor: string): string {
    return (valor) ? valor.trim() : null;
  }
}
