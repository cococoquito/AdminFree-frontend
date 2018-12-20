import { MenuItem } from 'primeng/api';
import { LabelsConstant } from './../constants/labels.constant';

/**
 * Modelo para el componente steps de primeng
 *
 * @author Carlos Andres Diaz
 */
export class StepsModel {

  /** lista de steps a visualizar en pantalla */
  public steps: MenuItem[];

  /** indica cual step esta activa */
  public activeIndex: number;

  /** indica el ultimo index para el step */
  public ulitmoIndex: number;

  /** styleClass de cada step dependiendo del tamanio de la lista steps */
  public styleClass: string;

  /** constante con las clases de estilos para el componente */
  public STEPS_3 = 'steps-3';
  public STEPS_4 = 'steps-4';

  /** Index de los steps */
  public STEP_UNO = 0;
  public STEP_DOS = 1;
  public STEP_TRES = 2;

  /**
   * Metodo que permite agregar un nuevo step para el componente
   */
  public agregarStep(etiqueta: string): void {
    if (!this.steps) {
      this.steps = new Array<MenuItem>();
    }
    this.steps.push({ label: etiqueta });
  }

  /**
   * Metodo que permite limpiar el componente por si hay
   * algun cambio en el modelo que impacta la vista
   */
  public cleanSteps(): void {
    this.steps = null;
    this.styleClass = null;
  }

  /**
   * Metodo que permite empezar el modelo para el componente
   * donde se calcula como se debe mostrar los steps
   */
  public init(): void {

    // el step de arranque es el primero
    this.irPrimerStep();

    // se calcula el stilo para cada step dependiendo de
    // la cantidad de steps que contiene el componente
    if (this.steps.length === 3) {
      this.styleClass = this.STEPS_3;
    } else if (this.steps.length === 4) {
      this.styleClass = this.STEPS_4;
    }

    // se configura el ultimo index de los steps
    this.ulitmoIndex = this.steps.length - 1;
  }

  /**
   * Metodo que agrega los items para el submodulo
   * de administrar campos de entrada de informacion
   */
  public stepsParaAdminCampos(agregarItem: boolean): void {

    // se limpia el modelo por si hay registros anteriores
    this.cleanSteps();

    // se agregan los items para este submodulo
    this.agregarStep(LabelsConstant.DATOS_CAMPO);
    this.agregarStep(LabelsConstant.RESTRICCIONES);
    if (agregarItem) {
      this.agregarStep(LabelsConstant.AGREGAR_ITEMS);
    }
    this.agregarStep(LabelsConstant.CONFIRMACION);

    // se inicializa el model del componente
    this.init();
  }

  /** Metodos para navegar entre los steps del componente */
  public irPrimerStep(): void {
    this.activeIndex = this.STEP_UNO;
  }

  public irSegundoStep(): void {
    this.activeIndex = this.STEP_DOS;
  }

  public irTercerStep(): void {
    this.activeIndex = this.STEP_TRES;
  }

  public irPenultimoStep(): void {
    this.activeIndex = this.ulitmoIndex - 1;
  }

  public irUltimoStep(): void {
    this.activeIndex = this.ulitmoIndex;
  }
}
