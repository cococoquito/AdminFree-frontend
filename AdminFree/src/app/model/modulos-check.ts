import { LabelsConstant } from './../constants/labels.constant';
import { ModulesTokenConstant } from './../constants/modules-token.constant';

/**
 * Modelo para seleccionar los modulos que podra ver el usuario
 *
 * @author Carlos Andres Diaz
 */
export class ModulosCheck {

  /** identificador del modulo */
  public token: string;

  /** nombre del modulos */
  public nombre: string;

  /** descripcion de que es lo que hace el modulo */
  public descripcion: string;

  /** indica si el modulo aplica */
  public aplica: boolean;

  /** Lista de modulos que puede ver el usuario */
  public modulos: Array<ModulosCheck>;

  /**
   * Metodo que permite crear la lista de modulos
   */
  public init(): void {

    // modulo de correspondencia
    const corres = new ModulosCheck();
    corres.token = ModulesTokenConstant.TK_CORRESPONDENCIA;
    corres.nombre = LabelsConstant.MODULO_CORRESPONDENCIA;
    corres.descripcion = 'Módulo que permite solicitar, modificar, anular los consecutivos de correspondencia';

    // archivo de gestion
    const archivo = new ModulosCheck();
    archivo.token = ModulesTokenConstant.TK_ARCHIVO_GESTION;
    archivo.nombre = LabelsConstant.MODULO_ARCHIVO_GESTION;
    archivo.descripcion = 'Módulo que permite archivar los consecutivos de correspondencia solicitados en series documentales';

    // reportes
    const reportes = new ModulosCheck();
    reportes.token = ModulesTokenConstant.TK_REPORTES;
    reportes.nombre = LabelsConstant.MODULO_REPORTES;
    reportes.descripcion = 'Módulo que permite generar reportes de los consecutivos de correspondencia solicitados en diferentes formatos';

    // configuraciones
    const conf = new ModulosCheck();
    conf.token = ModulesTokenConstant.TK_CONFIGURACIONES;
    conf.nombre = LabelsConstant.MODULO_CONFIGURACIONES;
    conf.descripcion = 'Módulo administrativo del sistema, solo para usuarios con ROL de administrador';

    this.modulos = new Array<ModulosCheck>();
    this.modulos.push(corres);
    this.modulos.push(archivo);
    this.modulos.push(reportes);
    this.modulos.push(conf);
  }

  /**
   * Indica si selecionaron almenos un modulo
   */
  public tieneModuloSeleccionado(): boolean {
    for (const modulo of this.modulos) {
      if (modulo.aplica) {
        return true;
      }
    }
    return false;
  }

  /**
   * reinicia la bandera si aplica de todos los modulos
   */
  public clean(): void {
    for (const modulo of this.modulos) {
      modulo.aplica = false;
    }
  }
}
