import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {Router} from '@angular/router';

import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Irespuesta} from '../../dto/irespuesta';
import {Contribuyente} from '../../dto/contribuyente';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormBuilder} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
import {environment} from '../../../environments/environment';
import {FuncionarioService} from '../../servicios/funcionario.service';
import {Subscription} from 'rxjs';
import { EnvService } from 'src/app/env.service';


@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit, OnDestroy {

  elCiudadano: Contribuyente;
  private respuesta: Irespuesta;

  msgs: Message[] = [];
  actualizaNombreUsu: Subscription;

  pt = 'password';
  ra = 'fa fa-eye';
  ipserver: string;
  veripserver: boolean;
  edicion = false;



  constructor(private authService: AuthServiceService,
              private router: Router, private ciudadService: CiudadanoService,
              private messageService: MessageService, private funcioservice: FuncionarioService,
              private env: EnvService) {

    this.elCiudadano = new Contribuyente();
    this.authService.salir();
    this.ipserver = env.urlservicios.toString();
    // alert('Direccion de servicios - - -  -' + env.urlservicios.toString());
    this.veripserver = false;
    if (env.enableDebug.toString() === '1') {
      this.veripserver = true;
    }
  }

  ngOnInit() {
    this.actualizaNombreUsu = this.authService.actualizaNombreUsu.subscribe((data: string) => {

    });
    // console.log('- - - - -' + environment.production);
    // console.log('- - - - -' + environment.ipserver);
  }
  ingresarFuncionario() {
    if (this.valido()) {
      this.autorizado();

    }


  }

  private valido() {
    if ( this.elCiudadano.usuario === undefined ) {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: '', detail: 'El nombre de usuario es requerido. '});
      return false;

    }
    if ( this.elCiudadano.clave === undefined ) {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: '', detail: 'la clave es requerida. '});
      return false;

    }

    return this.autorizado();
  }
  autorizado(): void {

    const x: Promise<Irespuesta> = this.funcioservice.consulta(this.elCiudadano.usuario);

    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        if (this.respuesta.permisosfuncionario.codigo === '2') {
          this.edicion = true;
        } else {
          this.edicion = false;
        }
        this.autenticar();
      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'El funcionario [' + this.elCiudadano.usuario + '], no esta autorizado.', closable: true});
      }
    })
    .catch((err) => {
      this.messageService.add({key: 'custom', severity: 'error', summary: 'Información',
        detail: 'Error técnico al autenticar el funcionario .', closable: true});
    });

  }
  autenticar(): void {

    const x: Promise<Irespuesta> = this.authService.loginFuncionario(this.elCiudadano);
    x.then((value: Irespuesta) => {
      this.respuesta = value;

      if (this.respuesta.codigoError === '0') {
        this.ciudadService.rolCiudadano = false ;
        this.authService.ingresarFuncionario(this.respuesta.token, this.edicion);

        this.authService.actualizaNombreUsu.next(this.elCiudadano.usuario);
        this.router.navigate(['crearbus']);

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Verifique su nombre de usuario y/o contraseña. ', closable: true});
        this.authService.actualizaNombreUsu.next('');
      }

    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error técnico en la consulta de autenticación del funcionario', closable: true});

      });
  }
  ngOnDestroy(): void {
    this.actualizaNombreUsu.unsubscribe();
  }
}
