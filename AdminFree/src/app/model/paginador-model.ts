import { PaginadorDTO } from '../dtos/transversal/paginador-dto';
import { PaginadorResponseDTO } from '../dtos/transversal/paginador-response.dto';
import { PaginadorConstant } from '../constants/paginador-constant';

/**
 * Clase que contiene el modelo del paginador, se debe utilizar
 * esta clase para las consultas masivas del sistema que se
 * muestran en un p-table
 *
 * @author Carlos Andres Diaz
 */
export class PaginadorModel {

  /** son los registros a visualizar por pantalla*/
  public registros: any;

  /** son los datos del paginador*/
  public datos: PaginadorDTO;

  /** Es la instancia del componente que tiene el metodo filtrar para ser invocado */
  public listener: any;

  /** Es el nro de filas por paginas por default*/
  public rowsDefault: number;

  /** son las opciones para el tamanio de cada pagina (10,20,30,40,50)*/
  public rowsPerPageOptions: Array<number>;

  /**
   * @param listener , Es la instancia del componente que
   * tiene el metodo filtrar para ser invocado
   */
  constructor(listener: any) {

    // se configura el listener
    this.listener = listener;

    // se crea el DTO donde contiene los atributos del paginador
    this.initPaginadorDTO();

    // se configura la cantidad de filas por default
    this.rowsDefault = +PaginadorConstant.ROWS_PAGE_DEFAULT;

    // se configura las opciones que tiene el paginador
    this.rowsPerPageOptions = PaginadorConstant.ROWS_PER_PAGE_OPTIONS;
  }

  /**
   * Escuchador del scroller de la tabla asociada al paginador
   */
  public scrollerListener(event): void {

    // si el scrollerListener es invocado del this el event llega nulo
    let first;
    let rows;
    if (event) {
      first = event.first + '';
      rows = event.rows + '';
    } else {
      first = this.datos.skip;
      rows = this.datos.rowsPage;
    }

    // se hace llamado filtro de busqueda cuando pase alguno de los siguientes criterios
    // 1- cuando el usuario no seleccione la misma pagina
    // 2- cuando el usuario cambio el valor filas por paginas
    // 3- cuando la cantidadTotal es null por algun reinicio del filtro de busqueda
    if (this.datos.skip !== first ||
        this.datos.rowsPage !== rows ||
        this.datos.cantidadTotal === null) {

      // se configura el numero por paginas dado que puede llegar valores diferentes
      this.datos.rowsPage = rows;

      // se configura el skip para consultar paginado
      this.datos.skip = first;

      // se invoca el metodo paginar del listener
      this.listener.paginar();
    }
  }

  /**
   * Metodo que permite configurar lo registros consultados
   */
  public configurarRegistros(response: PaginadorResponseDTO): void {

    // se configura el total de registros solamente para la 1 invocacion
    if (!this.datos.cantidadTotal) {
        this.datos.cantidadTotal = response.cantidadTotal;
    }

    // se configura los registros consultados
    this.registros = response.registros;
  }

  /**
   * Metodo que soporta el evento click del boton filtrar
   *
   * @param table, tabla asociada al paginador
   */
  public filtrar(table: any): void {

    // dependiendo de lo que retorne el listener se reinicia el paginador
    if (this.listener.filtrar()) {

      // se reinicia p-table
      table.reset();

      // se reinicia los datos del paginador
      this.reiniciarDatos();
    }
  }

  /**
   * Metodo que permite reiniciar los datos del paginador
   */
  private reiniciarDatos(): void {

    // se reinicia los datos del paginador, esto con el fin para que sea de nuevo calculado
    this.datos.skip = PaginadorConstant.SKIP_DEFAULT;
    this.datos.cantidadTotal = null;

    // se limpia los registros consultado con anterioridad
    this.registros = null;

    // se ejecuta el paginador
    this.scrollerListener(null);
  }

  /**
   * Metodo que permite crear el DTO que contiene los datos del paginador
   */
  private initPaginadorDTO(): void {
    this.datos = new PaginadorDTO();
    this.datos.rowsPage = PaginadorConstant.ROWS_PAGE_DEFAULT;
    this.datos.skip = PaginadorConstant.SKIP_DEFAULT;
    this.datos.cantidadTotal = null;
  }
}
