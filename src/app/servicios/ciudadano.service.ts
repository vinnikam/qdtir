import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Irespuesta} from '../dto/irespuesta';
import {Contribuyente} from '../dto/contribuyente';
import {valores} from '../config/Propiedades';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

import {tap} from 'rxjs/operators';

@Injectable()
export class CiudadanoService {
  ciudadanoActivo: Contribuyente;
  rolCiudadano: boolean;

  // server: string = 'http://127.0.0.1:7101/';

  urlBuscar: string = 'ServiciosRITDQ/resources/contribuyente';
  urlPredios: string = 'ServiciosRITDQ/resources/consultas/predios/';
  urlVehiculos: string = 'ServiciosRITDQ/resources/consultas/vehiculos/';
  urlPaises: string = 'ServiciosRITDQ/resources/contribuyente/paises/';
  urlDeptos: string = 'ServiciosRITDQ/resources/contribuyente/deptos/';
  urlmunic: string = 'ServiciosRITDQ/resources/contribuyente/municip/';
  urlcrear: string = 'ServiciosRITDQ/resources/contribuyente/crearcontribuyente/';



  constructor(private http: HttpClient) { }

  buscar(ciudadano: Contribuyente): Promise<Irespuesta> {
    const datos = {
      codTId: ciudadano.tipoDocumento,
      nroId: ciudadano.nroIdentificacion
    }
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBuscar}`, datos).toPromise();
  }
  crear(ciudadano: Contribuyente): Promise<Irespuesta> {
    const datos = {
      tipoPersona: 1
    }
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlcrear}`, ciudadano).toPromise();
  }
  consultaPredios(ciudadano: Contribuyente): Promise<Irespuesta> {

    return  this.http.get<Irespuesta>(`${valores.ip_servidor}${this.urlPredios}${ciudadano.idSujeto}`).toPromise();
  }
  consultaVehiculos(_idsujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : _idsujeto
    }
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlPredios}`, datos).toPromise();
  }
  getPaises(): Promise<Irespuesta> {
    const datos = {
      codigo : 0
    }
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlPaises}`, null).toPromise();
  }
  getDeptos(dato: number): Promise<Irespuesta> {
    const datos = {
      codigo : dato
    }
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlDeptos}`, datos).toPromise();
  }
  getMunic(dato: number): Promise<Irespuesta> {
    const datos = {
      codigo : dato
    }
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlmunic}`, datos).toPromise();
  }



}
