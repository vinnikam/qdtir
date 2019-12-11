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

@Component({
  selector: 'app-actividades-economicas',
  templateUrl: './actividades-economicas.component.html',
  styleUrls: ['./actividades-economicas.component.css']
})
export class ActividadesEconomicasComponent implements OnInit {

  lista: Actividad[];
  respuesta: Irespuesta;

  formulario: FormGroup;
  formularioborra: FormGroup;
  actividades: Actividad;
  actividadesborra: Actividad;

  creardialog: boolean;
  borrardialog: boolean;
  es: any;

  constructor(private ciudService: CiudadanoService,
              private router: Router, private activserv: ActividadesService,
              private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nombre: []

    });
    this.formularioborra = this.formBuilder.group({
      nombre: []

    });
    if (this.ciudService.ciudadanoActivo === null) {
      alert('No hay ciudadano activo');
      this.router.navigate(['/crearciu']);
    } else {
      if (this.ciudService.ciudadanoActivo !== undefined) {
        this.consultar(this.ciudService.ciudadanoActivo.idSujeto);
      } else {
        this.consultar(363348);
      }
    }
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

      } else {
        alert(this.respuesta.mensaje);

      }
    })
      .catch(() => {alert('Error tecnico en la consulta del servicio Buscar actividades'); });

  }
  vercrear() {
    this.creardialog = true;
    alert('click');
  }

  guardar() {
    this.creardialog = false;
  }
  verborra(elesta: Actividad) {
    this.borrardialog = true;
    this.actividadesborra = elesta;
    alert('?');
  }
  borrar() {
    const jsonString = JSON.stringify(this.formularioborra.value);
    this.actividades = JSON.parse(jsonString) as Actividad;
    this.actividadesborra.fecCese = this.actividades.fecCese;
    // alert(this.establecimiento);
    const x: Promise<Irespuesta> = this.activserv.borrar(this.actividadesborra);

    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        alert('BORRO ');
        this.actividades = undefined;
        this.consultar(this.actividades.idSujeto);

      } else {
        alert('NO BORRO ');
      }
    })
      .catch(() => {alert('Error tecnico en borrar establecimiento '); });
    this.creardialog = false;

  }

}
