import { MessageService } from 'primeng/api';
import { CampoEntradaValueDTO } from '../dtos/correspondencia/campo-entrada-value.dto';
import { CampoModel } from '../model/campo-model';
import { RegexUtil } from './regex-util';
import { MsjUtil } from './messages.util';
import { FechaUtil } from './fecha-util';
import { TipoCamposConstant } from '../constants/tipo-campos.constant';
import { RestriccionesKeyConstant } from '../constants/restricciones-key.constant';
import { MsjFrontConstant } from '../constants/messages-frontend.constant';

/**
 * Clase que contiene los metodos de negocio utilitarios para todos los modulos
 *
 * @author Carlos Andres Diaz
 */
export class BusinessUtil {

  /**
	 * Metodo que permite configurar los campos para validar
	 * en el backend de acuerdo al tipo de campo y sus restricciones
   *
   * @param campos, lista de modelo de los campos
	 */
  public static getCamposValidarBackEnd(campos: Array<CampoModel>): Array<CampoEntradaValueDTO> {

    // son los valores a retornar
    let camposValue: Array<CampoEntradaValueDTO>;

    // solo se valida si hay valores a validar
    if (campos && campos.length > 0) {

      // variables que se utilizan para el proceso
      let campoValue: CampoEntradaValueDTO;
      let restricciones: Array<string>;

      // se recorre cada valor ingresado
      for (const campo of campos) {

        // por el momento solo aplica para campo de texto
        if (campo.campo.tipoCampo === TipoCamposConstant.ID_CAMPO_TEXTO) {

          // solo aplica si el campo tiene restricciones y exista su valor
          restricciones = campo.campo.restricciones;
          if (restricciones && restricciones.length > 0 && campo.valor) {

            // por el momento solo aplica esta dos restricciones
            if (restricciones.includes(RestriccionesKeyConstant.KEY_CAMPO_UNICO_NOMENCLATURA) ||
              restricciones.includes(RestriccionesKeyConstant.KEY_CAMPO_TODAS_NOMENCLATURA)) {

              // se construye el value a validar
              campoValue = new CampoEntradaValueDTO();
              campoValue.idCampo = campo.campo.id;
              campoValue.nombreCampo = campo.campo.nombre;
              campoValue.value = campo.valor;
              campoValue.restricciones = restricciones;
              campoValue.idValue = null;
              if (campo.valorOrigen && campo.valorOrigen.idValue) {
                campoValue.idValue = campo.valorOrigen.idValue;
              }

              // se agrega en la lista de la solicitud
              if (!camposValue) {
                camposValue = new Array<CampoEntradaValueDTO>();
              }
              camposValue.push(campoValue);
            }
          }
        }
      }
    }
    return camposValue;
  }

  /**
   * Metodo que comprueba si la informacion ingresada es valida a nivel de FRONT
   *
   * @param campos, son los campos a validar dependiendo sus restricciones
   * @param regex, se utiliza para validar que el input sea solo numerico
   * @param messageService, se utiliza para mostrar los mensajes de errores encontrados
   * @param fechaActual, fecha actual traida desde el servidor
   */
  public static isValoresConsecutivoValido(
    campos: Array<CampoModel>,
    regex: RegexUtil,
    messageService: MessageService,
    fechaActual: Date): boolean {

    // se verifica si hay campos para validar
    if (campos && campos.length > 0) {

      // se recorre cada campo
      for (const campoModel of campos) {

        // se valida dependiendo del tipo de campo
        switch (campoModel.campo.tipoCampo) {

          case TipoCamposConstant.ID_CAMPO_TEXTO: {
            this.esCampoTextoOK(campoModel, regex, messageService);
            break;
          }
          case TipoCamposConstant.ID_LISTA_DESPLEGABLE: {
            this.esRequeridoOK(campoModel);
            break;
          }
          case TipoCamposConstant.ID_CAMPO_FECHA: {
            this.esCampoFechaOK(campoModel, messageService, fechaActual);
            break;
          }
        }
      }

      // se verifica el resultado a retornar
      for (const value of campos) {
        if (!value.isValido) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Metodo que permite validar si el valor para el campo de texto es valido
   *
   * @param campoModel, campo de texto a validar si su valor es valido
   * @param regex, se utiliza para validar que el input sea solo numerico
   * @param messageService, se utiliza para mostrar los mensajes de errores encontrados
   */
  private static esCampoTextoOK(
    campoModel: CampoModel,
    regex: RegexUtil,
    messageService: MessageService): void {

    // se valida la obligatorieda del campo
    this.esRequeridoOK(campoModel);

    // se valida si el campo es solo numeros
    if (campoModel.isSoloNumeros && campoModel.valor) {

      // se verifica el valor ingresado para este campo
      campoModel.isValido = regex.isValorNumerico(campoModel.valor);

      // se muestra el mensaje en pantalla
      if (!campoModel.isValido) {
        messageService.add(MsjUtil.getToastErrorMedium(regex.getMsjSoloNumeros(campoModel.campo.nombre)));
      }
    }
  }

  /**
   * Metodo que permite validar si el campo es requerido y su valor
   *
   * @param campoModel, campo a validar si su valor es obligatorio
   */
  private static esRequeridoOK(campoModel: CampoModel): void {
    campoModel.isValido = true;

    // se limpian los espacios solamente para CAMPO DE TEXTO
    if (TipoCamposConstant.ID_CAMPO_TEXTO === campoModel.campo.tipoCampo) {
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
   * @param messageService, se utiliza para mostrar los mensajes de errores encontrados
   * @param fechaActual, fecha actual traida desde el servidor
   */
  private static esCampoFechaOK(
    campoModel: CampoModel,
    messageService: MessageService,
    fechaActual: Date): void {

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
        const resultado = FechaUtil.compareDate(new Date(campoModel.valor), new Date(fechaActual));

        // constantes que indica cual fue su resultado
        const iguales = resultado === 0;
        const esMayor = resultado === 1;
        const esMenor = resultado === -1;

        // validacion cuando la fecha debe ser mayor a la fecha actual
        if (campoModel.isFechaMayorActual) {
          if (iguales || esMenor) {
            campoModel.isValido = false;
            messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MAYOR_ACTUAL));
          }
        } else if (campoModel.isFechaMenorActual) {
          // validacion cuando la fecha debe ser menor a la fecha actual
          if (iguales || esMayor) {
            campoModel.isValido = false;
            messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MENOR_ACTUAL));
          }

        } else if (campoModel.isFechaMayorIgualActual) {
          // validacion cuando la fecha debe ser mayor o igual que la fecha actual
          if (esMenor) {
            campoModel.isValido = false;
            messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MAYOR_IGUAL_ACTUAL));
          }

        } else if (campoModel.isFechaMenorIgualActual) {
          // validacion cuando la fecha debe ser menor o igual que la fecha actual
          if (esMayor) {
            campoModel.isValido = false;
            messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MENOR_IGUAL_ACTUAL));
          }
        }
      }
    }
  }
}
