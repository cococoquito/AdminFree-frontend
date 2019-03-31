import { CampoEntradaValueDTO } from '../dtos/correspondencia/campo-entrada-value.dto';
import { CampoModel } from '../model/campo-model';
import { TipoCamposConstant } from '../constants/tipo-campos.constant';
import { RestriccionesKeyConstant } from '../constants/restricciones-key.constant';

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
}
