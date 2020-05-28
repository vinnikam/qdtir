import {Component, OnDestroy, OnInit} from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {EstablecimientosService} from '../../servicios/establecimientos.service';
import {Actividadecon} from '../../dto/actividadecon';
import {Establecimiento} from '../../dto/establecimiento';
import {FormBuilder, FormGroup} from '@angular/forms';
import {es} from '../../config/Propiedades';
import {Contribuyente} from '../../dto/contribuyente';
import {Message, MessageService} from 'primeng/api';
import {UtilidadesService} from '../../servicios/utilidades.service';
import {Subscription} from 'rxjs';
import {ValidadorService} from '../../servicios/validador.service';
import {AuthServiceService} from '../../servicios/auth-service.service';

@Component({
  selector: 'app-establecimientos',
  templateUrl: './establecimientos.component.html',
  styleUrls: ['./establecimientos.component.css']
})
export class EstablecimientosComponent implements OnInit, OnDestroy {

  lista: Establecimiento[];
  respuesta: Irespuesta;

  creardialog: boolean;
  borrardialog: boolean;
  formulario: FormGroup;
  formularioborra: FormGroup;
  es: any;
  establecimiento: Establecimiento;
  establecimientoborra: Establecimiento;
  haydatos = true;

  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;

  msgs: Message[] = [];
  fechaInicial: string;
  fechaInicialD: Date;

  permisoedicion = false;



  constructor(private ciudService: CiudadanoService,
              private router: Router, private estaServ: EstablecimientosService ,
              private formBuilder: FormBuilder, private messageService: MessageService,
              private util: UtilidadesService, private autenticservice: AuthServiceService) {
      this.formulario = this.formBuilder.group({
        nombre: [],
        fechaApertura: [],
        matricula: [],
        direccion: [],
        telefono1: [],
        codPostal: ['110001'],
        pais: ['49'] ,
        municipio: ['149'],
        ciudad: ['4003'],
        depto: ['11']

      });
      this.formularioborra = this.formBuilder.group({
        fechaCierre: []

      });

      this.creardialog = false;
      this.borrardialog = false;

  }

