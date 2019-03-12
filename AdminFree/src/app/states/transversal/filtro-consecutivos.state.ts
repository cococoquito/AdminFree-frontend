import { Injectable } from '@angular/core';
import { FiltroConsecutivosComponent } from '../../modules/shared/filtro-consecutivos/filtro-consecutivos.component';
import { FiltroConsecutivosDTO } from '../../dtos/correspondencia/filtro-consecutivos.dto';
import { SelectItemDTO } from '../../dtos/transversal/select-item.dto';
import { ClienteDTO } from '../../dtos/configuraciones/cliente.dto';
import { PaginadorModel } from '../../model/paginador-model';
import { TipoCamposConstant } from '../../constants/tipo-campos.constant';
import { EstadoConstant } from '../../constants/estado.constant';
import { LabelsConstant } from '../../constants/labels.constant';

/**
 * Estado para administrar los datos y eventos entre los componentes
 * padres y el componente filtro de busqueda de consecutivos
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class FiltroConsecutivosState {

  /** cliente autenticado o es el cliente asociado al usuario autenticado */
  public clienteCurrent: ClienteDTO;

  /** Es la instancia del componente padre que tiene los metodos de filtrar y refrescar */
  public componentePadre: any;

  /** Es la instancia del componente filtro que tiene los metodos para que el padre los invoque */
  public componenteFiltro: FiltroConsecutivosComponent;

  /** Paginador model de los consecutivos solicitados */
  public consecutivosPaginados: PaginadorModel;

  /** Se utiliza para encapsular los filtros de busqueda ingresados, lo utiliza el componente padre */
  public filtros: FiltroConsecutivosDTO;

  /** Se utiliza para validar si hay nuevos filtros, lo utiliza el componente padre al refrescar */
  public filtrosClone: FiltroConsecutivosDTO;

  /** si esta lista es nula no se mostrara el filtro de busqueda por usuarios en el componente filtro */
  public usuarios: Array<SelectItemDTO>;

  /** Los meses de la fecha de solicitud se debe mostrar solamente de acuerdo el submodulo ingresado */
  public minDateSolicitudFilter: Date;
  public maxDateSolicitudFilter: Date;

  /** constante para el idioma espaniol para los calendar */
  public CALENDAR_SPANISH = LabelsConstant.CALENDAR_SPANISH;

  /** identificadores de cada tipo de campo */
  public ID_CAMPO_TEXTO = TipoCamposConstant.ID_CAMPO_TEXTO;
  public ID_LISTA_DESPLEGABLE = TipoCamposConstant.ID_LISTA_DESPLEGABLE;
  public ID_CAMPO_FECHA = TipoCamposConstant.ID_CAMPO_FECHA;

  /** Constantes que representan los identificadores de ACTIVO - ANULADO */
  public ID_ACTIVO = EstadoConstant.ID_ACTIVO;
  public ID_ANULADO = EstadoConstant.ID_ANULADO;

  /**
   * Este metodo se debe invocar por los componentes PADRES para enviar los valores
   * iniciales que son necesarios para que el filtro de busqueda funcione correctamente
   *
   * @param componentePadre, es la instancia del componente padre para invocar sus metodos
   * @param clienteCurrent, es el usuario o admin autenticado
   * @param consecutivosPaginados, paginador de los consecutivos consultados
   * @param usuarios, lista de usuarios para ser visualizado en el SELECT
   * @param minDateSolicitudFilter, se utiliza para restringir los meses o anios en la fecha solicitud
   * @param maxDateSolicitudFilter, se utiliza para restringir los meses o anios en la fecha solicitud
   */
  public initComponentePadre(
    componentePadre: any,
    clienteCurrent: ClienteDTO,
    consecutivosPaginados: PaginadorModel,
    usuarios: Array<SelectItemDTO>,
    minDateSolicitudFilter: Date,
    maxDateSolicitudFilter: Date): void {

    // se configura los parametros
    this.componentePadre = componentePadre;
    this.clienteCurrent = clienteCurrent;
    this.consecutivosPaginados = consecutivosPaginados;
    this.usuarios = usuarios;
    this.minDateSolicitudFilter = minDateSolicitudFilter;
    this.maxDateSolicitudFilter = maxDateSolicitudFilter;
  }

  /**
   * Este metodo se debe invocar por el componente FILTRO para enviar los valores
   * iniciales que son necesarios para los componentes PADRES
   *
   * @param componenteFiltro, es la instancia del componente filtro para invocar sus metodos
   * @param filtros, contiene los datos de los filtros ingresados
   * @param filtrosClone, es el clone de los datos filtros ingresados
   */
  public initComponenteFiltro(
    componenteFiltro: FiltroConsecutivosComponent,
    filtros: FiltroConsecutivosDTO,
    filtrosClone: FiltroConsecutivosDTO) {

    // se configura los parametros
    this.componenteFiltro = componenteFiltro;
    this.filtros = filtros;
    this.filtrosClone = filtrosClone;
  }
}
