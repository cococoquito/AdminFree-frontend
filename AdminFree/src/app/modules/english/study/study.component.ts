import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonComponent } from 'src/app/util/common.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MsjFrontConstant } from 'src/app/constants/messages-frontend.constant';
import { RouterConstant } from 'src/app/constants/router.constant';
import { Router } from '@angular/router';
import { EnglishService } from 'src/app/services/english.service';
import { SerieDTO } from 'src/app/dtos/english/serie.dto';
import { LocalStoreUtil } from 'src/app/util/local-store.util';
import { TipoEventoConstant } from 'src/app/constants/tipo-evento.constant';
import { MsjUtil } from 'src/app/util/messages.util';
import { SeasonDTO } from 'src/app/dtos/english/season.dto';
import { ChapterDTO } from 'src/app/dtos/english/chapter.dto';
import { SentenceDTO } from 'src/app/dtos/english/sentence.dto';
import { SpinnerState } from 'src/app/states/spinner.state';

/**
 * Componente para la pagina de estudio
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent extends CommonComponent implements OnInit {

  /** Es la serie seleccionada para estudiar*/
  public serie: SerieDTO;

  /** Es el capitulo a visualizar su detalle*/
  public chapterDetail: ChapterDTO;

  /** Es la temporada seleccionada para agregar o editar el capitulo*/
  public seasonSelected: SeasonDTO;

  /** Son las sentencias erroneas */
  public wrongSentences: Array<SentenceDTO>;

  /** Es la sentence a estudiar*/
  public sentence: SentenceDTO;

  /** Es el index de la sentence currently */
  public indexSentence: number;

  /** bandera para ver la respuesta */
  public verAnswer: boolean;

  /** Es la URL del audio de la sentencia */
  public urlAudio: any;

  /** se utiliza para la configuracion correcta del audio */
  private HEADER_AUDIO = 'data:audio/mp3;base64,';

  /** se utiliza para la configuracion del URL del sonido*/
  private BASE_64 = ';base64,';

  /** es el tipo de sonido que permite el sistema*/
  private MP3 = 'audio/mp3,';

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
   * 
   * @param spinnerState, se utiliza para simular el spinner cuando
   * pasa del panel edicion a la lista de consecutivos
   * 
   * @param domSanitizer, se utiliza para crear una URL segura del audio
   */
  constructor(
    protected messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private englishService: EnglishService,
    private spinnerState: SpinnerState,
    private domSanitizer: DomSanitizer) {
    super();
  }

  /**
   * Se debe inicializar las variables globales
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Metodo que soporta el evento click del boton come back
   */
  public goToListSeries(): void {
    this.confirmationService.confirm({
      message: MsjFrontConstant.SEGURO_SALIR,
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {
        this.router.navigate([RouterConstant.ROUTER_ENGLISH]);
      }
    });
  }

  /**
   * Metodo que permite consultar el detalle del capitulo
   */
  public clickChapter(idChapter: number, seasonSelected: SeasonDTO): void {
    if (this.chapterDetail) {
      this.confirmationService.confirm({
        message: MsjFrontConstant.SEGURO_SALIR,
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
   * Metodo que permite colocar la siguiente sentence
   * solo aplica si ya se visualizo la respuesta
   */
  public nextSentence(): void {
    if (this.verAnswer) {
      this.setSentence();
    }
  }

  /**
   * Metodo que permite agregar la sentencia en la lista de errores
   */
  public addWrong(): void {
    if (!this.wrongSentences) {
      this.wrongSentences = new Array<SentenceDTO>();
      this.addSentence();
    } else {
      let existe = false;
      for (const sen of this.wrongSentences) {
        if (sen.id === this.sentence.id) {
          existe = true;
          break;
        }
      }
      if (!existe) {
        this.addSentence();
      }
    }
  }

  /**
   * Metodo que pemrmite soportar el evento click del boton show answer
   */
  public showAnswer(): void {

    // no aplica si ya fue visualizada
    if (!this.verAnswer) {

      // bandera para visualizar la respuesta de la sentencia en ingles
      this.verAnswer = true;

      // se procede a configurar el audio de la sentencia
      this.urlAudio = null;
      if (this.sentence && this.sentence.audio) {
        const binary = this.convertDataURIToBinary(this.HEADER_AUDIO + this.sentence.audio);
        const blob = new Blob([binary], { type: this.MP3 });
        const urlBlob = URL.createObjectURL(blob);
        this.urlAudio = this.domSanitizer.bypassSecurityTrustUrl(urlBlob);
      }
    }
  }

  /**
   * Metodo que permite ver el detalle de la sentencia seleccionada
   */
  public clickSentence(sentenceSelected: SentenceDTO): void {
    this.spinnerState.displaySpinner();
    setTimeout(() => {
      this.sentence = sentenceSelected;
      this.spinnerState.hideSpinner();
    }, 150);
  }

  /**
   * Metodo que permite consultar el detalle del capitulo
   */
  private getDetailChapter(idChapter: number, seasonSelected: SeasonDTO): void {

    // se limpia las variables globales
    this.cleanGlobalVariable();

    // se configura la temporada seleccionada
    this.seasonSelected = seasonSelected;

    // se procede a consultar el detalle del capitulo
    this.englishService.getDetailChapter(idChapter).subscribe(
      data => {
        this.chapterDetail = data;
        this.setSentence();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
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
   * Permite configurar la sentencia a estudiar
   */
  private setSentence(): void {

    // se verifica si el capitulo tiene sentencia
    if (this.chapterDetail && this.chapterDetail.sentences) {

      // se verifica que no sea la ultima sentencia
      if (this.indexSentence < this.chapterDetail.sentences.length) {
        this.spinnerState.displaySpinner();
        setTimeout(() => { 
          this.sentence = this.chapterDetail.sentences[this.indexSentence];
          this.indexSentence = this.indexSentence + 1;
          this.verAnswer = false;
          this.urlAudio = null;
          this.spinnerState.hideSpinner();
        }, 150);
      }
    }
  }

  /**
   * Metodo que es utilizada para agregar una sentencia wrong
   */
  private addSentence(): void {
    this.spinnerState.displaySpinner();
    setTimeout(() => {
      this.wrongSentences.push(this.sentence);
      this.spinnerState.hideSpinner();
    }, 150);
  }

  /**
   * Metodo que permite limpiar las variables globales
   */
  private cleanGlobalVariable(): void {
    this.seasonSelected = null;
    this.chapterDetail = null;
    this.wrongSentences = null;
    this.indexSentence = 0;
    this.sentence = null;
    this.verAnswer = false;
    this.urlAudio = null;
  }

  /**
   * Metodo que permite construir el binario del audio en una
   * data valida para ser visualizado en pantalla
   */
  private convertDataURIToBinary(dataURI) {
    const base64Index = dataURI.indexOf(this.BASE_64) + this.BASE_64.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }
}
