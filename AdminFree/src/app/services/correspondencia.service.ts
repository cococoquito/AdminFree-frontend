import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { InitSolicitarConsecutivoDTO } from './../dtos/correspondencia/init-solicitar-consecutivo.dto';
import { NomenclaturaDetalleDTO } from './../dtos/correspondencia/nomenclatura-detalle.dto';
import { CampoEntradaDetalleDTO } from './../dtos/correspondencia/campo-entrada-detalle.dto';
import { CorrespondenciaAPIConstant } from './../constants/apis/correspondencia-api.constant';

/**
 * Clase que contiene los servicios del modulo de Correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class CorrespondenciaService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}

  /**
   * Servicio que permite obtener el detalle de una nomenclatura
   *
   * @param idNomenclatura, identificador de la nomenclatura
   * @return DTO con los datos de la nomenclatura
   */
  public getDetalleNomenclatura(idNomenclatura: number): Observable<NomenclaturaDetalleDTO> {
    return this.http.get<NomenclaturaDetalleDTO>(
      CorrespondenciaAPIConstant.GET_DTL_NOMENCLATURA + idNomenclatura
    );
  }

  /**
   * Servicio que permite obtener los campos de la nomenclatura
   *
   * @param idNomenclatura, identificador de la nomenclatura
   * @return DTO con los campos de la nomenclatura
   */
  public getCamposNomenclatura(idNomenclatura: number): Observable<Array<CampoEntradaDetalleDTO>> {
    return this.http.get<Array<CampoEntradaDetalleDTO>>(
      CorrespondenciaAPIConstant.GET_DTL_NOMENCLATURA_CAMPOS + idNomenclatura
    );
  }

  /**
	 * Servicio que permite obtener los datos iniciales para las
	 * solicitudes de consecutivos de correspondencia
	 *
	 * @param idCliente, identificador del cliente autenticado
	 * @return DTO con los datos iniciales
	 */
  public getInitSolicitarConsecutivo(idCliente: number): Observable<InitSolicitarConsecutivoDTO> {
    return this.http.get<InitSolicitarConsecutivoDTO>(
      CorrespondenciaAPIConstant.INIT_CORRESPONDENCIA + idCliente
    );
  }
}
