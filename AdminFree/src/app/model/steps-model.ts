import { MenuItem } from 'primeng/api';
import { SpinnerState } from './../states/spinner.state';
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
  public STEPS_2 = 'steps-2';
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
    if (this.steps.length === 2) {
      this.styleClass = this.STEPS_2;
    } else if (this.steps.length === 3) {
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

  /**
   * Metodo que agrega los items para el submodulo
   * de administrar usuarios en el sistema
   */
  public stepsParaAdminUsers(): void {

    // se limpia el modelo por si hay registros anteriores
    this.cleanSteps();

    // se agregan los items para este submodulo
    this.agregarStep(LabelsConstant.DATOS_USER);
    this.agregarStep(LabelsConstant.MODULOS);
    this.agregarStep(LabelsConstant.CONFIRMACION);

    // se inicializa el model del componente
    this.init();
  }

  /**
   * Metodo que agrega los items para el submodulo
   * de administrar nomenclaturas en el sistema
   */
  public stepsParaAdminNomenclaturas(): void {

    // se limpia el modelo por si hay registros anteriores
    this.cleanSteps();

    // se agregan los items para este submodulo
    this.agregarStep(LabelsConstant.DATOS_NOMENCLATURA);
    this.agregarStep(LabelsConstant.CAMPOS);
    this.agregarStep(LabelsConstant.CONFIRMACION);

    // se inicializa el model del componente
    this.init();
  }

  /**
   * Metodo que agrega los items para el submodulo
   * de solicitar consecutivos correspondencia
   */
  public stepsParaSolicitarConsecutivo(): void {

    // se limpia el modelo por si hay registros anteriores
    this.cleanSteps();

    // se agregan los items para este submodulo
    this.agregarStep(LabelsConstant.NOMENCLATURA);
    this.agregarStep(LabelsConstant.ENTRADA_INFORMACION);
    this.agregarStep(LabelsConstant.CONFIRMACION);
    this.agregarStep(LabelsConstant.CONSECUTIVO);

    // se inicializa el model del componente
    this.init();
  }

  /**
   * Metodo que agrega los items para la transferencia
   * de consecutivo a otro usuario seleccionado
   */
  public stepsParaTransferirConsecutivo(): void {

    // se limpia el modelo por si hay registros anteriores
    this.cleanSteps();

    // se agregan los items para este submodulo
    this.agregarStep(LabelsConstant.SELECCION_USERS);
    this.agregarStep(LabelsConstant.CONFIRMACION);

    // se inicializa el model del componente
    this.init();
  }

  /**
   * Metodo que permite regresar un paso
   */
  public regresar(): void {
    this.activeIndex = this.activeIndex - 1;
  }

  /** Metodos para navegar entre los steps del componente */
  public irPrimerStep(spinnerState?: SpinnerState): void {
    this.ir(this.STEP_UNO, spinnerState);
  }

  public irSegundoStep(spinnerState?: SpinnerState): void {
    this.ir(this.STEP_DOS, spinnerState);
  }

  public irTercerStep(spinnerState?: SpinnerState): void {
    this.ir(this.STEP_TRES, spinnerState);
  }

  public irUltimoStep(spinnerState?: SpinnerState): void {
    this.ir(this.ulitmoIndex, spinnerState);
  }

  private ir(step: number, spinnerState?: SpinnerState): void {
    if (spinnerState) {
      spinnerState.displaySpinner();
      setTimeout(() => {
        spinnerState.hideSpinner();
        this.activeIndex = step;
      }, 100);
    } else {
      this.activeIndex = step;
    }
  }
}
