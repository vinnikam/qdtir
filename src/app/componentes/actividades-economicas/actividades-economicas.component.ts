import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {ActividadesService} from '../../servicios/actividades.service';
import {Irespuesta} from '../../dto/irespuesta';
import {Actividadecon} from '../../dto/actividadecon';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Establecimiento} from '../../dto/establecimiento';
import {Actividad} from '../../dto/actividad';
import {es} from '../../config/Propiedades';
import {Message, MessageService} from 'primeng/api';
import {UtilidadesService} from '../../servicios/utilidades.service';

@Component({
  selector: 'app-actividades-economicas',
  templateUrl: './actividades-economicas.component.html',
  styleUrls: ['./actividades-economicas.component.css']
})
export class ActividadesEconomicasComponent implements OnInit {

  lista: Actividad[];
  listaall: Actividad[];
  respuesta: Irespuesta;

  formulario: FormGroup;
  formularioborra: FormGroup;
  actividades: Actividad;
  actividadesborra: Actividad;

  creardialog: boolean;
  borrardialog: boolean;
  es: any;
  haydatos: boolean;

  constructor(private ciudService: CiudadanoService,
              private router: Router, private activserv: ActividadesService,
              private formBuilder: FormBuilder, private messageService: MessageService,
              private util: UtilidadesService) {
    this.formulario = this.formBuilder.group({
      nombre: [],
      fec_inicio: [],
      direccion: [],
      telefono: [],
      idActividad: []

    });
    this.formularioborra = this.formBuilder.group({
      fecCese: []

    });
    if (this.ciudService.ciudadanoActivo === undefined) {
      // alert('No hay ciudadano activo');
      // this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información', detail: 'No hay usuario activo. ', closable: true});
      this.haydatos = false;
      // this.router.navigate(['/crearciu']);
    } else {
      if (this.ciudService.ciudadanoActivo !== undefined) {
        this.consultar(this.ciudService.ciudadanoActivo.idSujeto);
      }
      /*else {
        this.consultar(363348);
      }*/
    }
    this.consultarall();
  }
  ngOnInit() {
    this.es = es;
  }
  consultar(idsujeto: number) {

    const x: Promise<Irespuesta> = this.activserv.consultar(idsujeto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.actividades.actContacto;
        this.haydatos = true;

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: this.respuesta.mensaje, closable: true});
        // alert(this.respuesta.mensaje);

      }
    })
      .catch(() => {
        // alert('Error tecnico en la consulta del servicio Buscar actividades');
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'Error técnico en la consulta del servicio Buscar actividades. ', closable: true});
      });

  }
  vercrear() {
    this.creardialog = true;
    // alert('click');
  }

  guardar() {

    if (this.ciudService.ciudadanoActivo !== undefined) {
      const jsonString = JSON.stringify(this.formulario.value);
      this.actividades = JSON.parse(jsonString) as Actividad;
      this.actividades.fec_inicio = this.util.cambiafecha(this.actividades.fec_inicio);
      this.actividades.idSujeto = this.ciudService.ciudadanoActivo.idSujeto;

      const x: Promise<Irespuesta> = this.activserv.crear(this.actividades);

      x.then((value: Irespuesta) => {
        this.respuesta = value;
        // alert(value);
        if (this.respuesta.codigoError === '0') {
          this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
            detail: 'Se asignó la nueva actividad.', closable: true});
          this.actividades = undefined;
          this.consultar( this.ciudService.ciudadanoActivo.idSujeto);

        } else {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'No pudo asignar la nueva actividad.', closable: true});

        }
      })
        .catch(() => {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'Error técnico en el servicio asignar actividad. ', closable: true});
        });
    }

    // const x: Promise<Irespuesta> = this.activserv.crear(this.actividades.fec_inicio);

    this.creardialog = false;
  }
  verborra(elesta: Actividad) {
    this.borrardialog = true;
    this.actividadesborra = elesta;
    // alert('?');
  }
  borrar() {
    if (this.ciudService.ciudadanoActivo !== undefined) {
      const jsonString = JSON.stringify(this.formularioborra.value);
      this.actividades = JSON.parse(jsonString) as Actividad;


      this.actividades.fecCese = this.util.cambiafecha(this.actividades.fecCese);

      this.actividadesborra.idSujeto = this.ciudService.ciudadanoActivo.idSujeto;
      this.actividadesborra.fecCese = this.actividades.fecCese;

      const x: Promise<Irespuesta> = this.activserv.borrar(this.actividadesborra);

      x.then((value: Irespuesta) => {
        this.respuesta = value;
        // alert(value);
        if (this.respuesta.codigoError === '0') {
          this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
            detail: 'Se borró la información.', closable: true});
          this.actividades = undefined;
          this.consultar( this.ciudService.ciudadanoActivo.idSujeto);

        } else {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'No se borró la información.', closable: true});

        }
      }).catch((err) => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error técnico en el servicio Borrar actividades. ' , closable: true});
        console.log(err);
      });
    } else {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'No hay usuario activo para borrar. ', closable: true});
    }

    this.borrardialog = false;

  }
  consultarall() {
    if (this.listaall === undefined) {
      const x: Promise<Irespuesta> = this.activserv.consultarall();
      x.then((value: Irespuesta) => {
        this.respuesta = value;
        // alert(value);
        if (this.respuesta.codigoError === '0') {

          this.listaall = this.respuesta.actividades.actContacto;

        } else {

          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'No cargó actividades.', closable: true});

        }
      })
        .catch(() => {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'Error técnico en la consulta de todas las actividades. ', closable: true});
        });
    }


  }
}
