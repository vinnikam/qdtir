import { Injectable } from '@angular/core';
import {CiudadanoService} from './ciudadano.service';

@Injectable()
export class AuthServiceService {
  authToken: any;


  constructor(private ciudService: CiudadanoService) { }

  salir() {

    localStorage.clear();

  }
  ingresar() {
     localStorage.setItem('id_token', 'haytoken');
     this.ciudService.rolCiudadano = true;
  }
  ingresarFuncionario() {
    localStorage.setItem('id_token', 'haytoken');
    this.ciudService.rolCiudadano = false;
  }
  estaAutenticado() {
    this.authToken  = JSON.stringify( localStorage.getItem('id_token'));
    console.log(this.authToken);
    if (this.authToken !== 'null') {
      return true;
    } else {
      return false;
    }
  }
}
