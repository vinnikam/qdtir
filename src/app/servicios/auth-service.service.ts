import { Injectable } from '@angular/core';
import {CiudadanoService} from './ciudadano.service';

import {Irespuesta} from '../dto/irespuesta';
import {Contribuyente} from '../dto/contribuyente';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthServiceService {
  authToken: any;

  server: string = 'http://127.0.0.1:7101/';
  urlLoginCiudadano: string = 'http://10.180.4.88/SDHLogin/SDHREST/login';
  urlLoginFuncionario: string = 'ServiciosRITDQ/resources/consultas/autenticar';
  private doc: string;
  datos: any;
  perfilusuario: number;//1 - ciudadano - 2 funcionario - 3 - admin


  constructor(private ciudService: CiudadanoService, private http: HttpClient) { }

  salir() {

    localStorage.clear();

  }
  ingresar() {
     localStorage.setItem('id_token', 'haytoken');
     this.ciudService.rolCiudadano = true;
     this.perfilusuario = 1;
  }
  ingresarFuncionario(usuario: string) {
    localStorage.setItem('id_token', 'haytoken');
    this.ciudService.rolCiudadano = false;
    this.perfilusuario = 2;
    // VERIFICA QUE SEA ADMINISTRADOR
    if (usuario === 'gabriceno') {
      this.perfilusuario = 3;
    }else {
      this.perfilusuario = 2;
    }
  }
  estaAutenticado() {
    this.authToken  = JSON.stringify( localStorage.getItem('id_token'));
    // console.log(this.authToken);
    if (this.authToken !== 'null') {
      // console.log('autenticado');
      return true;
    } else {
      // console.log('no autenticado');
      return false;
    }
  }


  loginCiudadano(ciudadano: Contribuyente): Promise<Irespuesta> {
    const datosC = {

      tipoDocumento: this.tipoIdentificacion(ciudadano.tipoDocumento),
      numeroDocumento: ciudadano.nroIdentificacion,
      password: ciudadano.clave
    }
    return this.http.post<Irespuesta>(`${this.urlLoginCiudadano}`, datosC).toPromise();
  }
  loginFuncionario(ciudadano: Contribuyente): Promise<Irespuesta> {
    const datosF = {
      usuarioauten: ciudadano.usuario,
      canal: ciudadano.clave
    }
    return this.http.post<Irespuesta>(`${this.server}${this.urlLoginFuncionario}`, datosF).toPromise();
  }


  tipoIdentificacion(tipo : string) {

    if ("4" == tipo) {
        this.doc = "CC";
    } else if ("1" == tipo) {
        this.doc = "CE";
    } else if ("2" == tipo) {
        this.doc = "NIT";
    } else if ("3" == tipo) {
        this.doc = "PA";
    } else if ("0" == tipo) {
        this.doc = "TE";
    } else if ("5" == tipo) {
        this.doc = "TI";
    }
    return this.doc;
  }

}
