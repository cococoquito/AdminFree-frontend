import { Component, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../services/correspondencia.service';
import { FiltroConsecutivosState } from '../../../states/transversal/filtro-consecutivos.state';
import { SelectItemDTO } from '../../../dtos/transversal/select-item.dto';
import { CampoFiltroDTO } from '../../../dtos/correspondencia/campo-filtro.dto';
import { ItemDTO } from '../../../dtos/configuraciones/item.dto';
import { MessagesBackendConstant } from '../../../constants/messages-backend.constant';
import { MsjUtil } from '../../../util/messages.util';

/**
 * Componente para la visualizacion del panel de filtro de busqueda de consecutivos
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-filtro-consecutivos',
  templateUrl: './filtro-consecutivos.component.html',
  styleUrls: ['./filtro-consecutivos.component.css']
})
export class FiltroConsecutivosComponent {

  /** Es el usuario seleccionado para el filtro de busqueda */
  public usuarioFiltro: SelectItemDTO;

  /** Son todos los campos filtros consultados */
  public camposFiltroOrigen: Array<CampoFiltroDTO>;

  /** Son los campos filtros a visualizar en pantalla para ser agregados */
  public camposFiltro: Array<CampoFiltroDTO>;

  /** Es el filter ingresado para la busqueda por nombre del campo */
  public filterNombreCampo: string;

  /** Se utiliza para resetear la tabla campos filtros cuando hacen alguna busqueda*/
  @ViewChild('tblCamposFiltro') tblCamposFiltro: Table;

  /**
   * @param messageService, se utiliza para limpiar los errores
   * anteriores al momento de consultar los campos filtros
   *
   * @param correspondenciaService, se utiliza para consultar los campos filtros
   *
   * @param state, se utiliza para tomar y enviar los datos o
   * eventos de este componente a los componentes padre
   */
  constructor(
    private messageService: MessageService,
    private correspondenciaService: CorrespondenciaService,
    public state: FiltroConsecutivosState) {}

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
          this.messageService.add(MsjUtil.getMsjError(MessagesBackendConstant.INTERNAL_SERVER_ERROR));
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
      this.state.camposFiltroAgregados = null;

      // lista de identificadores de selecitems sin sus items
      let idsCampos: Array<number>;

      // se recorre cada campo en busqueda de los seleccionados
      for (const campo of this.camposFiltroOrigen) {

        // bandera que indica si este campo es seleccionado
        if (campo.isAgregado) {

          // se procede agregar este campo como seleccionado
          if (!this.state.camposFiltroAgregados) {
            this.state.camposFiltroAgregados = new Array<CampoFiltroDTO>();
          }
          this.state.camposFiltroAgregados.push(campo);

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
                for (const campo of this.state.camposFiltroAgregados) {

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
            this.messageService.add(MsjUtil.getMsjError(MessagesBackendConstant.INTERNAL_SERVER_ERROR));
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
}
