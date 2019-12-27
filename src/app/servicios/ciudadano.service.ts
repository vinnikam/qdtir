import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Irespuesta} from '../dto/irespuesta';
import {Contribuyente} from '../dto/contribuyente';
import {valores} from '../config/Propiedades';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

import {tap} from 'rxjs/operators';
import {Contacto} from '../dto/contacto';
import {Datacontacto} from '../dto/datacontacto';

@Injectable()
export class CiudadanoService {
  ciudadanoActivo: Contribuyente;
  rolCiudadano: boolean;
  autenticado: any;

  // server = 'http://10.180.52.86:7101/';

  urlBuscar = 'ServiciosRITDQ/resources/contribuyente';
  urlPredios = 'ServiciosRITDQ/resources/consultas/predios/';
  urlVehiculos = 'ServiciosRITDQ/resources/consultas/vehiculos/';
  urlPaises = 'ServiciosRITDQ/resources/contribuyente/paises/';
  urlDeptos = 'ServiciosRITDQ/resources/contribuyente/deptos/';
  urlmunic = 'ServiciosRITDQ/resources/contribuyente/municip/';
  urlcrear = 'ServiciosRITDQ/resources/contribuyente/crearcontribuyente/';

  // ------ URL PARA TIPO CONTACTO
  url = 'http://10.180.220.35:7777/ServiciosRITDQ/resources/contribuyente';
  urluso = 'http://10.180.220.35:7777/ServiciosRITDQ/resources/consultas/consultaruso/';
  urlEditaTelContacto = 'http://10.180.220.35:7777/ServiciosRITDQ/resources/contribuyente/editaTelefonoContac/';
  urlEditaCorreoContacto = 'http://10.180.220.35:7777/ServiciosRITDQ/resources/contribuyente/editaCorreoContac/';
  urlEditarDirNoti = 'http://10.180.220.35:7777/ServiciosRITDQ/resources/contribuyente/editaDirecNotDANE/';
  urlEliminaTelContacto = 'http://10.180.220.35:7777/ServiciosRITDQ/resources/contribuyente/eliminaTelefonoContac';
  urlEliminarDirNoti = 'http://10.180.220.35:7777/ServiciosRITDQ/resources/contribuyente/eliminaDirecNot/';
  urlEliminaCorreoContacto = 'http://10.180.220.35:7777/ServiciosRITDQ/resources/contribuyente/eliminaCorreoContac';

  validacionDireccion = false;
  validacionRegistroDireccion = false;
  validacionTipoUso = false;



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
  consultaPredios(_idsujeto: number): Promise<Irespuesta> {

    return  this.http.get<Irespuesta>(`${valores.ip_servidor}${this.urlPredios}${_idsujeto}`).toPromise();
  }
  consultaVehiculos(_idsujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : _idsujeto
    }
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlVehiculos}`, datos).toPromise();
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
  registrarContacto(contacto : Contacto, urlFinal : string): Observable<Irespuesta>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Irespuesta>(urlFinal, contacto,{headers: headers});
  }

  eliminarContacto(contacto : Datacontacto, urlFinal : string): Observable<Irespuesta>  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Irespuesta>(urlFinal, contacto, {headers: headers});

  }



}
