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
import {EnvService} from '../../env.service';




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

  veripserver: boolean;
  ipserver: string;
  urloam: string;

  msgs: Message[] = [];

  creardialog = false;
  modificarFuncio = false;

  constructor(private router: Router , private formBuilder: FormBuilder,
              private ciudadServ: CiudadanoService, private funcinarServ: FuncionarioService,
              private messageService: MessageService, private util: UtilidadesService, private env: EnvService) {

    this.ocultarCrear = true;
    this.formulario = this.formBuilder.group({
      tipoAccion: [1],
      usuario: [],
      fechaInicio: [],
      fechaFin: [],
      permiso: [1]
    });
    this.ipserver = env.urlservicios.toString();
    this.urloam = env.urlciudadano.toString();
    this.veripserver = false;
    if (env.enableDebug.toString() === '1') {
      this.veripserver = true;
    }

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
    this.msgs = [];
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

    const x: Promise<Irespuesta> = this.funcinarServ.inactivar('ADMIN-RIT', this.formulario.value.usuario,
      this.util.cambiafecha(this.formulario.value.fechaFin));

    x.then((value: Irespuesta) => {

      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.pushMsg(1, 'success', 'Información', 'Se inactivo el funcionario ' + this.formulario.value.usuario);
        this.limpiar();
        this.consultaAll();
      } else {
        this.pushMsg(1, 'warn', 'Información', 'Inconveniente al inactivar el funcionario ' + this.formulario.value.usuario);
      }
    })
      .catch((err) => {
        this.pushMsg(1, 'warn', 'Información', 'Error tecnico registrar el funcionario ' + this.formulario.value.usuario);
      });

  }
  registraFuncio() {
    if (!this.validar(false)) {
      return false;
    }
    const x: Promise<Irespuesta> = this.funcinarServ.crear('ADMIN-RIT', this.formulario.value.usuario,
      this.util.cambiafecha(this.formulario.value.fechaInicio), this.util.cambiafecha(this.formulario.value.fechaFin),
      this.formulario.value.permiso);
    this.util.cambiafecha(this.formulario.value.fechaInicio);


    x.then((value: Irespuesta) => {

      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.pushMsg(1, 'success', 'Información', 'Se registro el funcionario ' + this.formulario.value.usuario);
        this.limpiar();
        this.consultaAll();
      } else {
        this.pushMsg(1, 'warn', 'Información', 'Inconveniente al registrar el funcionario ' + this.formulario.value.usuario);
      }
    })
      .catch((err) => {
        this.pushMsg(1, 'error', 'Información', 'Error tecnico registrar el funcionario ' + this.formulario.value.usuario);

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
        this.pushMsg(2, 'error', 'Información', 'Error tecnico al consultar funcionarios');
      });
  }
  validar(activar: boolean): boolean {
    const hoy = this.util.obtenerFechahoy();

    if (activar) {
      const ffin = new Date(this.formulario.value.fechaFin);
      if (ffin < hoy ) {
        this.pushMsg(1, 'warn', 'Información', 'La fecha de fin, no puede ser menor o igual a la fecha de hoy.');
        return false;
      }

      if (!this.buscaFuncio(this.formulario.value.usuario)) {
        this.pushMsg(1, 'warn', 'Información', 'Usuario que desea inactivar, no se encuentra activo.');
        return false;
      }
    }
    if (!activar) {
      const fini = new Date(this.formulario.value.fechaInicio);
      const ffin = new Date(this.formulario.value.fechaFin);
      if (fini >= ffin) {
        this.pushMsg(1, 'warn', 'Información', 'La fecha de inicio no puede ser mayor ó igual a la fecha de Fin.');
        return false;
      }
      if (!this.modificarFuncio && fini < hoy) {
        this.pushMsg(1, 'warn', 'Información', 'La fecha de inicio no puede ser menor que la fecha de hoy.');
        return false;
      }
      if (!this.modificarFuncio &&  this.buscaFuncio(this.formulario.value.usuario)) {
        this.pushMsg(1, 'warn', 'Información', 'Usuario que desea registrar, ya está encuentra activo.');
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
  modificar(funcio: Funcionario): void {

    this.formulario.controls.usuario.setValue(funcio.nombre);
    this.formulario.controls.fechaInicio.setValue(new Date(funcio.fechaInicio));
    this.formulario.controls.fechaFin.setValue(new Date(funcio.fechaFin));
    this.formulario.controls.permiso.setValue(funcio.permisos.codigo);
    this.formulario.controls.tipoAccion.setValue(funcio.estado);
    this.modificarFuncio = true;

  }
  vercrearN(): void  {
    this.vercrear(undefined);
  }
  vercrear(dato: Funcionario): void {
    this.creardialog = true;
    if (dato !== undefined) {
      this.modificar(dato);
    }   else {
      this.modificarFuncio = false;
      this.limpiar();
    }
  }
  // 1 - MSG 2 Messages
  private pushMsg(valor: number, nivel : string, asunto: string, detalle: string ) {
    if (valor === 1) {
      this.msgs.push({severity: nivel, summary: asunto, detail: detalle});
    } else {
      this.messageService.add({key: 'custom', severity: nivel, summary: asunto, detail: detalle, closable: true});
    }

  }
  cerrar(): void {
    this.creardialog = false;
    this.msgs = [];
  }
}

