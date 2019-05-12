/**
 * Estado para notificar el tamanio de la pantalla
 * del monitor o celular, se utiliza para el
 * responsive de la app
 *
 * @author Carlos Andres Diaz
 */
export class ScreenST {

  /** Es el largo minimo que identifica una resolucion grande **/
  public largeBreakpoint = 1024;

  /** Es el ancho de la pantalla, este valor es dinamico si el dispositivo cambia **/
  public screenWidth = 1000;

  /** Se utiliza para el binding del scrollTop del div del content **/
  public scrollPosition;

  /**
   * Se hace la inscripcion con la ventana del navegador
   * para ser notificado si el dispositivo cambia su resolucion
   */
  constructor() {
    try {
      this.screenWidth = window.innerWidth;
      window.addEventListener('resize', event => this.onResize(event));
    } catch (e) {
      // we're going with default screen dimensions
    }
  }

  /**
   * Metodo que permite colocar el scroll en la parte superior de la pagina
   */
  public putScrollUP(): void {
    this.scrollPosition = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50);
      } else {
        window.clearInterval(this.scrollPosition);
      }
    }, 16);
  }

  /**
   * Metodo que identifica si la resolucion de la pantalla es grande
   */
  public isBigScreen(): boolean {
    return this.screenWidth >= this.largeBreakpoint;
  }

  /**
   * Metodo que es invocado cuando el tamanio de la pantalla cambia
   */
  private onResize($event): void {
    this.screenWidth = window.innerWidth;
  }
}
