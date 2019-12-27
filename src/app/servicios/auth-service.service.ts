import { Injectable } from '@angular/core';
import {CiudadanoService} from './ciudadano.service';

import {Irespuesta} from '../dto/irespuesta';
import {Contribuyente} from '../dto/contribuyente';
import {HttpClient} from "@angular/common/http";
import {valores} from '../config/Propiedades';

@Injectable()
export class AuthServiceService {
  authToken: any;

  server: string = 'http://127.0.0.1:7101/';
  urlLoginCiudadano: string = 'http://10.180.4.88/SDHLogin/SDHREST/login';
  urlLoginFuncionario: string = 'ServiciosRITDQ/resources/consultas/autenticar';
  urlcreartk: string = 'ServiciosRITDQ/resources/consultas/creatk';
  urlvalidatk: string = 'ServiciosRITDQ/resources/consultas/validatk';


  private doc: string;
  datos: any;
  token: any;
  perfilusuario: number;//1 - ciudadano - 2 funcionario - 3 - admin


  private respuesta: Irespuesta;


  constructor(private ciudService: CiudadanoService, private http: HttpClient) { }

  salir() {

    localStorage.clear();

  }

  /**
   * valida el ciudadano y crea el token
   * @param par
   * @param par2
   */
  ingresarCiudadano(par: string, par2: string) {
    this.token = this.crearTk(par, par2);

    localStorage.setItem('id_token', this.token);
    const datos = {
      codTId: par,
      nroId: par2
    }
    this.datos = datos;
    this.ciudService.rolCiudadano = true;
    this.perfilusuario = 1;
    }
  ingresarFuncionario(token: string) {
    localStorage.setItem('id_token', token);
    this.ciudService.rolCiudadano = false;
    this.perfilusuario = 2;
    }
  estaAutenticado() {
    this.authToken  = JSON.stringify( localStorage.getItem('id_token'));
    console.log(this.authToken);
    if (this.authToken !== 'null') {
      /*
      const x: Promise<Irespuesta> = this.validaTk(this.authToken);
      x.then((value: Irespuesta) => {

        this.respuesta = value;
        if (this.respuesta.codigoError === '0') {
          return true;
        } else {
          return false;
        }

      })
        .catch((err ) => {
          console.log('validacion de tk' + err);

        });
      */
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

  autentAdmin(usuario: string, clave: string): boolean {
    if (usuario === valores.admin && clave === valores.clave) {
      this.token = this.crearTk(usuario, clave);

      localStorage.setItem('id_token', this.token);
      this.ingresaadmin(usuario);
      return true;
    } else {
      return false;
    }

  }
  ingresaadmin(usuario: string) {
    localStorage.setItem('id_token', 'haytoken');
    this.perfilusuario = 3;
  }
  tipoIdentificacion(tipo : string) {

    if ('4' === tipo) {
        this.doc = 'CC';
    } else if ('1' === tipo) {
        this.doc = 'CE';
    } else if ('2' === tipo) {
        this.doc = 'NIT';
    } else if ('3' === tipo) {
        this.doc = 'PA';
    } else if ('0' === tipo) {
        this.doc = 'TE';
    } else if ('5' === tipo) {
        this.doc = 'TI';
    }
    return this.doc;
  }
  crearTk(usuario: string, clave: string) {
    const datosC = {

      usuarioauten: usuario,
      snombre: clave
    }
    return this.http.post<Irespuesta>(`${this.urlcreartk}`, datosC).toPromise();

  }
  validaTk(tk: string) {
    const datosC = {

      token: tk
    }
    return this.http.post<Irespuesta>(`${this.urlvalidatk}`, datosC).toPromise();

  }

}
