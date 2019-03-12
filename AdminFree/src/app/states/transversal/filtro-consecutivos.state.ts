import { Injectable } from '@angular/core';
import { FiltroConsecutivosDTO } from '../../dtos/correspondencia/filtro-consecutivos.dto';
import { SelectItemDTO } from '../../dtos/transversal/select-item.dto';
import { CampoFiltroDTO } from '../../dtos/correspondencia/campo-filtro.dto';
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

  /** Es la instancia del componente que tiene los metodos de filtrar y refrescar */
  public listener: any;

  /** Paginador model de los consecutivos solicitados */
  public consecutivosPaginados: PaginadorModel;

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
   * Metodo que permite configurar las variables globales necesarias
   * para iniciar el componente filtro de busqueda
   *
   * @param listener, es la instancia del componente padre para invocar sus metodos
   * @param usuarios, lista usuarios para ser visualizado en el SELECT
   * @param minDateSolicitudFilter, se utiliza para restringir los meses o anios en la fecha solicitud
   * @param maxDateSolicitudFilter, se utiliza para restringir los meses o anios en la fecha solicitud
   */
  public init(
    listener: any,
    usuarios: Array<SelectItemDTO>,
    minDateSolicitudFilter: Date,
    maxDateSolicitudFilter: Date): void {

    // se configura los parametros
    this.listener = listener;
    this.usuarios = usuarios;
    this.minDateSolicitudFilter = minDateSolicitudFilter;
    this.maxDateSolicitudFilter = maxDateSolicitudFilter;

    // se configura los filtros de busqueda
    this.filtros = new FiltroConsecutivosDTO();
    this.filtros.idCliente = this.clienteCurrent.id;

    // se debe inicializar el clone con los mismos datos del filtro
    this.filtrosClone = JSON.parse(JSON.stringify(this.filtros));
  }

  /**
   * Metodo que permite clonar los datos del filtro de busqueda
   */
  public clonarFiltro(): void {

    // solo aplica si hay instancia del filtro principal
    this.filtrosClone = null;
    if (this.filtros) {
      this.filtrosClone = new FiltroConsecutivosDTO();

      // filtros generales
      this.filtrosClone.idCliente = this.filtros.idCliente;
      this.filtrosClone.nomenclaturas = this.filtros.nomenclaturas;
      this.filtrosClone.consecutivos = this.filtros.consecutivos;
      this.filtrosClone.idUsuario = this.filtros.idUsuario;
      this.filtrosClone.fechaSolicitudInicial = this.filtros.fechaSolicitudInicial;
      this.filtrosClone.fechaSolicitudFinal = this.filtros.fechaSolicitudFinal;
      this.filtrosClone.estado = this.filtros.estado;

      // filtros agregados
      if (this.filtros.filtrosAgregados) {
        this.filtrosClone.filtrosAgregados = new Array<CampoFiltroDTO>();
        for (const campo of this.filtros.filtrosAgregados) {
          const campoClone = new CampoFiltroDTO();
          campoClone.idCampo = campo.idCampo;
          campoClone.tipoCampo = campo.tipoCampo;
          campoClone.inputValue = campo.inputValue;
          campoClone.dateInicial = campo.dateInicial;
          campoClone.dateFinal = campo.dateFinal;
          this.filtrosClone.filtrosAgregados.push(campoClone);
        }
      }
    }
  }
}
