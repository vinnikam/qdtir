import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Irespuesta} from '../dto/irespuesta';
import {Contribuyente} from '../dto/contribuyente';
import {valores} from '../config/Propiedades';
// tslint:disable-next-line:import-blacklist
import {BehaviorSubject, Observable} from 'rxjs';

import {tap} from 'rxjs/operators';
import {Contacto} from '../dto/contacto';
import {Datacontacto} from '../dto/datacontacto';
import {Establecimiento} from '../dto/establecimiento';
import {Descuentovo} from '../dto/descuentovo';
import {Actividad} from '../dto/actividad';
import {Predio} from '../dto/predio';
import {Representante} from '../dto/representante';
import {Vehiculo} from '../dto/vehiculo';
import {DireccionesHistSujeto} from '../dto/direcciones-hist-sujeto';

@Injectable()
export class CiudadanoService {

  ciudadanoActivo = new BehaviorSubject<Contribuyente>(null);
  listaEsta: Establecimiento[];
  listaDesc: Descuentovo[];
  listaActiv: Actividad[];
  listaPred: Predio[];
  listaRepre: Representante[];
  listaVehi: Vehiculo[];
  listaDirHNot: DireccionesHistSujeto[];

  idSujetoVehiculos = 0;
  idSujetoPredios = 0;
  idSujetoActiv = 0;
  idSujetoRepre = 0;
  idSujetoEstab = 0;
  idSujeto1Des = 0;
  idSujetoHistDir = 0;

  // ciudadanoActivo: Contribuyente;

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
  urldescuento1 = 'ServiciosRITDQ/resources/consultas/descuento1';
  urlactuadescuento1 = 'ServiciosRITDQ/resources/contribuyente/registraAplicaDesc';
  urlHistoDireccionNotif = 'ServiciosRITDQ/resources/contribuyente/dirnotifhist';


  // ------ URL PARA TIPO CONTACTO
  url = valores.ip_servidor + 'ServiciosRITDQ/resources/contribuyente';
  urluso = valores.ip_servidor + 'ServiciosRITDQ/resources/consultas/consultaruso/';
  urlEditaTelContacto = valores.ip_servidor + 'ServiciosRITDQ/resources/contribuyente/editaTelefonoContac/';
  urlEditaCorreoContacto = valores.ip_servidor + 'ServiciosRITDQ/resources/contribuyente/editaCorreoContac/';
  urlEditarDirNoti = valores.ip_servidor + 'ServiciosRITDQ/resources/contribuyente/editaDirecNotDANE/';
  urlEliminaTelContacto = valores.ip_servidor + 'ServiciosRITDQ/resources/contribuyente/eliminaTelefonoContac';
  urlEliminarDirNoti = valores.ip_servidor + 'ServiciosRITDQ/resources/contribuyente/eliminaDirecNot/';
  urlEliminaCorreoContacto = valores.ip_servidor + 'ServiciosRITDQ/resources/contribuyente/eliminaCorreoContac';




  validacionDireccion = false;
  validacionRegistroDireccion = false;
  validacionTipoUso = false;


  displayDirNotificacion = new BehaviorSubject(true);
  displayAddContacto = new BehaviorSubject(true);


  constructor(private http: HttpClient) {
    // this.ciudadanoActivo = null;
  }

  buscar(ciudadano: Contribuyente): Promise<Irespuesta> {
    const datos = {
      codTId: ciudadano.tipoDocumento,
      nroId: ciudadano.nroIdentificacion
    };
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBuscar}`, datos).toPromise();
  }
  crear(ciudadano: Contribuyente): Promise<Irespuesta> {

    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlcrear}`, ciudadano).toPromise();
  }
  consultaDescuento1(_idsujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : _idsujeto
    };
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urldescuento1}`, datos).toPromise();
  }

  actualizanotificaciones(buzon: number, notif: number, idsujeto: number) {
    const datos = {
      buzonActivo : buzon,
      notifElecActivo : notif,
      idSujeto : idsujeto
    };
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlactuadescuento1}`, datos).toPromise();

  }
  consultaHistoDireccNot(idSujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto
    };
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlHistoDireccionNotif}`, datos).toPromise();
  }

  consultaPredios(_idsujeto: number): Promise<Irespuesta> {

    return  this.http.get<Irespuesta>(`${valores.ip_servidor}${this.urlPredios}${_idsujeto}`).toPromise();
  }

  consultaVehiculos(_idsujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : _idsujeto
    };
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlVehiculos}`, datos).toPromise();
  }
  getPaises(): Promise<Irespuesta> {
    const datos = {
      codigo : 0
    };
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlPaises}`, null).toPromise();
  }
  getDeptos(dato: number): Promise<Irespuesta> {
    const datos = {
      codigo : dato
    };
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlDeptos}`, datos).toPromise();
  }
  getMunic(dato: number): Promise<Irespuesta> {
    const datos = {
      codigo : dato
    };
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlmunic}`, datos).toPromise();
  }
  registrarContacto(contacto: Contacto, urlFinal: string): Observable<Irespuesta>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Irespuesta>(urlFinal, contacto,{headers: headers});
  }

  eliminarContacto(contacto: Datacontacto, urlFinal: string): Observable<Irespuesta>  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Irespuesta>(urlFinal, contacto, {headers: headers});

  }






}
