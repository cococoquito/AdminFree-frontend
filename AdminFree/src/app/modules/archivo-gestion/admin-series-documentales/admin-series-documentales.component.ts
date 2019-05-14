import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ArchivoGestionService } from '../../../services/archivo-gestion.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { SpinnerState } from '../../../states/spinner.state';
import { PaginadorModel } from '../../../model/paginador-model';
import { AutoCompleteModel } from '../../../model/auto-complete.model';
import { Documental } from '../../../dtos/archivogestion/documental';
import { SerieDocumentalDTO } from '../../../dtos/archivogestion/serie-documental.dto';
import { SubSerieDocumentalDTO } from '../../../dtos/archivogestion/sub-serie-documental.dto';
import { FiltroSerieDocumentalDTO } from '../../../dtos/archivogestion/filtro-serie-documental.dto';
import { ClienteDTO } from '../../../dtos/configuraciones/cliente.dto';
import { TipoDocumentalDTO } from '../../../dtos/archivogestion/tipo-documental.dto';
import { WelcomeDTO } from '../../../dtos/seguridad/welcome.dto';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from '../../../util/messages.util';
import { RegexUtil } from '../../../util/regex-util';
import { LabelsConstant } from '../../../constants/labels.constant';
import { MsjFrontConstant } from '../../../constants/messages-frontend.constant';
import { TipoEventoConstant } from '../../../constants/tipo-evento.constant';

