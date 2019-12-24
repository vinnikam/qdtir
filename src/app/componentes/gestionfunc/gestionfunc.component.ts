import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadanoService } from 'src/app/servicios/ciudadano.service';
import {es} from '../../config/Propiedades';
import {Message, MessageService} from 'primeng/api';
import {Irespuesta} from '../../dto/irespuesta';
import {Basicovo} from '../../dto/basicovo';
import {FuncionarioService} from '../../servicios/funcionario.service';
import {UtilidadesService} from '../../servicios/utilidades.service';


@Component({
  selector: 'app-gestionfunc',
  templateUrl: './gestionfunc.component.html',
  styleUrls: ['./gestionfunc.component.css']
})
export class GestionfuncComponent implements OnInit {

  ocultarCrear: boolean;
  formulario: FormGroup;
  es: any;
  respuesta ?: Irespuesta;





  constructor(private router: Router , private formBuilder: FormBuilder,
              private ciudadServ: CiudadanoService, private funcinarServ: FuncionarioService,
              private messageService: MessageService, private util: UtilidadesService) {

    this.ocultarCrear = true;
    this.formulario = this.formBuilder.group({
      tipoAccion: [1],
      usuario: [],
      fechaInicio: [],
      fechaFin: []
    });


  }

  ngOnInit() {
    this.es = es;
    this.ocultarCrear = true;

  }


  cambiaaccion() {
    if (this.formulario.value.tipoAccion === 1) { // Crear
      this.ocultarCrear = true;
    } else {
      this.ocultarCrear = false;
    }
  }
  ejecutaaccion() {
    if (this.ocultarCrear) {
      this.registraFuncio();
    } else {
      this.inactivarfuncio();
    }
  }
  inactivarfuncio() {

    const x: Promise<Irespuesta> = this.funcinarServ.inactivar(this.formulario.value.usuario,
      this.util.cambiafecha(this.formulario.value.fechaFin));

    x.then((value: Irespuesta) => {

      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Se inactivo el funcionario ' + this.formulario.value.usuario, closable: true});
      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Inconveniente al inactivar el funcionario ' + this.formulario.value.usuario, closable: true});
      }
    })
      .catch((err) => {
        this.messageService.add({key: 'custom', severity: 'error', summary: 'Información',
          detail: 'Error tecnico registrar el funcionario .', closable: true});
      });

  }
  registraFuncio() {
    const x: Promise<Irespuesta> = this.funcinarServ.crear(this.formulario.value.usuario,
      this.util.cambiafecha(this.formulario.value.fechaInicio), this.util.cambiafecha(this.formulario.value.fechaFin));
    this.util.cambiafecha(this.formulario.value.fechaInicio);


    x.then((value: Irespuesta) => {

      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Se registro el funcionario ' + this.formulario.value.usuario, closable: true});
      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Inconveniente al registrar el funcionario ' + this.formulario.value.usuario, closable: true});
      }
    })
      .catch((err) => {
        this.messageService.add({key: 'custom', severity: 'error', summary: 'Información',
          detail: 'Error tecnico registrar el funcionario .', closable: true});

      });


  }

}
