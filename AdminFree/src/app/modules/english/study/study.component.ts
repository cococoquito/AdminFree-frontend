import { Component, OnInit } from '@angular/core';
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
   * Metodo que permite consultar el detalle del capitulo
   */
  private getDetailChapter(idChapter: number, seasonSelected: SeasonDTO): void {

    // se limpia las variables globales
    this.seasonSelected = null;
    this.chapterDetail = null;

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
}
