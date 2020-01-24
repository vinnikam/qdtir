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



  constructor(private ciudService: CiudadanoService,
              private router: Router, private estaServ: EstablecimientosService ,
              private formBuilder: FormBuilder, private messageService: MessageService,
              private util: UtilidadesService) {
      this.formulario = this.formBuilder.group({
        nombre: [],
        fechaApertura: [],
        direccion: [],
        telefono1: [],
        codPostal: [],
        pais: ['49'] ,
        municipio: ['11001'],
        ciudad: ['11001'],
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

    const jsonString = JSON.stringify(this.formulario.value);
    this.establecimiento = JSON.parse(jsonString) as Establecimiento;
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
  }
  borrar() {
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

}
