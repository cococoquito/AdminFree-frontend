import { Injectable } from '@angular/core';
import { ClienteDTO } from './../../dtos/configuraciones/cliente.dto';
import { NomenclaturaDTO } from './../../dtos/configuraciones/nomenclatura.dto';
import { InitSolicitarConsecutivoDTO } from './../../dtos/correspondencia/init-solicitar-consecutivo.dto';
import { SolicitudConsecutivoResponseDTO } from '../../dtos/correspondencia/solicitud-consecutivo-response.dto';
import { CampoModel } from '../../model/campo-model';
import { StepsModel } from './../../model/steps-model';
import { TipoCamposConstant } from '../../constants/tipo-campos.constant';
import { TiposDocumentosConstant } from '../../constants/tipos-documentos.constant';

/**
 * Estado para almacener la data para el proceso de negocio
 * de solicitar consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class SolicitarConsecutivoState {

  /** cliente autenticado o es el cliente asociado al usuario autenticado (transversal) */
  public clienteCurrent: ClienteDTO;

  /** son los datos iniciales para el modulo de solicitar consecutivos (transversal)*/
  public datosIniciales: InitSolicitarConsecutivoDTO;

  /** Modelo del componente steps para la solicitud de consecutivos (transversal)*/
  public stepsModel: StepsModel;

  /** Es la nomenclatura seleccionada (paso 1) */
  public nomenclaturaSeleccionada: NomenclaturaDTO;

  /** Son los valores ingresados para la solicitud (paso 2)*/
  public camposInformacionValues: Array<CampoModel>;

  /** Indica si los campos de informacion ya fueron consultados, (paso 2)*/
  public noConsultarCamposIngreso: boolean;

  /** Es el response de la solicitud, contiene el consecutivo generado, (paso 3)*/
  public responseSolicitud: SolicitudConsecutivoResponseDTO;

  /** identificadores de cada tipo de campo (transversal)*/
  public ID_CAMPO_TEXTO = TipoCamposConstant.ID_CAMPO_TEXTO;
  public ID_LISTA_DESPLEGABLE = TipoCamposConstant.ID_LISTA_DESPLEGABLE;
  public ID_CASILLA_VERIFICACION = TipoCamposConstant.ID_CASILLA_VERIFICACION;
  public ID_CAMPO_FECHA = TipoCamposConstant.ID_CAMPO_FECHA;

  /** Son los tipos de documentos permitidos para el cargue de archivo*/
  public tiposDocumentos = TiposDocumentosConstant.getAll();

  /**
   * Metodo que permite reiniciar la data para los pasos 2,3
   */
  public reiniciarPaso2(): void {
    this.camposInformacionValues = null;
    this.noConsultarCamposIngreso = false;
  }

  /**
   * Metodo que permite reiniciar la data para volver a generar otro consecutivo
   */
  public reiniciar(): void {

    // variable utilizada en el paso 1
    this.nomenclaturaSeleccionada = null;

    // variable utilizada en el paso 2
    this.reiniciarPaso2();

    // variable utilizada en el paso 4
    this.responseSolicitud = null;
  }
}
