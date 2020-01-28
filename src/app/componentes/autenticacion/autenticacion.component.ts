import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit {

  elCiudadano: Contribuyente;
  private respuesta: Irespuesta;

  msgs: Message[] = [];

  constructor(private _authService: AuthServiceService,
              private router: Router, private _ciudadservice: CiudadanoService,
              private messageService: MessageService, private funcioservice: FuncionarioService) {
    this.elCiudadano = new Contribuyente();
    this._authService.salir();
  }

  ngOnInit() {
    // console.log('- - - - -' + environment.production);
    // console.log('- - - - -' + environment.ipserver);
  }
  ingresarFuncionario() {
    if (this.valido()) {
      this.autorizado();

    }



  }

  private valido() {
    if( this.elCiudadano.usuario === undefined ) {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: '', detail: 'El nombre de usuario es requerido. '});
      return false;

    }
    if( this.elCiudadano.clave === undefined ) {
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
      this.autenticar();
    } else {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'El funcionario [' + this.elCiudadano.usuario + '], no esta autorizado.', closable: true});
    }
    })
    .catch((err) => {
      this.messageService.add({key: 'custom', severity: 'error', summary: 'Información',
        detail: 'Error técnico registrar el funcionario .', closable: true});
    });

  }
  autenticar(): void {
    const x: Promise<Irespuesta> = this._authService.loginFuncionario(this.elCiudadano);
    x.then((value: Irespuesta) => {
      this.respuesta = value;

      if (this.respuesta.codigoError === '0') {
        this._ciudadservice.rolCiudadano = false ;
        this._authService.ingresarFuncionario(this.respuesta.token);
        this.router.navigate(['crearbus']);

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Verifique su nombre de usuario y/o contraseña. ', closable: true});
      }

    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error técnico en la consulta de autenticación del funcionario', closable: true});

      });
  }
}
