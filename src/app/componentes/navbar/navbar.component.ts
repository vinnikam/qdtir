import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {Router} from '@angular/router';

import {CiudadanoService} from '../../servicios/ciudadano.service';

import {MenuItem} from 'primeng/api';
import {Subscription} from 'rxjs';
import {Contribuyente} from '../../dto/contribuyente';

import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  itemsadm: MenuItem[];
  itemsingreso: MenuItem[];

  itemsciud: MenuItem[];
  itemsfunc: MenuItem[];
  estaAutenticado = false;
  perfilusuario = 0;


  item: MenuItem;

  constribySubscription: Subscription;
  dataSubscription: Subscription;
  actualizaNombreUsu: Subscription;
  nombreusuario = '';

  cambioForm = false;
  contribuyenteActivo: Contribuyente;


  constructor(private authService: AuthServiceService,
              private router: Router,
              private ciudService: CiudadanoService,
              private messageService: MessageService) {

    this.itemsingreso = [
      {label: 'Autenticar Funcionario', icon: 'pi pi-sign-in', routerLink: '/funcionario'},
      {label: 'Autenticar Ciudadano', icon: 'pi pi-sign-in', routerLink: '/contribuyente'}
    ];
    this.estaAutenticado = this.authService.estaAutenticado();

    this.perfilusuario = this.authService.perfilusuario;

  }

  ngOnInit() {
    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente) => {
      this.contribuyenteActivo = data;
    });
    this.dataSubscription = this.ciudService.recargarFormulario.subscribe((data: boolean) => {
      this.cambioForm = data;

    });
    this.actualizaNombreUsu = this.authService.actualizaNombreUsu.subscribe((data: string) => {
      this.nombreusuario = data;
    });

    this.estaAutenticado = this.authService.estaAutenticado();
    this.perfilusuario = this.authService.perfilusuario;

    this.itemsingreso = [
      {label: 'Autenticar Funcionario', icon: 'pi pi-sign-in', routerLink: '/funcionario'},
      {label: 'Autenticar Ciudadano', icon: 'pi pi-sign-in', routerLink: '/contribuyente'},
      {label: 'Gestión Funcionarios', icon: 'pi pi-sign-in', routerLink: '/admingral'}
    ];
    this.itemsciud = [
      {label: 'Contribuyente', icon: 'pi pi-user-plus',
        items: [
          {label: 'Datos personales', icon: 'pi pi-search-plus', routerLink: '/crearbus'},
          {label: 'Datos de Contacto', icon: 'pi pi-id-card', routerLink: '/datoscontacto'},
          {label: 'Datos 1 %', icon: 'pi pi-dollar', routerLink: '/descuento'},
          {label: 'Direcciones Notificacion', icon: 'pi pi-dollar', routerLink: '/historicodir'}
        ]
      },
      {label: 'Datos ICA', icon: 'pi pi-user-plus',
        items: [
          {label: 'Actividades Económicas', icon: 'pi pi-paperclip', routerLink: '/actividades'},
          {label: 'Establecimientos', icon: 'pi pi-sitemap', routerLink: '/establecimientos'},
          {label: 'Representantes', icon: 'pi pi-users', routerLink: '/representantes'}
        ]
      },
      {label: 'Predios', icon: 'pi pi-home', routerLink: '/predios'},
      {label: 'Vehículos', icon: 'pi pi-align-center mx-auto', routerLink: '/vehiculos'}
      // {label: 'Salir', icon: 'pi pi-sign-out', command:  (event: Event) => {this.salir(); }}
    ];


    this.itemsadm = [
      {label: 'Funcionario', icon: 'pi pi-user-plus',
        items: [
          {label: 'Crear / Inactivar', icon: 'pi pi-user-plus', routerLink: '/gestionfuncionario'},
        ]
      }
      // {label: 'Salir', icon: 'pi pi-sign-out', command:  (event: Event) => {this.salirAdmin(); }},

    ];

    this.itemsfunc = [
      {label: 'Contribuyente', icon: 'pi pi-user-plus',
        items: [
          {label: 'Crear', icon: 'pi pi-user-plus', command:  (event: Event) => {this.nvocontriby(); } },
          {label: 'Buscar', icon: 'pi pi-search-plus', command:  (event: Event) => {this.buscarciud(); }},
          {label: 'Información', icon: 'pi pi-search-plus',
            items: [
              {label: 'Personales', icon: 'pi pi-search-plus', routerLink: '/crearbus'},
              {label: 'De Contacto', icon: 'pi pi-id-card', routerLink: '/datoscontacto'},
              {label: 'De notificación', icon: 'pi pi-dollar', routerLink: '/descuento'},
              {label: 'Histórico Direción Ppal.', icon: 'pi pi-dollar', routerLink: '/historicodir'}
            ]
          },
          {label: 'Certificado RIT', icon: 'pi pi-search-plus', command:  (event: Event) => {this.certifRIT(); }}
        ]
      },
      {label: 'Datos ICA', icon: 'pi pi-user-plus',
        items: [
          {label: 'Actividades Económicas', icon: 'pi pi-paperclip', routerLink: '/actividades'},
          {label: 'Establecimientos', icon: 'pi pi-sitemap', routerLink: '/establecimientos'},
          {label: 'Representantes', icon: 'pi pi-users', routerLink: '/representantes'}
        ]
      },
      {label: 'Predios', icon: 'pi pi-home', routerLink: '/predios'},
      {label: 'Vehículos', icon: 'pi pi-align-center mx-auto', routerLink: '/vehiculos'}

      // {label: 'Salir', icon: 'pi pi-sign-out', command:  (event: Event) => {this.salir(); }}
    ];

  }

  buscarciud(): void {
    this.ciudService.ciudadanoActivo.next(null);
    this.router.navigate(['/crearbus']);

  }
  nvocontriby(): void {
    this.ciudService.ciudadanoActivo.next(null);
    this.ciudService.recargarFormulario.next(!this.cambioForm);
    this.router.navigate(['/crearciu']);

  }

  salir(par: number): void {
    this.authService.salir();
    // alert ('salir');
    // this._flashMessagesService.show('Salio de la aplicacion', { cssClass: 'alert-success', timeout: 2000 });
    if (par === 1) {
      this.router.navigate(['/contribuyente']);
    }
    if (par === 2) {
      this.router.navigate(['/funcionario']);
    }
    if (par === 3) {
      this.router.navigate(['/admingral']);
    }


  }
  /* salirAdmin(): void {
    this.authService.salir();
    this.router.navigate(['/admingral']);
  }*/
  certifRIT(): void {
    if (this.contribuyenteActivo !== null) {
      window.location.href = this.contribuyenteActivo.certificadoRit;
    } else {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'Actualmente no hay un ciudadano seleccionado, realice la búsqueda para generar el certificado.', closable: true});
    }

  }
  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
    this.actualizaNombreUsu.unsubscribe();
  }

}
