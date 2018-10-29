/**
 * Clase constante que contiene todos los ESTADOS que utiliza AdminFree
 *
 * @author Carlos Andres Diaz
 */
export class EstadoConstant {

  /** Identificadores de los estados*/
  static readonly ID_ACTIVO: number = 1;
  static readonly ID_INACTIVO: number = 2;
  static readonly ID_ANULADO: number = 3;
  static readonly ID_BORRADO: number = 4;
  static readonly ID_CERRADO: number = 5;

  /** Nombre de los estados*/
  static readonly ACTIVO: string = 'Activo';
  static readonly INACTIVO: string = 'Inactivo';
  static readonly ANULADO: string = 'Anulado';
  static readonly BORRADO: string = 'Borrado';
  static readonly CERRADO: string = 'Cerrado';

  /**
   * Metodo que permite obtener el nombre del
   * estado de acuerdo al identificador
   *
   * @param idEstado, identificador del estado
   * @returns nombre del estado de acuerdo al identificador
   */
  public static getNombreEstado(idEstado: number): string {
    let estado = '';
    switch (idEstado) {

      case EstadoConstant.ID_ACTIVO:
        estado = EstadoConstant.ACTIVO;
        break;

      case EstadoConstant.ID_INACTIVO:
        estado = EstadoConstant.INACTIVO;
        break;

      case EstadoConstant.ID_ANULADO:
        estado = EstadoConstant.ANULADO;
        break;

      case EstadoConstant.ID_BORRADO:
        estado = EstadoConstant.BORRADO;
        break;

      case EstadoConstant.ID_CERRADO:
        estado = EstadoConstant.CERRADO;
        break;
    }
    return estado;
  }
}
