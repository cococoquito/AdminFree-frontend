import { Injectable } from '@angular/core';
import { FiltroConsecutivosDTO } from '../../dtos/correspondencia/filtro-consecutivos.dto';
import { SelectItemDTO } from '../../dtos/transversal/select-item.dto';
import { CampoFiltroDTO } from '../../dtos/correspondencia/campo-filtro.dto';
import { ClienteDTO } from '../../dtos/configuraciones/cliente.dto';
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

  /** Es la instancia del componente que tiene los metodos de filtrar y refrescar */
  public listener: any;

  /** Se utiliza para encapsular los filtros de busqueda ingresados */
  public filtros: FiltroConsecutivosDTO;

  /** Se utiliza para validar si hay nuevos filtros cuando se consultan los consecutivos */
  public filtrosClone: FiltroConsecutivosDTO;

  /** Se utiliza para pintar el asterisco en el boton filtrar */
  public hayFiltroAplicado: boolean;

  /** si esta lista es nula no se mostrara el filtro de busqueda por usuarios */
  public usuarios: Array<SelectItemDTO>;

  /** Los meses de la fecha de solicitud se debe mostrar solamente de acuerdo el submodulo ingresado */
  public minDateSolicitudFilter: Date;
  public maxDateSolicitudFilter: Date;

  /** Son los campos filtros agregados */
  public camposFiltroAgregados: Array<CampoFiltroDTO>;

  /** cantidad total de los consecutivos consultados */
  public cantidadTotal: number;

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
   * Metodo que permite iniciar el state, creando los filtros
   * de busqueda dado que este DTO es requerido para el componente
   */
  public init(clienteCurrent: ClienteDTO): void {

    // se configura el cliente autenticado
    this.clienteCurrent = clienteCurrent;

    // se configura los filtros de busqueda
    this.filtros = new FiltroConsecutivosDTO();
    this.filtros.idCliente = this.clienteCurrent.id;

    // se debe inicializar el clone con los mismos datos del filtro
    this.filtrosClone = JSON.parse(JSON.stringify(this.filtros));
  }
}
