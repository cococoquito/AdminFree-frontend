/**
 * Modelo para los modales del sistema
 *
 * @author Carlos Andres Diaz
 */
export class ModalData {

  /** permite visualizar el modal*/
  public isShowModal: boolean;

  /** son los datos a visualizar en el modal*/
  public data: any;

  /**
   * Es invocado cuando se cierra el modal
   */
  public closeModal(): void {
    this.isShowModal = false;
    this.data = null;
  }

  /**
   * Es invocado para abrir el modal
   */
  public showModal(datos: any): void {
    this.isShowModal = true;
    this.data = datos;
  }
}
