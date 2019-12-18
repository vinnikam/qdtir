import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {NavbarserviceService} from '../../servicios/navbarservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  itemsadm: MenuItem[];
  itemsingreso: MenuItem[];

  itemsciud: MenuItem[];
  itemsfunc: MenuItem[];


  item: MenuItem;


  constructor(private _authservice: AuthServiceService,
              private router: Router, private ciudservic: CiudadanoService) {

    this.itemsingreso = [
      {label: 'Autenticar Funcionario', icon: 'pi pi-sign-in', routerLink: '/autenticar'},
      {label: 'Autenticar Ciudadano', icon: 'pi pi-sign-in', routerLink: '/autenticarCiud'}
    ];

  }

  ngOnInit() {
    // this.items = this.navbarservice.getItems();
    // alert(this.ciudservic.rolCiudadano);
    // this.items = this.navbarservice.getItems();
    // alert('recarga');
     this.itemsingreso = [
      {label: 'Autenticar Funcionario', icon: 'pi pi-sign-in', routerLink: '/autenticar'},
      {label: 'Autenticar Ciudadano', icon: 'pi pi-sign-in', routerLink: '/autenticarCiud'}];

    this.itemsciud = [
        {label: 'Contribuyente', icon: 'pi pi-user-plus',
          items: [
            {label: 'Datos personales', icon: 'pi pi-search-plus', routerLink: '/crearbus'},
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

    this.itemsfunc = [
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
    this.itemsadm = [
      {label: 'Funcionario', icon: 'pi pi-user-plus',
        items: [
          {label: 'Crear / Inactivar', icon: 'pi pi-user-plus', routerLink: '/gestionfuncionario'},
        ]
      },
      {label: 'Salir', icon: 'pi pi-sign-out', command:  (event: Event) => {this.salirAdmin(); }}
    ];
   /* if (this._authservice.perfilusuario === 3) {
        alert('Adiciona');
        this.itemsciud.push( {label: 'Gestion Funcionario', icon: 'pi pi-align-center mx-auto', routerLink: '/gestionfuncionario'});
    }*/



  }
  closeItem(event, index) {
    this.itemsciud = this.itemsciud.filter((item, i) => i !== index);
    event.preventDefault();
  }

  salir() {
    this._authservice.salir();
    // alert ('salir');
    // this._flashMessagesService.show('Salio de la aplicacion', { cssClass: 'alert-success', timeout: 2000 });

    this.router.navigate(['/autenticar']);

  }
  salirAdmin() {
    this._authservice.salir();
    // alert ('salir');
    // this._flashMessagesService.show('Salio de la aplicacion', { cssClass: 'alert-success', timeout: 2000 });

    this.router.navigate(['/autenticaadmin']);

  }
}
