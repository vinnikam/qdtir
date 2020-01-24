import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {Contribuyente} from '../../dto/contribuyente';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-actividades-economicas',
  templateUrl: './actividades-economicas.component.html',
  styleUrls: ['./actividades-economicas.component.css']
})
export class ActividadesEconomicasComponent implements OnInit, OnDestroy {

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
  haydatos = true;

  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;

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

  }
  ngOnInit() {
    this.es = es;
    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente) => {
      this.ciudadanoeActivo = data;
    });
    if (this.ciudadanoeActivo === null || this.ciudadanoeActivo === undefined) {
      this.haydatos = false;
      // this.router.navigate(['/crearciu']);
    } else {
      this.haydatos = true;
      if (this.ciudService.idSujetoActiv !== this.ciudadanoeActivo.idSujeto) {
        this.consultar(this.ciudadanoeActivo.idSujeto);
        this.ciudService.idSujetoActiv = this.ciudadanoeActivo.idSujeto;
      } else {
        if (this.ciudService.listaActiv !== null || this.ciudService.listaActiv !== undefined) {
          this.lista = this.ciudService.listaActiv;
        }
      }
    }

  }
  consultar(idsujeto: number) {

    const x: Promise<Irespuesta> = this.activserv.consultar(idsujeto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.actividades.actContacto;
        this.ciudService.listaActiv = this.lista;

      } else {
        this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
        detail: this.respuesta.mensaje, closable: true});
        this.ciudService.listaActiv = null;


      }
    })
      .catch(() => {
        // alert('Error tecnico en la consulta del servicio Buscar actividades');
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'Error técnico en la consulta del servicio Buscar actividades. ', closable: true});

      });

  }
  vercrear() {
    this.consultarall();


    // alert('click');
  }

  guardar() {

    if (this.ciudService.ciudadanoActivo !== undefined) {
      const jsonString = JSON.stringify(this.formulario.value);
      this.actividades = JSON.parse(jsonString) as Actividad;
      this.actividades.fec_inicio = this.util.cambiafecha(this.actividades.fec_inicio);
      this.actividades.idSujeto = this.ciudadanoeActivo.idSujeto;

      const x: Promise<Irespuesta> = this.activserv.crear(this.actividades);

      x.then((value: Irespuesta) => {
        this.respuesta = value;
        // alert(value);
        if (this.respuesta.codigoError === '0') {
          this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
            detail: 'Se asignó la nueva actividad.', closable: true});
          this.actividades = undefined;
          this.consultar( this.ciudadanoeActivo.idSujeto);

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

      this.actividadesborra.idSujeto = this.ciudadanoeActivo.idSujeto;
      this.actividadesborra.fecCese = this.actividades.fecCese;

      const x: Promise<Irespuesta> = this.activserv.borrar(this.actividadesborra);

      x.then((value: Irespuesta) => {
        this.respuesta = value;
        // alert(value);
        if (this.respuesta.codigoError === '0') {
          this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
            detail: 'Se borró la información.', closable: true});
          this.actividades = undefined;
          this.consultar( this.ciudadanoeActivo.idSujeto);

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
          this.creardialog = true;

        } else {

          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'No cargó lista de actividades.', closable: true});

        }
      })
        .catch(() => {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'Error técnico en la consulta de todas las actividades. ', closable: true});
        });
    }


  }
  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
  }
}