/**
 * Componente para la administracion de las series documentales
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './admin-series-documentales.component.html',
  styleUrls: ['./admin-series-documentales.component.css'],
  providers: [ ArchivoGestionService ]
})
export class AdminSeriesDocumentalesComponent extends CommonComponent implements OnInit, OnDestroy {

  /** Cliente autenticado o es el cliente asociado al usuario */
  private clienteCurrent: ClienteDTO;

  /** Paginador de la lista de series documentales parametrizados en el sistema */
  public seriesPaginados: PaginadorModel;

  /** Modelo para el autocomplete de los tipos documentales asociados al cliente */
  public tiposDocModel: AutoCompleteModel;

  /** DTO donde se encapsula los valores del filtro de busqueda */
  public filtro: FiltroSerieDocumentalDTO;

  /** Contiene los valores del filtro consultado */
  public filtroClone: FiltroSerieDocumentalDTO;

  /** Se utiliza para pintar el asterisco en el boton filtrar */
  public hayFiltroAplicado: boolean;

  /** Se utiliza para expandir las filas de cada serie asi visualizar las subseries*/
  public expandAllSeries;

  /** Variable que se utiliza para crear/editar la serie/subserie */
  public serieSubserieCU: Documental;

  /** Variable que contiene los valores origen de la serie/subserie a editar */
  public serieSubserieEditarOrigen: Documental;

  /** Es la serie propietaria de la subserie a crear/editar, ojo se debe coloca aca */
  public seriePropietaria: SerieDocumentalDTO;

  /** Bandera que indica si es una serie documental al momento de crear/editar */
  public esSerieDocumental: boolean;

  /** Se utiliza para validar los valores de los inputs solo numerico*/
  public regex: RegexUtil;

  /** Indica si debe consultar nuevamente las series cuando se salen del panel de creacion*/
  private hayNuevasSeries: boolean;

  /** Indica si debe consultar las subseries asociadas a la serie cuando se salen del panel de creacion*/
  private hayNuevasSubSeries: boolean;

  /** Es la posicion del scroll para administrarlo en diferentes procesos */
  private positionScroll: number;

  /** Se utiliza para resetear la tabla de series cuando aplican un filtro*/
  @ViewChild('tblseries') private tblseries: Table;

  /** Se utiliza para fijar el focus del autocomplete tipos documentales*/
  @ViewChild('autotiposdocs') private autoTiposDocs: any;

  /** Se utiliza para fijar el focus del codigo al crear una serie/subserie*/
  @ViewChild('incodigo') private inCodigo: ElementRef;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para mostrar el
   * modal de confirmacion para diferente procesos
   *
   * @param archivoGestionService, se utiliza para consumir
   * los servicios relacionados a este proceso negocio
   *
   * @param shellState, se utiliza para el titulo del componente
   *
   * @param spinnerState, se utiliza para simular el spinner
   */
  constructor(
    protected messageService: MessageService,
    private confirmationService: ConfirmationService,
    private archivoGestionService: ArchivoGestionService,
    private shellState: ShellState,
    private spinnerState: SpinnerState) {
    super();
  }

  /**
   * Se debe consultar las series documentales parametrizado en el sistema
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Se utiliza para limpiar los mensajes visualizados pantalla
   */
  ngOnDestroy(): void {
    this.messageService.clear();
  }

  /**
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a consultar las
   * series documentales y configuracion de los titulos
   */
  private init(): void {

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = LabelsConstant.TITLE_ADMIN_SERIES_DOCUMENTALES;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_ADMIN_SERIES_DOCUMENTALES;

    // se procede a obtener el cliente autenticado
    this.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // se consulta los datos iniciales para este submodulo
    this.getInitAdminSeriesDocumentales(false);
  }

  /**
   * Metodo que soporta el evento click del boton crear serie documental
   */
  public crearSerieDocumental(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se verifica si los campos son validos
    if (this.isCamposIngresoValidos()) {

      // se muestra la ventana de confirmacion
      this.confirmationService.confirm({
        message: MsjFrontConstant.CREAR_SERIE_SUBSERIE.replace('?1', 'Serie'),
        header: MsjFrontConstant.CONFIRMACION,
        accept: () => {

          // se procede a crear la serie documental
          this.serieSubserieCU.idCliente = this.clienteCurrent.id;
          this.serieSubserieCU.tipoEvento = TipoEventoConstant.CREAR;
          this.setUsuarioCreacion();
          this.archivoGestionService.administrarSerieDocumental(this.serieSubserieCU as SerieDocumentalDTO).subscribe(
            data => {
              // Mensaje exitoso, serie documental fue creado
              this.messageService.add(MsjUtil.getToastSuccessLng(MsjFrontConstant.SERIE_SUBSERIE_CREADA.replace('?1', 'Serie')));

              // se reinicia la variable permitiendo crear otra serie documental
              this.serieSubserieCU = new SerieDocumentalDTO();

              // se configura los nuevos tipos documentales en el modelo
              this.setNuevosTiposDocumentales(data);

              // indica que se debe consultar las series cuando se salen del panel de creacion
              this.hayNuevasSeries = true;

              // se fija el focus en el codigo
              this.inCodigo.nativeElement.focus();

              // se posiciona el scroll en la parte superior
              this.shellState.contentComponent.setPositionScroll(0);
            },
            error => {
              const msj = this.showMensajeError(error);
              this.messageService.add(MsjUtil.getMsjError(msj));
              this.messageService.add(MsjUtil.getToastErrorLng(msj));
            }
          );
        }
      });
    } else {
      this.messageService.add(MsjUtil.getToastErrorLng(MsjFrontConstant.ADMIN_SERIES_ERROR_CAMPOS));
    }
  }

  /**
   * Metodo que soporta el evento click del boton crear subserie documental
   */
  public crearSubserieDocumental(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se verifica si los campos son validos
    if (this.isCamposIngresoValidos()) {

      // se muestra la ventana de confirmacion
      this.confirmationService.confirm({
        message: MsjFrontConstant.CREAR_SERIE_SUBSERIE.replace('?1', 'Subserie'),
        header: MsjFrontConstant.CONFIRMACION,
        accept: () => {

          // se procede a crear la subserie documental
          const nuevaSubSerie: SubSerieDocumentalDTO = (this.serieSubserieCU as SubSerieDocumentalDTO);
          nuevaSubSerie.idCliente = this.clienteCurrent.id;
          nuevaSubSerie.tipoEvento = TipoEventoConstant.CREAR;
          nuevaSubSerie.idSerie = this.seriePropietaria.idSerie;
          this.setUsuarioCreacion();
          this.archivoGestionService.administrarSubSerieDocumental(nuevaSubSerie).subscribe(
            data => {
              // Mensaje exitoso, subserie documental fue creado
              this.messageService.add(MsjUtil.getToastSuccessLng(MsjFrontConstant.SERIE_SUBSERIE_CREADA.replace('?1', 'Subserie')));

              // se reinicia la variable permitiendo crear otra subserie documental
              this.serieSubserieCU = new SubSerieDocumentalDTO();

              // se configura los nuevos tipos documentales en el modelo
              this.setNuevosTiposDocumentales(data);

              // indica que se debe consultar las subseries cuando se salen del panel de creacion
              this.hayNuevasSubSeries = true;

              // se fija el focus en el codigo
              this.inCodigo.nativeElement.focus();

              // se posiciona el scroll en la parte superior
              this.shellState.contentComponent.setPositionScroll(0);
            },
            error => {
              const msj = this.showMensajeError(error);
              this.messageService.add(MsjUtil.getMsjError(msj));
              this.messageService.add(MsjUtil.getToastErrorLng(msj));
            }
          );
        }
      });
    } else {
      this.messageService.add(MsjUtil.getToastErrorLng(MsjFrontConstant.ADMIN_SERIES_ERROR_CAMPOS));
    }
  }

  /**
   * Metodo que es invocado por el paginador de la tabla
   */
  public paginar(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se configura el paginador dado que puede cambiar el skip o rowsperpage
    this.filtroClone.paginador = this.seriesPaginados.datos;

    // se procede a consultar las series documentales
    this.archivoGestionService.getSeriesDocumentales(this.filtroClone).subscribe(
      data => {
        this.seriesPaginados.configurarRegistros(data);
        this.expandRowsSeries();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite soportar el evento click del boton filtrar
   */
  public filtrar(): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se eliminan los espacios
    this.filtro.codigoSerieDocumental = this.setTrimFilter(this.filtro.codigoSerieDocumental);
    this.filtro.nombreSerieDocumental = this.setTrimFilter(this.filtro.nombreSerieDocumental);
    this.filtro.codigoSubSerieDocumental = this.setTrimFilter(this.filtro.codigoSubSerieDocumental);
    this.filtro.nombreSubSerieDocumental = this.setTrimFilter(this.filtro.nombreSubSerieDocumental);

    // se valida cada criterio con el clone del filtro
    if (this.filtro.codigoSerieDocumental !== this.filtroClone.codigoSerieDocumental ||
      this.filtro.nombreSerieDocumental !== this.filtroClone.nombreSerieDocumental ||
      this.filtro.codigoSubSerieDocumental !== this.filtroClone.codigoSubSerieDocumental ||
      this.filtro.nombreSubSerieDocumental !== this.filtroClone.nombreSubSerieDocumental) {

      // se hace el backup de los datos del paginador esto por si hay errores
      this.filtro.paginador = this.seriesPaginados.filtroBefore();

      // se procede a consultar las series documentales
      this.archivoGestionService.getSeriesDocumentales(this.filtro).subscribe(
        data => {
          // se configura los nuevas series consultadas
          this.seriesPaginados.filtroExitoso(this.tblseries, data);

          // se debe clonar los filtros asi evitar solicitudes si no hay nuevos criterios
          this.filtroClone = JSON.parse(JSON.stringify(this.filtro));

          // se verifica si hay algun filtro aplicado
          this.hayFiltroAplicado = false;
          if (this.filtroClone.codigoSerieDocumental ||
            this.filtroClone.nombreSerieDocumental ||
            this.filtroClone.codigoSubSerieDocumental ||
            this.filtroClone.nombreSubSerieDocumental) {
            this.hayFiltroAplicado = true;
          }

          // se procede a expandir todas las filas de las series
          this.expandRowsSeries();
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    }
  }

  /**
   * Metodo que permite soportar el evento click del boton eliminar serie documental
   */
  public eliminarSerie(serie: SerieDocumentalDTO): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.ELIMINAR_SERIE_SUBSERIE
        .replace('?1', 'Serie')
        .replace('?2', serie.nombre)
        .replace('?3', 'text-uppercase'),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se construye el request necesario para la eliminacion
        const request = new SerieDocumentalDTO();
        request.idSerie = serie.idSerie;
        request.tipoEvento = TipoEventoConstant.ELIMINAR;
        this.filtroClone.paginador = this.seriesPaginados.filtroBefore();
        request.filtro = this.filtroClone;

        // se procede a eliminar la serie
        this.archivoGestionService.administrarSerieDocumental(request).subscribe(
          data => {
            // Mensaje exitoso, serie documental fue eliminado
            this.messageService.add(MsjUtil.getToastSuccessMedium(MsjFrontConstant.SERIE_SUBSERIE_ELIMINADA.replace('?1', 'Serie')));

            // se configura los nuevas series consultadas
            this.seriesPaginados.filtroExitoso(this.tblseries, data);

            // se procede a expandir todas las filas de las series
            this.expandRowsSeries();
          },
          error => {
            this.messageService.add(MsjUtil.getToastErrorLng(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que permite soportar el evento click del boton eliminar sub-serie documental
   */
  public eliminarSubSerie(serie: SerieDocumentalDTO, subSerie: SubSerieDocumentalDTO): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.ELIMINAR_SERIE_SUBSERIE
        .replace('?1', 'Subserie')
        .replace('?2', subSerie.nombre)
        .replace('?3', 'text-capitalize'),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se procede a eliminar la subserie
        const request = new SubSerieDocumentalDTO();
        request.idSubSerie = subSerie.idSubSerie;
        request.idSerie = serie.idSerie;
        request.tipoEvento = TipoEventoConstant.ELIMINAR;
        this.archivoGestionService.administrarSubSerieDocumental(request).subscribe(
          data => {
            // Mensaje exitoso, sub-serie documental fue eliminado
            this.messageService.add(MsjUtil.getToastSuccessMedium(MsjFrontConstant.SERIE_SUBSERIE_ELIMINADA.replace('?1', 'Subserie')));

            // el servicio retorna las subseries relacionados a esta serie documental
            serie.subSeries = data;
          },
          error => {
            this.messageService.add(MsjUtil.getToastErrorLng(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que permite abrir el panel de creacion de serie/subserie
   *
   * @param esSerie, indica si la creacion es una serie documental
   * @param serie, es la serie documental que es la propietaria
   * de la subserie a crear, solo aplica para la creacion de la subserie
   */
  public abrirPanelCreacion(esSerie: boolean, serie: SerieDocumentalDTO): void {

    // se valida si se debe consultar los tipos documentales para la creacion
    if (this.tiposDocModel &&
        this.tiposDocModel.items &&
        this.tiposDocModel.items.length) {

      // se simula el spinner por un segundo
      this.spinnerState.displaySpinner();
      setTimeout(() => {
        // se configura los datos necesarios para el panel de creacion
        this.setPanelCreacion(esSerie, serie);

        // se cierra el spinner
        this.spinnerState.hideSpinner();
      }, 100);
    } else {
      // se procede a consultar los tipos documentales asociados al cliente
      this.archivoGestionService.getTiposDocumentales(this.clienteCurrent.id).subscribe(
        data => {
          // se configura el model de los tipos documentales consultados
          this.setModelTiposDocumentales(data);

          // se configura los datos necesarios para el panel de creacion
          this.setPanelCreacion(esSerie, serie);
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    }
  }

  /**
   * Metodo que permite abrir el panel de edicion de serie/subserie
   *
   * @param esSerie, indica si la edicion es una serie documental
   * @param documental, es la serie/subserie a editar
   * @param serie, es la serie documental que es la propietaria
   * de la subserie a editar, solo aplica para la edicion de la subserie
   */
  public abrirPanelEdicion(esSerie: boolean, documental: Documental, serie: SerieDocumentalDTO): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se configura la bandera que indica si la edicion es serie documental
    this.esSerieDocumental = esSerie;

    // se guarda el origen de la serie/subserie a editar
    this.serieSubserieEditarOrigen = documental;

    // se hace el backup de la serie o subserie a editar
    this.serieSubserieCU = JSON.parse(JSON.stringify(documental));

    // se utiliza para validar los input solo numeros
    this.setRegex();

    // se indica que tipo de documental se va editar
    if (this.esSerieDocumental) {
      this.serieSubserieCU.id = (documental as SerieDocumentalDTO).idSerie;
    } else {
      this.serieSubserieCU.id = (documental as SubSerieDocumentalDTO).idSubSerie;
      this.seriePropietaria = serie;
    }
  }

  /**
   * Metodo que soporta el evento clik del boton agregar tipo documental
   */
  public adicionarTipoDocumental(): void {

    // se obtiene el tipo documental seleccionado
    const itemSelected = this.tiposDocModel.getItemSelected(AutoCompleteModel.TIPOS_DOCUMENTALES);

    // se verifica si el usuario si ingreso algun valor
    if (itemSelected) {

      // no se puede ingresar dos tipos documentales iguales
      if (this.serieSubserieCU.tiposDocumentales) {
        for (const serieTipo of this.serieSubserieCU.tiposDocumentales) {
          if (serieTipo.nombre === itemSelected.nombre) {
            this.autoTiposDocs.inputEL.nativeElement.focus();
            return;
          }
        }
      } else {
        this.serieSubserieCU.tiposDocumentales = new Array<TipoDocumentalDTO>();
      }

      // se agrega el tipo documental ingresado y se configura el focus
      this.serieSubserieCU.tiposDocumentales.push(itemSelected);
      this.autoTiposDocs.inputEL.nativeElement.focus();
    }
  }

  /**
   * Metodo que soporta el evento clik del boton eliminar documental
   */
  public eliminarTipoDocumental(tipo: TipoDocumentalDTO): void {
    if (this.serieSubserieCU.tiposDocumentales && this.serieSubserieCU.tiposDocumentales.length) {
      this.serieSubserieCU.tiposDocumentales.splice(this.serieSubserieCU.tiposDocumentales.indexOf(tipo, 0), 1);
    }
  }

  /**
   * Metodo que permite cerrar el panel de creacion o edicion de series/subseries
   */
  public closePanelCU(): void {

    // si ID no existe es porque el proceso es creacion por lo tanto se debe preguntar directo
    if (!this.serieSubserieCU.id) {
        this.confirmationService.confirm({
        message: MsjFrontConstant.SEGURO_SALIR,
        header: MsjFrontConstant.CONFIRMACION,
        accept: () => {

          // se verifica que tipo de documental se registro en el sistema
          if (this.esSerieDocumental) {

            // para series documentales
            if (this.hayNuevasSeries) {
              this.getSeriesDespuesCreacion();
            } else {
              this.cleanPanelSpinnerCU();
            }
          } else {

            // para subseries documentales
            if (this.hayNuevasSubSeries) {
              this.getSubseriesDespuesCreacion();
            } else {
              this.cleanPanelSpinnerCU();
            }
          }
        }
      });
    } else {
      this.cleanPanelSpinnerCU();
    }
  }

  /**
   * Metodo que permite configurar los datos necesarios del panel de creacion
   *
   * @param esSerie, indica si la creacion es una serie documental
   * @param serie, es la serie documental que es la propietaria
   * de la subserie a crear, solo aplica para la creacion de la subserie
   */
  private setPanelCreacion(esSerie: boolean, serie: SerieDocumentalDTO): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se configura la bandera que indica si la creacion es serie documental
    this.esSerieDocumental = esSerie;

    // se utiliza para validar los input solo numeros
    this.setRegex();

    // se indica que tipo de documental se va crear
    if (this.esSerieDocumental) {
      this.serieSubserieCU = new SerieDocumentalDTO();
    } else {
      this.serieSubserieCU = new SubSerieDocumentalDTO();
      this.seriePropietaria = serie;
    }

    // se posiciona el scroll en la parte superior
    this.positionScroll = this.shellState.contentComponent.getPositionScroll();
    this.shellState.contentComponent.setPositionScroll(0);
  }

  /**
   * Metodo que permite configurar los datos iniciales para
   * el submodulo de administrar series documentales
   *
   * @param esCreacionSerie, si el llamado a este metodo es por creacion de serie
   */
  private getInitAdminSeriesDocumentales(esCreacionSerie: boolean): void {

    // se consulta los datos iniciales para este submodulo
    this.archivoGestionService.getInitAdminSeriesDocumentales(this.clienteCurrent.id).subscribe(
      data => {
        // se verifica si hay series documentales asociados al cliente autenticado
        if (data && data.series && data.series.cantidadTotal) {

          // se configura el paginador de las series
          this.seriesPaginados = new PaginadorModel(this);
          this.seriesPaginados.configurarRegistros(data.series);

          // se construye el DTO para el filtro de busqueda con su clone
          this.filtro = new FiltroSerieDocumentalDTO();
          this.filtro.idCliente = this.clienteCurrent.id;
          this.filtroClone = JSON.parse(JSON.stringify(this.filtro));

          // se procede a expandir todas las filas de las series
          this.expandRowsSeries();

          // se verifica si se debe cerrar el panel de crear/editar
          if (esCreacionSerie) {
            this.cleanPanelCU();
          }
        }
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite expandir todas las filas de las series
   * para visualizar las subseries de cada serie consultada
   */
  private expandRowsSeries(): void {
    this.expandAllSeries = {};
    if (this.seriesPaginados.registros && this.seriesPaginados.registros.length) {
      for(const serie of this.seriesPaginados.registros) {
        this.expandAllSeries[serie.idSerie] = 1;
      }
    }
  }

  /**
   * limpia los datos utilizado para crear/editar la serie/subserie simulando el spinner
   */
  private cleanPanelSpinnerCU(): void {
    this.spinnerState.displaySpinner();
    setTimeout(() => {
      this.cleanPanelCU();
      this.spinnerState.hideSpinner();
    }, 100);
  }

  /**
   * Metodo que permite limpiar las variables utilizadas en los paneles crear/editar
   */
  private cleanPanelCU(): void {

    // se limpia las variables utilizadas del panel de crear/editar
    this.messageService.clear();
    this.serieSubserieCU = null;
    this.seriePropietaria = null;
    this.serieSubserieEditarOrigen = null;
    this.esSerieDocumental = false;
    this.hayNuevasSeries = false;
    this.hayNuevasSubSeries = false;

    // se resetea el componente autocomplete de tipos documentales
    this.tiposDocModel.reset();

    // se posiciona el scroll como estaba antes de entrar al panel de crear/editar
    this.shellState.contentComponent.setPositionScrollDelay(this.positionScroll);
  }

  /**
   * Metodo para configurar el REGEX para validacion de solo numeros
   */
  private setRegex(): void {
    if (!this.regex) {
      this.regex = new RegexUtil();
    }
  }

  /**
   * Metodo que permite configurar el model para los tipos documentales
   * @param tipos , lista de tipos documentales asociados al cliente
   */
  private setModelTiposDocumentales(tipos: Array<TipoDocumentalDTO>): void {
    if (!this.tiposDocModel) {
      this.tiposDocModel = new AutoCompleteModel();
    }
    this.tiposDocModel.items = tipos;
    this.tiposDocModel.reset();
  }

  /**
   * Metodo que permite validar si los campos son validos
   * para crear/editar una serie/subserie
   *
   * @return, true si son validos, de lo contrario false
   */
  private isCamposIngresoValidos(): boolean {
    let isValido = true;

    // se verifica la obligatoriedad del codigo
    this.serieSubserieCU.codigo = this.setTrimFilter(this.serieSubserieCU.codigo);
    this.serieSubserieCU.esCodigoInvalido = false;
    if (!this.serieSubserieCU.codigo) {
      this.serieSubserieCU.esCodigoInvalido = true;
      isValido = false;
    }

    // se verifica la obligatoriedad del nombre
    this.serieSubserieCU.nombre = this.setTrimFilter(this.serieSubserieCU.nombre);
    this.serieSubserieCU.esNombreInvalido = false;
    if (!this.serieSubserieCU.nombre) {
      this.serieSubserieCU.esNombreInvalido = true;
      isValido = false;
    }

    // se verifica si AG es un valor numerico
    this.serieSubserieCU.tiempoArchivoGestion = this.setTrimFilter(this.serieSubserieCU.tiempoArchivoGestion);
    this.serieSubserieCU.esAGInvalido = false;
    if (this.serieSubserieCU.tiempoArchivoGestion) {
      this.serieSubserieCU.esAGInvalido = !this.regex.isValorNumerico(this.serieSubserieCU.tiempoArchivoGestion);
      if (this.serieSubserieCU.esAGInvalido) {
        isValido = false;
      }
    }

    // se verifica si AC es un valor numerico
    this.serieSubserieCU.tiempoArchivoCentral = this.setTrimFilter(this.serieSubserieCU.tiempoArchivoCentral);
    this.serieSubserieCU.esACInvalido = false;
    if (this.serieSubserieCU.tiempoArchivoCentral) {
      this.serieSubserieCU.esACInvalido = !this.regex.isValorNumerico(this.serieSubserieCU.tiempoArchivoCentral);
      if (this.serieSubserieCU.esACInvalido) {
        isValido = false;
      }
    }
    return isValido;
  }

  /**
   * Metodo que permite configurar los nuevos tipos documentales al modelo
   * @param nuevosItems , son los nuevos items a configurar
   */
  private setNuevosTiposDocumentales(nuevosItems: any): void {

    // se verifica si hay nuevos items
    if (nuevosItems && nuevosItems.length) {

      // se verifica si existe el modelo
      if (this.tiposDocModel) {

        // si el modelo ya tiene items se procede solamente agregar los nuevos
        const items = this.tiposDocModel.items;
        if (items) {
          for (const tipoDocumental of nuevosItems) {
            items.push(tipoDocumental);
          }
        } else {
          this.tiposDocModel.items = nuevosItems;
        }
      } else {
        this.tiposDocModel = new AutoCompleteModel();
        this.tiposDocModel.items = nuevosItems;
      }
    }
  }

  /**
   * Metodo que permite consultar las series documentales
   * despues de la creacion de una serie sobre el sistema
   */
  private getSeriesDespuesCreacion(): void {

    // si no hay paginador significa que son las primeras series creadas
    if (this.seriesPaginados) {

      // se hace el backup de los datos del paginador esto por si hay errores
      this.filtroClone.paginador = this.seriesPaginados.filtroBefore();

      // se procede a consultar las series documentales de acuerdo al filtro
      this.archivoGestionService.getSeriesDocumentales(this.filtroClone).subscribe(
        data => {
          // se configura los nuevas series consultadas
          this.seriesPaginados.filtroExitoso(this.tblseries, data);

          // se limpia las variables utilizadas para el panel de creacion
          this.cleanPanelCU();
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    } else {
      // si no hay paginador se procede a consultar los datos iniciales
      this.getInitAdminSeriesDocumentales(true);
    }
  }

  /**
   * Metodo que permite consultar las subseries documentales
   * despues de la creacion de una subserie sobre el sistema
   */
  private getSubseriesDespuesCreacion(): void {

    // se procede a consultar las subseries documentales
    this.archivoGestionService.getSubSeriesDocumental(this.seriePropietaria.idSerie).subscribe(
      data => {
        // se configuran las subseries documentales
        this.seriePropietaria.subSeries = data;

        // se limpia las variables utilizadas para el panel de creacion
        this.cleanPanelCU();

        // se procede a expandir todas las filas por si la serie propietaria no tenia subserie
        this.expandRowsSeries();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * se configura el id del usuario quien esta creando la serie/subserie
   */
  private setUsuarioCreacion(): void {
    const welcome: WelcomeDTO = LocalStoreUtil.welcome(TipoEventoConstant.GET);
    if (welcome && welcome.credenciales && !welcome.credenciales.administrador) {
      this.serieSubserieCU.idUsuarioCreacion = welcome.usuario.id;
    }
  }
}
