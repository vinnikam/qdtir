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
import {Funcionario} from '../../dto/funcionario';




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

  lista: Funcionario[];





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
    this.consultaAll();

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
    if (!this.validar(true)) {
      return false;
    }

    const x: Promise<Irespuesta> = this.funcinarServ.inactivar(this.formulario.value.usuario,
      this.util.cambiafecha(this.formulario.value.fechaFin));

    x.then((value: Irespuesta) => {

      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Se inactivo el funcionario ' + this.formulario.value.usuario, closable: true});
        this.limpiar();
        this.consultaAll();
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
    if (!this.validar(false)) {
      return false;
    }
    const x: Promise<Irespuesta> = this.funcinarServ.crear(this.formulario.value.usuario,
      this.util.cambiafecha(this.formulario.value.fechaInicio), this.util.cambiafecha(this.formulario.value.fechaFin));
    this.util.cambiafecha(this.formulario.value.fechaInicio);


    x.then((value: Irespuesta) => {

      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Se registro el funcionario ' + this.formulario.value.usuario, closable: true});
        this.limpiar();
        this.consultaAll();
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

  consultaAll(): void {
    const x: Promise<Irespuesta> = this.funcinarServ.consultarAll();

    x.then((value: Irespuesta) => {

      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.funcionarios;
      }
    })
      .catch((err) => {
        this.messageService.add({key: 'custom', severity: 'error', summary: 'Información',
          detail: 'Error tecnico al consultar funcionarios.', closable: true});
      });
  }
  validar(activar: boolean): boolean {
    const hoy = this.util.obtenerFechahoy();

    if (activar) {
      const ffin = new Date(this.formulario.value.fechaFin);
      if (ffin < hoy ) {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'La fecha de fin, no puede ser menor o igual a la fecha de hoy.', closable: true});
        return false;
      }

      if (!this.buscaFuncio(this.formulario.value.usuario)) {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Usuario que desea inactivar, no se encuentra activo.', closable: true});
        return false;
      }
    }
    if (!activar) {
      const fini = new Date(this.formulario.value.fechaInicio);
      const ffin = new Date(this.formulario.value.fechaFin);
      if (fini >= ffin) {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'La fecha de inicio no puede ser mayor ó igual a la fecha de Fin.', closable: true});
        return false;
      }
      if (fini < hoy) {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'La fecha de inicio no puede ser menor que la fecha de hoy.', closable: true});
        return false;
      }
      if (this.buscaFuncio(this.formulario.value.usuario)) {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Usuario que desea registrar, ya está encuentra activo.', closable: true});
        return false;
      }

    }
    return true;
  }
  buscaFuncio(funcionario: string): boolean {
    let esta = false;
    for (const datof of this.lista) {
      if ( datof.nombre === funcionario) {
        esta = true;
      }
    }
    return esta;
  }
  limpiar(): void {
    this.formulario.controls.fechaInicio.setValue(undefined);
    this.formulario.controls.fechaFin.setValue(undefined);
    this.formulario.controls.usuario.setValue(undefined);

  }
}
