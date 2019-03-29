import { CampoEntradaDetalleDTO } from './../dtos/correspondencia/campo-entrada-detalle.dto';
import { RestriccionesKeyConstant } from '../constants/restricciones-key.constant';
import { ConsecutivoEdicionValueDTO } from '../dtos/correspondencia/consecutivo-edicion-value.dto';

/**
 * Contiene el model de un campo de entrada informacion a visualizar en pantalla
 *
 * @author Carlos Andres Diaz
 *
 */
export class CampoModel {

  /** Contiene los datos del campo */
  public campo: CampoEntradaDetalleDTO;

  /** Es el valor ingresado o seleccionado */
  public valor: any;

  /** Indica si el campo es requerido */
  public isRequerido: boolean;

  /** Indica si el campo de texto debe ser solo numeros */
  public isSoloNumeros: boolean;

  /** El valor por defecto de la fecha será la fecha actual y el usuario NO podrá modificar este valor */
  public isFechaActualNoEditable: boolean;

  /** El valor de la fecha debe ser mayor a la fecha actual */
  public isFechaMayorActual: boolean;

  /** El valor de la fecha debe ser menor a la fecha actual */
  public isFechaMenorActual: boolean;

  /** El valor de la fecha debe ser mayor o igual que la fecha actual */
  public isFechaMayorIgualActual: boolean;

  /** El valor de la fecha debe ser menor o igual que la fecha actual */
  public isFechaMenorIgualActual: boolean;

  /** Date minimo para el componente calendar */
  public minDate: Date;

  /** Date maximo para el componente calendar */
  public maxDate: Date;

  /** Indica si el componente tiene un valor valido */
  public isValido: boolean;

  /**
   * Metodo que permite incializar los atributos de este campo model
   * para la funcionalidad de solicitar consecutivo correspondencia
   *
   * @param campo , DTO que contiene el detalle del campo
   * @param fechaActual, fecha actual recibida desde el servidor
   */
  public initSolicitar(campo: CampoEntradaDetalleDTO, fechaActual: Date): void {

    // se configura los valores requeridos para la creacion
    this.campo = campo;
    this.isValido = true;

    // se confiogura las restricciones para este campo
    this.setRestricciones(fechaActual);
  }

  /**
   * Metodo que permite incializar los atributos de este campo model
   * para la funcionalidad de editar consecutivo correspondencia
   *
   * @param value , Contiene los datos del valor a editar
   * @param fechaActual, fecha actual recibida desde el servidor
   */
  public initEdicion(value: ConsecutivoEdicionValueDTO, fechaActual: Date): void {

    // se configura los valores requeridos para la edicion
    this.campo = value.campo;
    this.isValido = true;

    // se confiogura las restricciones para este campo
    this.setRestricciones(fechaActual);

    // se configura el valor editar
    this.valor = value.value;
  }

  /**
   * Metodo que permite configurar las restricciones para este campo model
   */
  private setRestricciones(fechaActual: Date): void {

    // se valida si este campo tiene restricciones
    const restricciones = this.campo.restricciones;
    if (restricciones && restricciones.length > 0) {

      // se recorre todas las restricciones
      for (const restriccion of restricciones) {

        // se valida cada restriccion
        switch (restriccion) {

          case RestriccionesKeyConstant.KEY_CAMPO_OBLIGATORIO: {
            this.isRequerido = true;
            break;
          }
          case RestriccionesKeyConstant.KEY_CAMPO_SOLO_NUMEROS: {
            this.isSoloNumeros = true;
            break;
          }
          case RestriccionesKeyConstant.KEY_VALOR_INICIAL_CASILLA_NO + '': {
            this.valor = false;
            break;
          }
          case RestriccionesKeyConstant.KEY_VALOR_INICIAL_CASILLA_SI: {
            this.valor = true;
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_ACTUAL_NO_MODIFICABLE: {
            this.isFechaActualNoEditable = true;
            this.valor = new Date(fechaActual);
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_ACTUAL_SI_MODIFICABLE: {
            this.valor = new Date(fechaActual);
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_MAYOR_ACTUAL: {
            this.isFechaMayorActual = true;
            this.minDate = new Date(fechaActual);
            this.minDate.setDate(this.minDate.getDate() + 1);
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_MAYOR_IGUAL_ACTUAL: {
            this.isFechaMayorIgualActual = true;
            this.minDate = new Date(fechaActual);
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_MENOR_ACTUAL: {
            this.isFechaMenorActual = true;
            this.maxDate = new Date(fechaActual);
            this.maxDate.setDate(this.maxDate.getDate() - 1);
            break;
          }
          case RestriccionesKeyConstant.KEY_FECHA_MENOR_IGUAL_ACTUAL: {
            this.isFechaMenorIgualActual = true;
            this.maxDate = new Date(fechaActual);
            break;
          }
        }
      }
    }
  }
}
