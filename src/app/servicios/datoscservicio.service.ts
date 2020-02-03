import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Contribuyente} from '../dto/contribuyente';
import {Irespuesta} from '../dto/irespuesta';
import {Telefono} from '../dto/telefono';
import {Correo} from '../dto/correo';
import {Direccion} from '../dto/direccion';
import {CiudadanoService} from "./ciudadano.service";


@Injectable()
export class DatoscservicioService {


  displayDirNotificacion: boolean;
  direccion: string;
  url: string;
  respuesta: Irespuesta;

  aDirCon: any;
  aDirNot: any;
  aDirMai: any;
  aDirTel: any;
  aUnoPor: any;

  constructor(private http: HttpClient, private  ciudService: CiudadanoService) {
    this.url = ciudService.url;
    this.displayDirNotificacion = false;


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


  consultaTelefonos(idSujeto: number): Promise<Telefono[]> {
    return null;
  }
  consultaCorreos(idSujeto: number): Promise<Correo[]> {
    return null;
  }
  consultaDirecciones(idSujeto: number): Promise<Direccion> {
    return null;
  }
  borraTelefonos(idSujeto: number, idDato: number): Promise<Irespuesta> {
    return null;
  }
  borraCorreos(idSujeto: number, idDato: number): Promise<Irespuesta> {
    return null;
  }
  borraDirecciones(idSujeto: number, idDato: number): Promise<Irespuesta> {
    return null;
  }
  creaTelefonos(idSujeto: number, datos: Telefono): Promise<Irespuesta> {
    return null;
  }
  creaCorreos(idSujeto: number, datos: Correo): Promise<Irespuesta> {
    return null;
  }
  creaDirecciones(idSujeto: number, datos: Direccion): Promise<Irespuesta> {
    return null;
  }


}
