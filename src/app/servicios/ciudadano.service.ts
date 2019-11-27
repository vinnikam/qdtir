import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Irespuesta} from '../dto/irespuesta';
import {Contribuyente} from '../dto/contribuyente';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

import {tap} from 'rxjs/operators';

@Injectable()
export class CiudadanoService {
  ciudadanoActivo: Contribuyente;
  rolCiudadano: boolean;

  server: string = 'http://10.180.220.35:7777/';
  urlBuscar: string = 'ServiciosRITDQ/resources/contribuyente';
  urlPredios: string = 'ServiciosRITDQ/resources/consultas/predios/';
  urlVehiculos: string = 'ServiciosRITDQ/resources/consultas/vehiculos/';


  constructor(private http: HttpClient) { }

  buscar(ciudadano: Contribuyente): Promise<Irespuesta> {
    const datos = {
      codTId: ciudadano.tipoDocumento,
      nroId: ciudadano.nroIdentificacion
    }
    return this.http.post<Irespuesta>(`${this.server}${this.urlBuscar}`, datos).toPromise();
  }
  crear(ciudadano: Contribuyente): Promise<Irespuesta> {
    return null; // this.http.post<Irespuesta>(this.server + this.urlBuscar, ciudadano).toPromise();
  }
  consultaPredios(ciudadano: Contribuyente): Promise<Irespuesta> {

    return  this.http.get<Irespuesta>(`${this.server}${this.urlPredios}${ciudadano.idSujeto}`).toPromise();
  }
  consultaVehiculos(_idSujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : _idSujeto
    }
    return  this.http.post<Irespuesta>(`${this.server}${this.urlPredios}`, datos).toPromise();
  }
  consultaActivEcon(_idSujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : _idSujeto
    }
    return null; // this.http.post<Irespuesta>(this.server + this.urlBuscar, ciudadano).toPromise();
  }
  consultaEstablecimientos(_idSujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : _idSujeto
    }
    return null; // this.http.post<Irespuesta>(this.server + this.urlBuscar, ciudadano).toPromise();
  }
  consultaRepresentantes(_idSujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : _idSujeto
    }
    return null; // this.http.post<Irespuesta>(this.server + this.urlBuscar, ciudadano).toPromise();
  }

}
