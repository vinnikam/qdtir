import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

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
import {EnvService} from '../env.service';

@Injectable()
export class CiudadanoService {


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
  ipservidor: string;

  certificadoRit: string;


  // ------ URL PARA TIPO CONTACTO
  url: string; // = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente';
  urluso: string; //  = this.ipservidor + 'ServiciosRITDQ/resources/consultas/consultaruso/';
  urlEditaTelContacto: string; //  = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/editaTelefonoContac/';
  urlEditaCorreoContacto: string; //  = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/editaCorreoContac/';
  urlEditarDirNoti: string; //  = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/editaDirecNotDANE/';
  urlEliminaTelContacto: string; //  = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/eliminaTelefonoContac';
  urlEliminarDirNoti: string; //  = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/eliminaDirecNot/';
  urlEliminaCorreoContacto: string; //  = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/eliminaCorreoContac';


  respuesta: Irespuesta;
  direccion: string;
  aDirCon: any;
  aDirNot: any;
  aDirMai: any;
  aDirTel: any;
  aUnoPor: any;

  validacionDireccion = false;
  validacionRegistroDireccion = false;
  validacionTipoUso = false;

  ciudadanoActivo = new BehaviorSubject<Contribuyente>(null);
  displayDirNotificacion = new BehaviorSubject(true);
  displayAddContacto = new BehaviorSubject(true);
  recargarFormulario = new BehaviorSubject(true);
  actualizaDireccion = new BehaviorSubject(true);


  constructor(private http: HttpClient, private env: EnvService) {
    // this.ciudadanoActivo = null;
    this.ipservidor = env.urlservicios.toString();
    this.url = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente';
    this.urluso = this.ipservidor + 'ServiciosRITDQ/resources/consultas/consultaruso/';
    this.urlEditaTelContacto = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/editaTelefonoContac/';
    this.urlEditaCorreoContacto = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/editaCorreoContac/';
    this.urlEditarDirNoti = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/editaDirecNotDANE/';
    this.urlEliminaTelContacto = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/eliminaTelefonoContac';
    this.urlEliminarDirNoti = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/eliminaDirecNot/';
    this.urlEliminaCorreoContacto = this.ipservidor + 'ServiciosRITDQ/resources/contribuyente/eliminaCorreoContac';

    this.certificadoRit = `${this.ipservidor}${valores.certificadoRit}`;

  }




  buscar(ciudadano: Contribuyente): Promise<Irespuesta> {
    const datos = {
      codTId: ciudadano.tipoDocumento,
      nroId: ciudadano.nroIdentificacion
    };
    return this.http.post<Irespuesta>(`${this.ipservidor}${this.urlBuscar}`, datos).toPromise();
  }
  crear(ciudadano: Contribuyente): Promise<Irespuesta> {

    return this.http.post<Irespuesta>(`${this.ipservidor}${this.urlcrear}`, ciudadano).toPromise();
  }
  consultaDescuento1(_idsujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : _idsujeto
    };
    return  this.http.post<Irespuesta>(`${this.ipservidor}${this.urldescuento1}`, datos).toPromise();
  }

  actualizanotificaciones(buzon: number, notif: number, idsujeto: number) {
    const datos = {
      buzonActivo : buzon,
      notifElecActivo : notif,
      idSujeto : idsujeto
    };
    return  this.http.post<Irespuesta>(`${this.ipservidor}${this.urlactuadescuento1}`, datos).toPromise();

  }
  consultaHistoDireccNot(idSujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto
    };
    return  this.http.post<Irespuesta>(`${this.ipservidor}${this.urlHistoDireccionNotif}`, datos).toPromise();
  }

  consultaPredios(_idsujeto: number): Promise<Irespuesta> {

    return  this.http.get<Irespuesta>(`${this.ipservidor}${this.urlPredios}${_idsujeto}`).toPromise();
  }

  consultaVehiculos(_idsujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : _idsujeto
    };
    return  this.http.post<Irespuesta>(`${this.ipservidor}${this.urlVehiculos}`, datos).toPromise();
  }
  getPaises(): Promise<Irespuesta> {
    const datos = {
      codigo : 0
    };
    return  this.http.post<Irespuesta>(`${this.ipservidor}${this.urlPaises}`, null).toPromise();
  }
  getDeptos(dato: number): Promise<Irespuesta> {
    const datos = {
      codigo : dato
    };
    return this.http.post<Irespuesta>(`${this.ipservidor}${this.urlDeptos}`, datos).toPromise();
  }
  getMunic(dato: number): Promise<Irespuesta> {
    const datos = {
      codigo : dato
    };
    return this.http.post<Irespuesta>(`${this.ipservidor}${this.urlmunic}`, datos).toPromise();
  }
  registrarContacto(contacto: Contacto, urlFinal: string): Observable<Irespuesta>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Irespuesta>(urlFinal, contacto,{headers: headers});
  }



  eliminarContacto(contacto: Datacontacto, urlFinal: string): Observable<Irespuesta>  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Irespuesta>(urlFinal, contacto, {headers: headers});

  }



  consultarDatos(tipoDocumento: string, numeroDocumento: string): Irespuesta {

    if (tipoDocumento != null && numeroDocumento != null) {
      this.consultarContribuyente(tipoDocumento, numeroDocumento).then((value: Irespuesta) => {
        this.respuesta  = value;
        this.aDirCon = this.respuesta.contribuyente.dirContacto ;
        this.aDirNot = this.respuesta.contribuyente.dirContactoNot ;
        this.aDirMai = this.respuesta.contribuyente.email ;
        this.aDirTel = this.respuesta.contribuyente.telefonos ;
        this.aUnoPor = this.respuesta.contribuyente.aplicaDescuento ;
        this.direccion = this.respuesta.contribuyente.dirContactoNot[0].direccion;
        console.log('los telefonos--->', JSON.stringify(this.aDirTel));
      })
        .catch((err: HttpErrorResponse) => {
          console.log(err);
          if (err.status !== 200) {
          }
        });


    }

    return this.respuesta;

  }

  consultarContribuyente(tipo: string, numero: string): Promise<Irespuesta>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = {codTId: tipo, nroId: numero};

    return this.http.post<Irespuesta>(this.url, params,{ headers: headers}).toPromise();

  }



}