  ngOnInit() {
    this.es = es;
    this.formulario.controls.fechaApertura.setValue(this.util.obtenerFechahoy());
    this.formulario.controls.fechaApertura.setValue(this.util.obtenerFechahoy());

    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente) => {
      this.ciudadanoeActivo = data;
      if (this.ciudService.ciudadanoActivo === null || this.ciudService.ciudadanoActivo === undefined ) {
        this.haydatos = false;
      } else {
        this.haydatos = true;
        if (this.ciudService.idSujetoEstab !== this.ciudadanoeActivo.idSujeto) {
          this.consultar(this.ciudadanoeActivo.idSujeto);
          this.ciudService.idSujetoEstab = this.ciudadanoeActivo.idSujeto;
        } else {
          if (this.ciudService.listaEsta !== null || this.ciudService.listaEsta !== undefined) {
            this.lista = this.ciudService.listaEsta;
          }
        }
      }
    });
    this.permisoedicion = this.autenticservice.permisoedicion;
  }
  consultar(idsujeto: number ) {

    const x: Promise<Irespuesta> = this.estaServ.consultar(idsujeto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.establecimientos;
        this.ciudService.listaEsta = this.lista;

      } else {
        this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
          detail: this.respuesta.mensaje, closable: true});
        this.ciudService.listaEsta = undefined;

        // alert();

      }
    })
      .catch(() => {
        // alert('Error tecnico en la consulta del servicio Buscar actividades');
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en la consulta del servicio Buscar', closable: true});

      });

  }
  // VISUALIZA EL DIALOG DE CREAR
  vercrear() {
    this.creardialog = true;
  }

  guardar() {
    if ( !this.valido()) {
      return ;
    }

    const jsonString = JSON.stringify(this.formulario.value);
    this.establecimiento = JSON.parse(jsonString) as Establecimiento;
    this.establecimiento.nombre = this.establecimiento.nombre.toLocaleUpperCase();
    this.establecimiento.idSujeto = this.ciudadanoeActivo.idSujeto;
    // alert(this.establecimiento);
    this.establecimiento.fechaApertura  = this.util.cambiafecha(this.establecimiento.fechaApertura);
    const x: Promise<Irespuesta> = this.estaServ.crear(this.establecimiento);

    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
         this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
         detail: 'Creo el establecimiento.', closable: true});
         this.establecimiento = undefined;
         this.consultar(this.ciudadanoeActivo.idSujeto);
         this.limpiar(1);

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No creó.!', closable: true});
      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en guardar establecimiento ', closable: true});
      // alert();
      });
    this.creardialog = false;
  }
  verborra(elesta: Establecimiento) {
    this.borrardialog = true;
    this.establecimientoborra = elesta;
    this.fechaInicial = this.establecimientoborra.fechaApertura;
    this.fechaInicialD = this.establecimientoborra.fechaAperturaD;
  }
  borrar() {
    const fecha = new Date(this.formularioborra.value.fechaCierre);
    const finicial = new Date(this.fechaInicialD);
    const hoy = this.util.obtenerFechahoy();
    if (fecha < finicial  || fecha > hoy) {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención',
        detail: 'La fecha seleccionada debe ser mayor o igual a la fecha inicial, o es mayor a hoy. Verifique y continue.'});
      return ;
    }
    const jsonString = JSON.stringify(this.formularioborra.value);
    this.establecimiento = JSON.parse(jsonString) as Establecimiento;
    this.establecimiento.fechaCierre = this.util.cambiafecha(this.establecimiento.fechaCierre);
    this.establecimientoborra.idSujeto =  this.ciudadanoeActivo.idSujeto;
    this.establecimientoborra.fechaCierre = this.establecimiento.fechaCierre;
    // alert(this.establecimiento);
    const x: Promise<Irespuesta> = this.estaServ.borrar(this.establecimientoborra);

    x.then((value: Irespuesta) => {
      this.respuesta = value;

      if (this.respuesta.codigoError === '0') {
        this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
          detail: 'Borró el establecimiento.', closable: true});
        this.limpiar(2);

        this.establecimiento = undefined;
        this.consultar(this.ciudadanoeActivo.idSujeto);

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No borró el  establecimiento.', closable: true});

      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en borrar establecimiento.', closable: true});

        });
    this.borrardialog = false;

  }
  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
  }

  valido(): boolean {

    if (this.formulario.value.nombre === '') {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'El nombre es requerida.'});
      return false;
    }
    if (!this.util.validaCampo(this.formulario.value.direccion)) {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'La direccioón es requerida.'});
      return false;
    }
    const fecha = new Date(this.formulario.value.fechaApertura);
    const hoy = this.util.obtenerFechahoy();
    if (fecha > hoy ) {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'La fecha seleccionada es mayor a hoy. Verifique y continue.'});
      return false;
    }
    /*
    if (!this.util.validaCampo(this.formulario.value.codPostal)) {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'El código postal es requerido.'});
      return false;
    }
    if (!this.util.validaLongitudMinMax('' + this.formulario.value.codPostal, 6, 6)) {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'El código postal debe ser de 6 digitos mínimo.'});
      return false;
    }*/
    if (!this.util.validaCampo(this.formulario.value.telefono1)) {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'El teléfono es requerido.'});
      return false;
    }

    return true;
  }
  limpiar(tipo: number): void {
    if (tipo === 1) { // crear
      this.formulario.controls.fechaApertura.setValue(this.util.obtenerFechahoy());
      this.formulario.controls.direccion.setValue(undefined); // "5667"
      this.formulario.controls.telefono1.setValue(undefined); // "5667"
      this.formulario.controls.codPostal.setValue('110001'); // "5667"
      this.formulario.controls.matricula.setValue(undefined); // "5667"
      this.formulario.controls.nombre.setValue(undefined); // "5667"
      this.formulario.controls.pais.setValue('49'); // "5667"
      this.formulario.controls.municipio.setValue('149'); // "5667"
      this.formulario.controls.ciudad.setValue('4003'); // "5667"
      this.formulario.controls.depto.setValue('11'); // "5667"
    }
    if (tipo === 2) { // borrar
      this.formularioborra.controls.fechaCierre.setValue(this.util.obtenerFechahoy());
    }

  }
}
