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
import { ResponseEdicionSerieSubserieDTO } from '../../../dtos/archivogestion/response-edicion-serie-subserie.dto';
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

  /** Banderas que indica que hay cambios en algun panel especifico*/
  public isCambioPnlCodigoNombre: boolean;
  public isCambioPnlTiposDocumentales: boolean;
  public isCambioPnlRetencion: boolean;
  public isCambioPnlDisposicionFinal: boolean;
  public isCambioPnlProcedimiento: boolean;

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
   * Metodo que soporta el evento click del boton Crear Serie Documental
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
   * Metodo que soporta el evento click del boton Crear Subserie documental
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
   * Metodo que soporta el evento click del boton Aplicar Cambios
   */
  public aplicarCambios(): void {

    // se verifica si hay algun cambio
    if (this.isCambioPnlCodigoNombre ||
        this.isCambioPnlTiposDocumentales ||
        this.isCambioPnlRetencion ||
        this.isCambioPnlDisposicionFinal ||
        this.isCambioPnlProcedimiento) {

      // se limpia los mensajes anteriores
      this.messageService.clear();

      // se verifica si los campos son validos
      if (this.isCamposIngresoValidos()) {

        // se muestra la ventana de confirmacion
        this.confirmationService.confirm({
          message: MsjFrontConstant.APLICAR_CAMBIOS,
          header: MsjFrontConstant.CONFIRMACION,
          accept: () => {

            // se indica al servicio que el proceso es una actualizacion
            this.serieSubserieCU.tipoEvento = TipoEventoConstant.EDITAR;
            this.serieSubserieCU.idCliente = this.clienteCurrent.id;

            // se indica al servicio que tipos de datos se va actualizar
            this.serieSubserieCU.modificarDatosGenerales = false;
            this.serieSubserieCU.modificarTiposDocumentales = false;
            if (this.isCambioPnlCodigoNombre ||
                this.isCambioPnlRetencion ||
                this.isCambioPnlDisposicionFinal ||
                this.isCambioPnlProcedimiento) {
                this.serieSubserieCU.modificarDatosGenerales = true;
            }
            if (this.isCambioPnlTiposDocumentales) {
              this.serieSubserieCU.modificarTiposDocumentales = true;
            }

            // se verifica que tipo documental se va actualizar
            if (this.esSerieDocumental) {
              this.archivoGestionService.administrarSerieDocumental(this.serieSubserieCU as SerieDocumentalDTO).subscribe(
                data => {
                  this.afterUpdateSerieSubserie(data);
                },
                error => {
                  const msj = this.showMensajeError(error);
                  this.messageService.add(MsjUtil.getMsjError(msj));
                  this.messageService.add(MsjUtil.getToastErrorLng(msj));
                }
              );
            } else {
              this.archivoGestionService.administrarSubSerieDocumental(this.serieSubserieCU as SubSerieDocumentalDTO).subscribe(
                data => {
                  this.afterUpdateSerieSubserie(data);
                },
                error => {
                  const msj = this.showMensajeError(error);
                  this.messageService.add(MsjUtil.getMsjError(msj));
                  this.messageService.add(MsjUtil.getToastErrorLng(msj));
                }
              );
            }
          }
        });
      } else {
        this.messageService.add(MsjUtil.getToastErrorLng(MsjFrontConstant.ADMIN_SERIES_ERROR_CAMPOS));
      }
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

    // se valida si se debe consultar los tipos documentales para la edicion
    if (this.tiposDocModel &&
        this.tiposDocModel.items &&
        this.tiposDocModel.items.length) {

      // se simula el spinner por un segundo
      this.spinnerState.displaySpinner();
      setTimeout(() => {
        // se configura los datos necesarios para el panel de edicion
        this.setPanelEdicion(esSerie, documental, serie);

        // se cierra el spinner
        this.spinnerState.hideSpinner();
      }, 100);
    } else {
      // se procede a consultar los tipos documentales asociados al cliente
      this.archivoGestionService.getTiposDocumentales(this.clienteCurrent.id).subscribe(
        data => {
          // se configura el model de los tipos documentales consultados
          this.setModelTiposDocumentales(data);

          // se configura los datos necesarios para el panel de edicion
          this.setPanelEdicion(esSerie, documental, serie);
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
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

      // se agrega el tipo documental ingresado
      this.serieSubserieCU.tiposDocumentales.push(itemSelected);

      // se verifica si hay cambios, esto aplica solamente para EDICION
      this.changePnlTiposDocumentales();

      // se configura el focus para ingresar otro tipo documental
      this.autoTiposDocs.inputEL.nativeElement.focus();
    }
  }

  /**
   * Metodo que soporta el evento clik del boton eliminar documental
   */
  public eliminarTipoDocumental(tipo: TipoDocumentalDTO): void {

    // se verifica si hay tipos documentales a eliminar
    if (this.serieSubserieCU.tiposDocumentales && this.serieSubserieCU.tiposDocumentales.length) {

      // se procede eliminar el tipo documental seleccionada
      this.serieSubserieCU.tiposDocumentales.splice(this.serieSubserieCU.tiposDocumentales.indexOf(tipo, 0), 1);

      // se verifica si hay cambios, esto aplica solamente para EDICION
      this.changePnlTiposDocumentales();
    }
  }

  /**
   * Metodo que permite cerrar el panel de creacion o edicion de series/subseries
   */
  public closePanelCU(): void {

    // se verifica si el proceso es de creacion
    if (!this.serieSubserieEditarOrigen) {
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
      // para edicion se muestra la ventana si hay alguna modificacion
      if (this.isCambioPnlCodigoNombre ||
          this.isCambioPnlTiposDocumentales ||
          this.isCambioPnlRetencion ||
          this.isCambioPnlDisposicionFinal ||
          this.isCambioPnlProcedimiento) {
        this.confirmationService.confirm({
          message: MsjFrontConstant.SEGURO_SALIR_EDICION,
          header: MsjFrontConstant.CONFIRMACION,
          accept: () => {
            this.cleanPanelSpinnerCU();
          }
        });
      } else {
        this.cleanPanelSpinnerCU();
      }
    }
  }

  /**
   * Valida si hay cambios para el primer panel (nombre y codigo)
   */
  public changePnlCodigoNombre(): void {

    // aplica solamente para edicion
    if (this.serieSubserieEditarOrigen) {

      // se verifica si hay algun cambio para el panel - 1
      this.isCambioPnlCodigoNombre = false;
      this.serieSubserieCU.codigo = this.setTrimFilter(this.serieSubserieCU.codigo);
      this.serieSubserieCU.nombre = this.setTrimFilter(this.serieSubserieCU.nombre);
      if (this.serieSubserieCU.codigo !== this.serieSubserieEditarOrigen.codigo ||
        this.serieSubserieCU.nombre !== this.serieSubserieEditarOrigen.nombre) {
        this.isCambioPnlCodigoNombre = true;
      }
    }
  }

  /**
   * Valida si hay cambios para el segundo panel (tipos documentales)
   */
  public changePnlTiposDocumentales(): void {

    // aplica solamente para edicion
    if (this.serieSubserieEditarOrigen) {

      // se verifica si hay algun cambio para el panel - 2
      this.isCambioPnlTiposDocumentales = true;

      // es la cantidad de tipos documentales origen
      let cantOrigen = 0;
      if (this.serieSubserieEditarOrigen.tiposDocumentales) {
        cantOrigen = this.serieSubserieEditarOrigen.tiposDocumentales.length;
      }

      // es la cantidad de tipos documentales mostrado en pantalla
      let cantEdicion = 0;
      if (this.serieSubserieCU.tiposDocumentales) {
        cantEdicion = this.serieSubserieCU.tiposDocumentales.length;
      }

      // si son diferentes es porque hay modificaciones
      if (cantOrigen === cantEdicion) {
        this.isCambioPnlTiposDocumentales = false;
        if (cantOrigen > 0) {
          let existe;
          for (const view of this.serieSubserieCU.tiposDocumentales) {
            existe = false;
            for (const origen of this.serieSubserieEditarOrigen.tiposDocumentales) {
              if (view.id === origen.id) {
                existe = true;
                break;
              }
            }
            if (!existe) {
              this.isCambioPnlTiposDocumentales = true;
              break;
            }
          }
        }
      }
    }
  }

  /**
   * Valida si hay cambios para el tercer panel (retencion)
   */
  public changePnlRetencion(): void {

    // aplica solamente para edicion
    if (this.serieSubserieEditarOrigen) {

      // se verifica si hay algun cambio para el panel - 3
      this.isCambioPnlRetencion = false;

      /* tslint:disable */
      if (this.serieSubserieCU.tiempoArchivoGestion != this.serieSubserieEditarOrigen.tiempoArchivoGestion ||
        this.serieSubserieCU.tiempoArchivoCentral != this.serieSubserieEditarOrigen.tiempoArchivoCentral) {
        this.isCambioPnlRetencion = true;
      }
      /* tslint:enable */
    }
  }

  /**
   * Valida si hay cambios para el cuarto panel (Disposicion Final)
   */
  public changePnlDisposicionFinal(): void {

    // aplica solamente para edicion
    if (this.serieSubserieEditarOrigen) {

      // se verifica si hay algun cambio para el panel - 4
      this.isCambioPnlDisposicionFinal = false;
      if (this.serieSubserieCU.conservacionTotal !== this.serieSubserieEditarOrigen.conservacionTotal ||
        this.serieSubserieCU.microfilmacion !== this.serieSubserieEditarOrigen.microfilmacion ||
        this.serieSubserieCU.seleccion !== this.serieSubserieEditarOrigen.seleccion ||
        this.serieSubserieCU.eliminacion !== this.serieSubserieEditarOrigen.eliminacion) {
        this.isCambioPnlDisposicionFinal = true;
      }
    }
  }

  /**
   * Valida si hay cambios para el quinto panel (Procedimiento)
   */
  public changePnlProcedimiento(): void {

    // aplica solamente para edicion
    if (this.serieSubserieEditarOrigen) {

      // se verifica si hay algun cambio para el panel - 5
      this.isCambioPnlProcedimiento = false;
      this.serieSubserieCU.procedimiento = this.setTrimFilter(this.serieSubserieCU.procedimiento);
      if (this.serieSubserieCU.procedimiento !== this.serieSubserieEditarOrigen.procedimiento) {
        this.isCambioPnlProcedimiento = true;
      }
    }
  }

  /**
   * Metodo que permite configurar los datos necesarios para el panel de creacion
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
   * Metodo que permite configurar los datos necesarios para el panel de edicion
   *
   * @param esSerie, indica si la edicion es una serie documental
   * @param documental, es la serie/subserie a editar
   * @param serie, es la serie documental que es la propietaria
   * de la subserie a editar, solo aplica para la edicion de la subserie
   */
  private setPanelEdicion(esSerie: boolean, documental: Documental, serie: SerieDocumentalDTO): void {

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se configura la bandera que indica si la edicion es serie documental
    this.esSerieDocumental = esSerie;

    // se utiliza para validar los input solo numeros
    this.setRegex();

    // se guarda el origen de la serie/subserie a editar
    this.serieSubserieEditarOrigen = documental;

    // se hace el backup de la serie o subserie a editar
    if (esSerie) {
      const serieDTO = (documental as SerieDocumentalDTO);
      const subSeriesDTO = serieDTO.subSeries;
      serieDTO.subSeries = null;
      this.serieSubserieCU = JSON.parse(JSON.stringify(serieDTO));
      serieDTO.subSeries = subSeriesDTO;
    } else {
      this.serieSubserieCU = JSON.parse(JSON.stringify(documental));
    }

    // se configura la serie propietaria para la subserie
    this.seriePropietaria = serie;

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
    this.isCambioPnlCodigoNombre = false;
    this.isCambioPnlTiposDocumentales = false;
    this.isCambioPnlRetencion = false;
    this.isCambioPnlDisposicionFinal = false;
    this.isCambioPnlProcedimiento = false;

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
    this.serieSubserieCU.esAGInvalido = false;
    if (this.serieSubserieCU.tiempoArchivoGestion) {
      this.serieSubserieCU.esAGInvalido = !this.regex.isValorNumerico(this.serieSubserieCU.tiempoArchivoGestion);
      if (this.serieSubserieCU.esAGInvalido) {
        isValido = false;
      }
    }

    // se verifica si AC es un valor numerico
    this.serieSubserieCU.esACInvalido = false;
    if (this.serieSubserieCU.tiempoArchivoCentral) {
      this.serieSubserieCU.esACInvalido = !this.regex.isValorNumerico(this.serieSubserieCU.tiempoArchivoCentral);
      if (this.serieSubserieCU.esACInvalido) {
        isValido = false;
      }
    }

    // se limpia los espacios en blanco del procedimiento ingresado
    this.serieSubserieCU.procedimiento = this.setTrimFilter(this.serieSubserieCU.procedimiento);
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

  /**
   * Metodo que es invocado despues de la edicion de una serie/subserie
   * @param response, contiene los datos del response del server
   */
  private afterUpdateSerieSubserie(response: ResponseEdicionSerieSubserieDTO): void {

    // se verifica si el server retorna alguna respuesta
    if (response) {

      // se verifica si hay alguna modificacion en los datos generales
      if (this.isCambioPnlCodigoNombre ||
          this.isCambioPnlRetencion ||
          this.isCambioPnlDisposicionFinal ||
          this.isCambioPnlProcedimiento) {

        // se configuran los nuevos atributos
        if (response.datosUpdate) {
          const datosUpdate = response.datosUpdate;
          this.serieSubserieEditarOrigen.codigo = datosUpdate.codigo;
          this.serieSubserieEditarOrigen.nombre = datosUpdate.nombre;
          this.serieSubserieEditarOrigen.tiempoArchivoGestion = datosUpdate.tiempoArchivoGestion;
          this.serieSubserieEditarOrigen.tiempoArchivoCentral = datosUpdate.tiempoArchivoCentral;
          this.serieSubserieEditarOrigen.conservacionTotal = datosUpdate.conservacionTotal;
          this.serieSubserieEditarOrigen.microfilmacion = datosUpdate.microfilmacion;
          this.serieSubserieEditarOrigen.seleccion = datosUpdate.seleccion;
          this.serieSubserieEditarOrigen.eliminacion = datosUpdate.eliminacion;
          this.serieSubserieEditarOrigen.procedimiento = datosUpdate.procedimiento;
        }
      }

      // se verifica si hay alguna modificacion en los tipos documentales
      if (this.isCambioPnlTiposDocumentales) {

        // se configuran los tipos documentales que le pertenece al documental
        this.serieSubserieEditarOrigen.tiposDocumentales = null;
        if (response.datosUpdate && response.datosUpdate.tiposDocumentales) {
          this.serieSubserieEditarOrigen.tiposDocumentales = response.datosUpdate.tiposDocumentales;
        }

        // estos son los nuevos tipos documentales que se registraron en el sistema
        this.setNuevosTiposDocumentales(response.tiposDocumentales);
      }
    }

    // se utiliza para mostrar el tipo documental en el mensaje, ya que esta variable se limpia en cleanPanelCU()
    const tipoDocumentalSerie = this.esSerieDocumental;

    // se retornar a la lista de series/subseries
    this.cleanPanelCU();

    // se muestra el mensaje de actualizacion exitoso
    if (tipoDocumentalSerie) {
      this.messageService.add(MsjUtil.getToastSuccessLng(MsjFrontConstant.SERIE_SUBSERIE_ACTUALIZADA.replace('?1', 'Serie')));
    } else {
      this.messageService.add(MsjUtil.getToastSuccessLng(MsjFrontConstant.SERIE_SUBSERIE_ACTUALIZADA.replace('?1', 'Subserie')));
    }
  }
}
