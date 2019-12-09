import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items1: MenuItem[];

  items2: MenuItem[];

  activeItem: MenuItem;

  constructor(private _authservice: AuthServiceService,
              private router: Router) {
    this.items1 = [
      {label: 'Autenticar Funcionario', icon: 'pi pi-sign-in', routerLink: '/autenticar'},
      {label: 'Autenticar Ciudadano', icon: 'pi pi-sign-in', routerLink: '/autenticarCiud'}
    ];

  }

  ngOnInit() {
    this.items1 = [
      {label: 'Autenticar Funcionario', icon: 'pi pi-sign-in', routerLink: '/autenticar'},
      {label: 'Autenticar Ciudadano', icon: 'pi pi-sign-in', routerLink: '/autenticarCiud'}
    ];
    this.items2 = [
      {label: 'Contribuyente', icon: 'pi pi-user-plus',
        items: [
          {label: 'Crear', icon: 'pi pi-user-plus', routerLink: '/crearciu'},
          {label: 'Buscar', icon: 'pi pi-search-plus', routerLink: '/crearbus'},
          {label: 'Datos de Contacto', icon: 'pi pi-id-card', routerLink: '/datoscontacto'},
          {label: 'Datos 1 %', icon: 'pi pi-dollar', routerLink: '/descuento'}
        ]
      },
      {label: 'Actividades Económicas', icon: 'pi pi-paperclip', routerLink: '/actividades'},
      {label: 'Establecimientos', icon: 'pi pi-sitemap', routerLink: '/establecimientos'},
      {label: 'Representantes', icon: 'pi pi-users', routerLink: '/representantes'},
      {label: 'Predios', icon: 'pi pi-home', routerLink: '/predios'},
      {label: 'Vehículos', icon: 'pi pi-align-center mx-auto', routerLink: '/vehiculos'},
      {label: 'Salir', icon: 'pi pi-sign-out', command:  (event: Event) => {this.salir(); }}
    ];


/*-
*  */

  }
  closeItem(event, index) {
    this.items2 = this.items2.filter((item, i) => i !== index);
    event.preventDefault();
  }

  salir() {
    this._authservice.salir();
    // alert ('salir');
    // this._flashMessagesService.show('Salio de la aplicacion', { cssClass: 'alert-success', timeout: 2000 });
    this.router.navigate(['/autenticar']);

  }
}
