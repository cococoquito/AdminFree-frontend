import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonComponent } from 'src/app/util/common.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EnglishService } from 'src/app/services/english.service';
import { RouterConstant } from 'src/app/constants/router.constant';
import { TipoEventoConstant } from 'src/app/constants/tipo-evento.constant';
import { LocalStoreUtil } from 'src/app/util/local-store.util';
import { SerieDTO } from 'src/app/dtos/english/serie.dto';
import { MsjUtil } from 'src/app/util/messages.util';
import { MsjFrontConstant } from 'src/app/constants/messages-frontend.constant';
import { ChapterDTO } from 'src/app/dtos/english/chapter.dto';
import { SeasonDTO } from 'src/app/dtos/english/season.dto';
import { SentenceDTO } from 'src/app/dtos/english/sentence.dto';

/**
 * Componente para la edition de las series
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-edition-series',
  templateUrl: './edition-series.component.html',
  styleUrls: ['./edition-series.component.css']
})
export class EditionSeriesComponent extends CommonComponent implements OnInit {

  /** Es la serie seleccionada para editar*/
  public serie: SerieDTO;

  /** Es la temporada seleccionada para agregar o editar el capitulo*/
  public seasonSelected: SeasonDTO;

  /** Es el capitulo a crear o editar*/
  public chapter: ChapterDTO;

  /** Es el capitulo a visualizar su detalle*/
  public chapterDetail: ChapterDTO;

  /** Es la sentence agregar o editar*/
  public sentence: SentenceDTO;

  /** indica si el usuario ya dio click en los botones de agregacion */
  public submit: boolean;

  /** se utiliza para limpiar el componente de carga de sonido*/
  @ViewChild('inSound') inSound: any;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   * 
   * @param router, Router para la navegacion entre paginas
   * 
   * @param confirmationService, se utiliza para mostrar el
   * modal de confirmacion para diferente procesos
   *
   * @param englishService, se utiliza para consumir
   * los servicios relacionados a este proceso negocio
   */
  constructor(
    protected messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private englishService: EnglishService) {
    super();
  }

  /**
   * Se debe inicializar las variables globales
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Metodo que permite agregar una nueva temporada para esta serie
   */
  public addSeason(): void {

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.CONF_ADD_SEASON,
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se procede a invocar el servicio para agregar la temporada
        this.englishService.addSeason(this.serie.id).subscribe(
          data => {
            this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.TEMPORADA_CREADO_EXITOSO));
            this.serie = data;
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que permite agregar un capitulo para la temporada seleccionada
   */
  public addChapter(): void {
    this.submit = true;

    // se valida los campos de ingresos obligatorios
    this.chapter.name = this.setTrimFilter(this.chapter.name);
    this.chapter.url = this.setTrimFilter(this.chapter.url);
    if (!this.chapter.name || !this.chapter.url) {
      return;
    }

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.CONF_ADD_NEW_CHAPTER,
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se procede a invocar el servicio para agregar el capitulo
        this.englishService.addChapter(this.chapter).subscribe(
          data => {
            this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.CAPITULO_CREADO_EXITOSO));
            this.serie = data;
            this.cleanVariableAddChapter();
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que permite guardar los cambios para almacenar o editar una sentence
   */
  public crearEditarSentence(): void {

    // se valida los campos de ingresos obligatorios
    this.sentence.english = this.setTrimFilter(this.sentence.english);
    this.sentence.spanish = this.setTrimFilter(this.sentence.spanish);
    if (!this.sentence.english ||
        !this.sentence.spanish ||
        !this.sentence.audio) {
      this.messageService.add(MsjUtil.getToastErrorLng(MsjFrontConstant.SENTENCE_FIELDS_REQUIRED));
      return;
    }

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.CONF_ADD_SENTENCE,
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

      }
    });
  }

  /**
   * Metodo que permite consultar el detalle del capitulo
   */
  public clickChapter(idChapter: number, seasonSelected: SeasonDTO): void {

    // si hay una edicion o insercion en proceso
    if (this.chapter || this.sentence){
      this.confirmationService.confirm({
        message: MsjFrontConstant.CONF_ADD_CHAPTER,
        header: MsjFrontConstant.CONFIRMACION,
        accept: () => {
          this.getDetailChapter(idChapter, seasonSelected);
        }
      });
    } else {
      this.getDetailChapter(idChapter, seasonSelected);
    }
  }

  /**
   * Metodo que permite habilitar el panel de agregar capitulo
   * @param seasonSelected , es la temporada seleccionada para
   * agregar el nuevo capitulo
   */
  public enableAddChapter(seasonSelected: SeasonDTO): void {
    if (this.chapter || this.sentence){
      this.confirmationService.confirm({
        message: MsjFrontConstant.CONF_ADD_CHAPTER,
        header: MsjFrontConstant.CONFIRMACION,
        accept: () => {
          this.initVariableAddChapter(seasonSelected);
        }
      });
    } else {
      this.initVariableAddChapter(seasonSelected);
    }
  }

 /**
   * Permite soportar el evento click del boton agregar sentence
   */
  public addSentence(): void {
    if (this.sentence){
      this.confirmationService.confirm({
        message: MsjFrontConstant.CONF_ADD_CHAPTER,
        header: MsjFrontConstant.CONFIRMACION,
        accept: () => {
         this.sentence = new SentenceDTO();
        }
      });
    } else {
      this.sentence = new SentenceDTO();
    }
  }

  /**
   * Metodo que soporta el evento del boton 'Download sound' (PENDIENTE)
   */
  public downloadSound(event): void {
    this.sentence.audio = event.files[0];
  }

  /**
   * Metodo que soporta el evento click del boton come back
   */
  public goToListSeries(): void {
    if (this.chapter || this.sentence){
      this.confirmationService.confirm({
        message: MsjFrontConstant.CONF_ADD_CHAPTER,
        header: MsjFrontConstant.CONFIRMACION,
        accept: () => {
          this.router.navigate([RouterConstant.ROUTER_ENGLISH]);
        }
      });
    } else {
      this.router.navigate([RouterConstant.ROUTER_ENGLISH]);
    }
  }

  /**
   * Se debe consultar los detalles de la serie
   */
  private init(): void {

    // se obtiene el identificador de la serie del localstore
    const idSerie = LocalStoreUtil.idSerie(TipoEventoConstant.GET);

    // solo aplica si hay id de la serie en el local
    if (idSerie) {

      // se debe eliminar el id del local
      LocalStoreUtil.idSerie(TipoEventoConstant.ELIMINAR);

      // se procede a buscar el detalle de la serie a editar
      this.englishService.getDetailSerie(idSerie).subscribe(
        data => {
          this.serie = data;
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    }
  }

  /**
   * Metodo que permite consultar el detalle del capitulo
   */
  private getDetailChapter(idChapter: number, seasonSelected: SeasonDTO): void {

    // se limpia las variables globales
    this.cleanVariableAddChapter();

    // se configura la temporada seleccionada
    this.seasonSelected = seasonSelected;

    // se procede a consultar el detalle del capitulo
    this.englishService.getDetailChapter(idChapter).subscribe(
      data => {
        this.chapterDetail = data;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Permite inicializar las variables necesarios para add chapter
   */
  private initVariableAddChapter(seasonSelected: SeasonDTO): void {
    this.seasonSelected = seasonSelected;
    this.chapter = new ChapterDTO();
    this.chapter.idSeason = seasonSelected.id;
    this.chapter.idSerie = this.serie.id;
    this.submit = false;
    this.chapterDetail = null;
  }

  /**
   * Permite limpiar las variables del panel add chapter
   */
  private cleanVariableAddChapter(): void {
    this.seasonSelected = null;
    this.chapter = null;
    this.chapterDetail = null;
    this.sentence = null;
    this.submit = false;
  }
}
