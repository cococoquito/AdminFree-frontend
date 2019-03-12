import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { FiltroConsecutivosState } from '../../../states/transversal/filtro-consecutivos.state';
import { CommonComponent } from '../../../util/common.component';
import { FiltroConsecutivosDTO } from './../../../dtos/correspondencia/filtro-consecutivos.dto';
import { SelectItemDTO } from '../../../dtos/transversal/select-item.dto';
import { CampoFiltroDTO } from '../../../dtos/correspondencia/campo-filtro.dto';
import { ItemDTO } from '../../../dtos/configuraciones/item.dto';
import { MsjUtil } from '../../../util/messages.util';
import { FechaUtil } from '../../../util/fecha-util';
import { MsjFrontConstant } from '../../../constants/messages-frontend.constant';

/**
 * Componente para la visualizacion del panel que contiene
 * los filtros de busqueda de consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-filtro-consecutivos',
  templateUrl: './filtro-consecutivos.component.html',
  styleUrls: ['./filtro-consecutivos.component.css']
})
export class FiltroConsecutivosComponent extends CommonComponent implements OnInit {

  /** Son todos los campos filtros consultados */
  public camposFiltroOrigen: Array<CampoFiltroDTO>;

  /** Son los campos filtros a visualizar en pantalla para ser agregados */
  public camposFiltro: Array<CampoFiltroDTO>;

  /** Son los campos filtros agregados */
  public camposFiltroAgregados: Array<CampoFiltroDTO>;

  /** Es el usuario seleccionado para el filtro de busqueda */
  public usuarioFiltro: SelectItemDTO;

  /** Es el filter ingresado para la busqueda por nombre del campo */
  public filterNombreCampo: string;

  /** Se utiliza para pintar el asterisco en el boton filtrar */
  public hayFiltroAplicado: boolean;

  /** Se utiliza para resetear la tabla campos filtros cuando hacen alguna busqueda*/
  @ViewChild('tblCamposFiltro') tblCamposFiltro: Table;

  /**
   * @param messageService, se utiliza para limpiar los errores
   * anteriores al momento de consultar los campos filtros
   *
   * @param correspondenciaService, se utiliza para consultar los campos filtros
   *
   * @param state, se utiliza como mediador para administrar los datos
   * o llamados de metodos entre este filtro y el componente padre
   */
  constructor(
    protected messageService: MessageService,
    private correspondenciaService: CorrespondenciaService,
    public state: FiltroConsecutivosState) {
    super();
  }

  /**
   * Se inicializa los atributos del state para el filtro busqueda
   */
  ngOnInit() {

    // debe existir la instancia del filtro para el funcionamiento correcto
    const filtros = new FiltroConsecutivosDTO();
    filtros.idCliente = this.state.clienteCurrent.id;

    // se debe inicializar el clone con los mismos datos del filtro
    const filtrosClone = JSON.parse(JSON.stringify(filtros));

    // se inicializa el state del componente filtro busqueda
    this.state.initComponenteFiltro(this, filtros, filtrosClone);
  }

  /**
   * Metodo que soporta el evento click del boton filtrar
   */
  public filtrar(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se procede a organizar los criterios de busqueda ingresado
    this.orgarnizarFiltro();

    // solo se invoca si hay algun criterio de busqueda ingresado
    if (this.isNuevoFilter()) {
      this.state.componentePadre.filtrar();
    }
  }

  /**
   * Metodo que es invocado despues de que el filtro de busqueda
   * se ejecute exitosamente por el componente PADRE
   */
  public filtroExitoso(): void {

    // se limpia la bandera que indica que si hay filtro aplicado
    this.hayFiltroAplicado = false;

    // se configura la bandera 'isFiltroAplicado=false' para los filtros AGREGADOS
    if (this.camposFiltroAgregados && this.camposFiltroAgregados.length > 0) {
      for (const campo of this.camposFiltroAgregados) {
        campo.isFiltroAplicado = false;
      }
    }

    // se configura la bandera 'isFiltroAplicado=true' para los filtros ENVIADOS
    if (this.state.filtros.filtrosAgregados && this.state.filtros.filtrosAgregados.length > 0) {
      for (const agregado of this.state.filtros.filtrosAgregados) {
        agregado.isFiltroAplicado = true;
        this.hayFiltroAplicado = true;
      }
    }

    // se debe clonar los filtros asi evitar solicitudes si no hay nuevos criterios
    this.clonarFiltro();

    // si no hay filtro aplicado se verifica en los filtros generales
    if (!this.hayFiltroAplicado) {

      // se verifica en los filros generales
      if (this.state.filtrosClone.consecutivos ||
          this.state.filtrosClone.nomenclaturas ||
          this.state.filtrosClone.idUsuario ||
          this.state.filtrosClone.fechaSolicitudInicial ||
          this.state.filtrosClone.fechaSolicitudFinal ||
          this.state.filtrosClone.estado) {
          this.hayFiltroAplicado = true;
      }
    }
  }

  /**
   * Metodo que permite soportar el evento click del boton agregar filtro
   *
   * @param event, evento ejecutado desde el navegador, se utiliza para abrir o cerrar el modal
   * @param actualTarget, es el div donde apuntara el modal para ser posicionado
   * @param overlaypanel, es la referencia del modal para abrir o cerrarlo
   */
  public showModalAgregarFiltro(event, actualTarget, overlaypanel: OverlayPanel): void {

    // se valida si se debe consultar los campos filtros
    if (!this.camposFiltroOrigen || this.camposFiltroOrigen.length === 0) {

      // se limpia los mensajes anteriores
      this.messageService.clear();

      // se invoca el servicio para consultar los campos filtro
      this.correspondenciaService.getCamposFiltro(this.state.clienteCurrent.id).subscribe(
        data => {
          // se configura los campos
          this.camposFiltroOrigen = data;
          this.camposFiltro = data;

          // se procede abrir el modal
          overlaypanel.toggle(event, actualTarget);
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    } else {
      // se procede abrir o cerrar el modal
      overlaypanel.toggle(event, actualTarget);
    }
  }

  /**
   * Metodo que es invocado cuando cierran el modal de agregar filtro
   */
  public hideModalAgregarFiltro(): void {

    // se valida que si existan campos parametrizados
    if (this.camposFiltroOrigen && this.camposFiltroOrigen.length > 0) {

      // se limpia los campos agregados
      this.camposFiltroAgregados = null;

      // lista de identificadores de selecitems sin sus items
      let idsCampos: Array<number>;

      // se recorre cada campo en busqueda de los seleccionados
      for (const campo of this.camposFiltroOrigen) {

        // bandera que indica si este campo es seleccionado
        if (campo.isAgregado) {

          // se procede agregar este campo como seleccionado
          if (!this.camposFiltroAgregados) {
            this.camposFiltroAgregados = new Array<CampoFiltroDTO>();
          }
          this.camposFiltroAgregados.push(campo);

          // se verifica si este campo es un selectitems sin sus items
          if (this.state.ID_LISTA_DESPLEGABLE === campo.tipoCampo && (!campo.items || campo.items.length === 0)) {

            // se agrega este selectitem para consultar sus items
            if (!idsCampos) {
              idsCampos = new Array<number>();
            }
            idsCampos.push(campo.idCampo);
          }
        }
      }

      // si hay identificadores de selecitems sin items se procede a consultarlos
      if (idsCampos && idsCampos.length > 0) {

        // se invoca el servicio para obtener sus items
        this.correspondenciaService.getItemsSelectFiltro(idsCampos).subscribe(
          items => {
            // aplica si hay items consultados
            if (items && items.length > 0) {

              // se recorre cada item para buscar su dueño
              for (const item of items) {

                // se busca el selectitem que le pertenece a este item
                for (const campo of this.camposFiltroAgregados) {

                  // si es el mismo id campo se procede agregarlo
                  if (item.idCampo === campo.idCampo) {
                    if (!campo.items) {
                      campo.items = new Array<ItemDTO>();
                    }
                    campo.items.push(item);
                    break;
                  }
                }
              }
            }
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    }
  }

  /**
   * Metodo que permite soportar el evento filter por nombre del campo
   */
  public busquedaNombreCampo(): void {

    // el valor del filtro no puede ser indefinido
    if (this.filterNombreCampo && this.filterNombreCampo.length > 0) {

      // se crea la instancia de la lista de campos filtro
      this.camposFiltro = new Array<CampoFiltroDTO>();

      // se busca el campo que coincide con el valor
      for (const campo of this.camposFiltroOrigen) {
        if (campo.nombreCampo &&
            campo.nombreCampo.toUpperCase().includes(this.filterNombreCampo.toUpperCase())) {
            this.camposFiltro.push(campo);
        }
      }
    } else {
      this.camposFiltro = this.camposFiltroOrigen;
    }

    // se refresca la tabla de campos para ser agregados
    this.tblCamposFiltro.reset();
  }

  /**
   * Metodo que permite clonar los datos del filtro de busqueda
   */
  private clonarFiltro(): void {

    // solo aplica si hay instancia del filtro principal
    this.state.filtrosClone = null;
    if (this.state.filtros) {
      this.state.filtrosClone = new FiltroConsecutivosDTO();

      // filtros generales
      this.state.filtrosClone.idCliente = this.state.filtros.idCliente;
      this.state.filtrosClone.nomenclaturas = this.state.filtros.nomenclaturas;
      this.state.filtrosClone.consecutivos = this.state.filtros.consecutivos;
      this.state.filtrosClone.idUsuario = this.state.filtros.idUsuario;
      this.state.filtrosClone.fechaSolicitudInicial = this.state.filtros.fechaSolicitudInicial;
      this.state.filtrosClone.fechaSolicitudFinal = this.state.filtros.fechaSolicitudFinal;
      this.state.filtrosClone.estado = this.state.filtros.estado;

      // filtros agregados
      if (this.state.filtros.filtrosAgregados) {
        this.state.filtrosClone.filtrosAgregados = new Array<CampoFiltroDTO>();
        for (const campo of this.state.filtros.filtrosAgregados) {
          const campoClone = new CampoFiltroDTO();
          campoClone.idCampo = campo.idCampo;
          campoClone.tipoCampo = campo.tipoCampo;
          campoClone.inputValue = campo.inputValue;
          campoClone.dateInicial = campo.dateInicial;
          campoClone.dateFinal = campo.dateFinal;
          this.state.filtrosClone.filtrosAgregados.push(campoClone);
        }
      }
    }
  }

  /**
   * Metodo que permite organizar los criterios de busqueda
   */
  private orgarnizarFiltro(): void {

    // se configura el usuario seleccionado para el filtro busqueda
    this.state.filtros.idUsuario = this.usuarioFiltro ? this.usuarioFiltro.id : null;

    // se eliminan los espacios para los campos tipo input
    this.state.filtros.consecutivos = this.setTrimFilter(this.state.filtros.consecutivos);
    this.state.filtros.nomenclaturas = this.setTrimFilter(this.state.filtros.nomenclaturas);

    // se procede a organizar los campos filtros agregados
    this.state.filtros.filtrosAgregados = null;
    if (this.camposFiltroAgregados && this.camposFiltroAgregados.length > 0) {

      // se crea la instancia para limpiar el filtro anterior enviado
      this.state.filtros.filtrosAgregados = new Array<CampoFiltroDTO>();

      // se recorre cada filtro agregado
      for (const campo of this.camposFiltroAgregados) {

        // si este campo fue seleccionado
        if (campo.isAgregado) {

          // se valida el tipo de campo
          switch (campo.tipoCampo) {

            // para campo de texto el valor no puede ser vacio ni nulo
            case this.state.ID_CAMPO_TEXTO: {
              campo.inputValue = this.setTrimFilter(campo.inputValue);
              if (campo.inputValue) {
                this.state.filtros.filtrosAgregados.push(campo);
              }
              break;
            }

            // para la lista desplegable debe existir el item seleccionado
            case this.state.ID_LISTA_DESPLEGABLE: {
              campo.inputValue = null;
              if (campo.itemSeleccionado) {
                campo.inputValue = campo.itemSeleccionado.id;
                this.state.filtros.filtrosAgregados.push(campo);
              }
              break;
            }

            // para la fecha debe existir alguno de las dos fechas (inicio-final)
            case this.state.ID_CAMPO_FECHA: {
              if (campo.dateInicial || campo.dateFinal) {
                this.state.filtros.filtrosAgregados.push(campo);
              }
              break;
            }
          }
        }
      }
    }
  }

  /**
   * Metodo que valida si ingresaron un nuevo filtro busqueda
   */
  private isNuevoFilter(): boolean {

    // La fecha inicial debe ser mayor que la fecha final solicitud
    const fechaSolicitudInicial = this.state.filtros.fechaSolicitudInicial;
    const fechaSolicitudFinal = this.state.filtros.fechaSolicitudFinal;
    if (fechaSolicitudInicial && fechaSolicitudFinal) {
      if (FechaUtil.compareDate(fechaSolicitudInicial, fechaSolicitudFinal) === 1) {
        this.messageService.add(MsjUtil.getToastErrorLng(MsjFrontConstant.FECHA_INICIAL_MAYOR));
        return false;
      }
    }

    // se valida cada criterio con el clone del filtro
    if (this.state.filtrosClone.consecutivos !== this.state.filtros.consecutivos ||
        this.state.filtrosClone.nomenclaturas !== this.state.filtros.nomenclaturas ||
        this.state.filtrosClone.idUsuario !== this.state.filtros.idUsuario ||
        this.state.filtrosClone.estado !== this.state.filtros.estado ||
        !FechaUtil.iqualsDateFilter(this.state.filtrosClone.fechaSolicitudInicial, fechaSolicitudInicial) ||
        !FechaUtil.iqualsDateFilter(this.state.filtrosClone.fechaSolicitudFinal, fechaSolicitudFinal)) {
        return true;
    }

    // se procede a validar si hay filtros agregados
    let isNuevoFiltroAgregado = true;

    // es la cantidad de filtros clone agregados
    let cantidadFiltrosClone = 0;
    if (this.state.filtrosClone.filtrosAgregados) {
      cantidadFiltrosClone = this.state.filtrosClone.filtrosAgregados.length;
    }

    // es la cantidad de filtros agregados
    let cantidadFiltros = 0;
    if (this.state.filtros.filtrosAgregados) {
      cantidadFiltros = this.state.filtros.filtrosAgregados.length;
    }

    // si son diferentes es porque hay modificaciones
    if (cantidadFiltrosClone === cantidadFiltros) {
      isNuevoFiltroAgregado = false;

      // solo aplica si ingresaron algun filtro
      if (cantidadFiltrosClone > 0) {

        // se recorre los filtros ingresados
        forMain:
        for (const campo of this.state.filtros.filtrosAgregados) {
          let campoExiste = false;

          // se recorre los filtros que tiene el clone
          for (const campoClone of this.state.filtrosClone.filtrosAgregados) {

            // se valida si los campos son iguales
            if (campo.idCampo === campoClone.idCampo) {
              campoExiste = true;

              // se valida el valor de los campos si hay alguna modificacion
              if (this.state.ID_CAMPO_TEXTO === campo.tipoCampo || this.state.ID_LISTA_DESPLEGABLE === campo.tipoCampo) {
                if (campo.inputValue !== campoClone.inputValue) {
                    isNuevoFiltroAgregado = true;
                    break forMain;
                }
              } else if (this.state.ID_CAMPO_FECHA === campo.tipoCampo) {
                if (!FechaUtil.iqualsDateFilter(campoClone.dateInicial, campo.dateInicial) ||
                    !FechaUtil.iqualsDateFilter(campoClone.dateFinal, campo.dateFinal)) {
                    isNuevoFiltroAgregado = true;
                    break forMain;
                }
              }
            }
          }

          // si el campo no existe y porque hay un nuevo filtro
          if (!campoExiste) {
            isNuevoFiltroAgregado = true;
            break;
          }
        }
      }
    }

    // se retorna la bandera que indica que si hay nuevo filtro agregado
    return isNuevoFiltroAgregado;
  }
}
