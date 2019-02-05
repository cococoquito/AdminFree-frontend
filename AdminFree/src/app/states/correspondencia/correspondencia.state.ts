import { Injectable } from '@angular/core';
import { ClienteDTO } from './../../dtos/configuraciones/cliente.dto';
import { NomenclaturaDTO } from './../../dtos/configuraciones/nomenclatura.dto';
import { InitSolicitarConsecutivoDTO } from './../../dtos/correspondencia/init-solicitar-consecutivo.dto';
import { SolicitudConsecutivoResponseDTO } from '../../dtos/correspondencia/solicitud-consecutivo-response.dto';
import { CampoModel } from '../../model/campo-model';
import { StepsModel } from './../../model/steps-model';

/**
 * Estado para almacener la data de la solicitud de creacion
 * o edicion de los consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class CorrespondenciaState {

  /** cliente autenticado o es el cliente asociado al usuario (transversal) */
  public clienteCurrent: ClienteDTO;

  /** son los datos iniciales para los modulos de solicitar o editar consecutivos (transversal)*/
  public datosIniciales: InitSolicitarConsecutivoDTO;

  /** Modelo del componente steps para la solicitud de consecutivos (transversal)*/
  public stepsModel: StepsModel;

  /** Es la nomenclatura seleccionada (paso 1) */
  public nomenclaturaSeleccionada: NomenclaturaDTO;

  /** Son los valores ingresados para la solicitud (paso 2)*/
  public camposInformacionValues: Array<CampoModel>;

  /** Indica si los campos de informacion ya fueron consultados, (paso 2)*/
  public noConsultarCamposIngreso: boolean;

  /** Es el response de la solicitud contiene el consecutivo generado, (paso 3)*/
  public responseSolicitud: SolicitudConsecutivoResponseDTO;

  /**
   * Metodo que permite reiniciar la data para los pasos 2,3
   */
  public reiniciarPaso2(): void {
    this.camposInformacionValues = null;
    this.noConsultarCamposIngreso = false;
  }

  public reiniciar(): void {
    // variable utilizada en el paso 1
    this.nomenclaturaSeleccionada = null;

    // variable utilizada en el paso 2
    this.camposInformacionValues = null;
    this.noConsultarCamposIngreso = false;

    // variable utilizada en el paso 4
    this.responseSolicitud = null;
  }
}
