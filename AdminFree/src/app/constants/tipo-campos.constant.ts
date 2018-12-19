/**
 * Clase constante que contiene los tipos de campos
 *
 * @author Carlos Andres Diaz
 */
export class TipoCamposConstant {

  /** Identificadores de los tipos de campos*/
  public static readonly ID_CAMPO_TEXTO: number = 1;
  public static readonly ID_LISTA_DESPLEGABLE: number = 2;
  public static readonly ID_CASILLA_VERIFICACION: number = 3;
  public static readonly ID_CAMPO_FECHA: number = 4;

  /** Nombre de los tipo de campos*/
  public static readonly CAMPO_TEXTO: string = 'Campo de Texto';
  public static readonly LISTA_DESPLEGABLE: string = 'Lista Desplegable';
  public static readonly CASILLA_VERIFICACION: string = 'Casilla de Verificación';
  public static readonly CAMPO_FECHA: string = 'Campo de Fecha';

  /**
   * Metodo que permite obtener el nombre del
   * tipo de campo de acuerdo al identificador
   */
  public static getNombre(id: number): string {
    let nombre = '';
    switch (id) {
      case TipoCamposConstant.ID_CAMPO_TEXTO:
        nombre = TipoCamposConstant.CAMPO_TEXTO;
        break;

      case TipoCamposConstant.ID_LISTA_DESPLEGABLE:
        nombre = TipoCamposConstant.LISTA_DESPLEGABLE;
        break;

      case TipoCamposConstant.ID_CASILLA_VERIFICACION:
        nombre = TipoCamposConstant.CASILLA_VERIFICACION;
        break;

      case TipoCamposConstant.ID_CAMPO_FECHA:
        nombre = TipoCamposConstant.CAMPO_FECHA;
        break;
    }
    return nombre;
  }
}
