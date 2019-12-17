import { Injectable } from '@angular/core';
import {MenuItem} from 'primeng';
import {AuthServiceService} from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarserviceService {
  items: MenuItem[];

  constructor(private autservice: AuthServiceService) {
    this.items = [];
  }


  getItems() {
    // alert('getitems');
    if (this.autservice.estaAutenticado()) {
      this.items = [];
      if (this.autservice.perfilusuario === 1) {
        this.items.push({label: 'Autenticar Funcionario', icon: 'pi pi-sign-in', routerLink: '/autenticar'});

      } else if (this.autservice.perfilusuario === 2) {

      } else if (this.autservice.perfilusuario === 3) {

      }
      alert('autenticado');


    } else {
      this.items = [];
      this.items.push({label: 'Autenticar Funcionario', icon: 'pi pi-sign-in', routerLink: '/autenticar'});
      this.items.push({label: 'Autenticar Ciudadano', icon: 'pi pi-sign-in', routerLink: '/autenticarCiud'});
      console.log(this.items);
    }
    return this.items;

  }
  mostrar() {
    // this.cargaitems();
    return true;
  }
  cargaitems() {
    if (this.autservice.estaAutenticado()) {
      this.items = [];
      this.items.push({label: 'Autenticar Funcionario', icon: 'pi pi-sign-in', routerLink: '/autenticar'});
      this.items.push({label: 'Autenticar Ciudadano', icon: 'pi pi-sign-in', routerLink: '/autenticarCiud'});
    } else {
      this.items = [];
      this.items.pop();
      console.log(this.items);
    }
  }
}
