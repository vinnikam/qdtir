import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {EstablecimientosService} from '../../servicios/establecimientos.service';
import {Actividadecon} from '../../dto/actividadecon';
import {Establecimiento} from '../../dto/establecimiento';
import {FormBuilder, FormGroup} from '@angular/forms';
import {es} from '../../config/Propiedades';
import {Contribuyente} from '../../dto/contribuyente';

@Component({
  selector: 'app-establecimientos',
  templateUrl: './establecimientos.component.html',
  styleUrls: ['./establecimientos.component.css']
})
export class EstablecimientosComponent implements OnInit {

  lista: Establecimiento[];
  respuesta: Irespuesta;

  creardialog: boolean;
  formulario: FormGroup;
  es: any;
  establecimiento: Establecimiento;


  constructor(private ciudService: CiudadanoService,
              private router: Router, private estaServ: EstablecimientosService ,
              private formBuilder: FormBuilder) {
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
      if (this.ciudService.ciudadanoActivo === null) {
      alert('No hay ciudadano activo');
      this.router.navigate(['/crearciu']);
    } else {
        if (this.ciudService.ciudadanoActivo !== undefined) {
          this.consultar(this.ciudService.ciudadanoActivo.idSujeto);
        }
    }
      this.creardialog = false;
  }

  ngOnInit() {
    this.es = es;
  }
  consultar(idsujeto: number ) {

    const x: Promise<Irespuesta> = this.estaServ.consultar(idsujeto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.establecimientos;
      } else {
        alert(this.respuesta.mensaje);

      }
    })
      .catch(() => {alert('Error tecnico en la consulta del servicio Buscar actividades'); });

  }
  crear() {
    this.creardialog = true;
  }
  crearEsta() {

  }
  guardar() {

    const jsonString = JSON.stringify(this.formulario.value);
    this.establecimiento = JSON.parse(jsonString) as Establecimiento;
    this.establecimiento.idSujeto = this.ciudService.ciudadanoActivo.idSujeto;
    alert(this.establecimiento);
    const x: Promise<Irespuesta> = this.estaServ.crear(this.establecimiento);

    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
         alert('CREO ');

      } else {
        alert('NO CREO ');
      }
    })
      .catch(() => {alert('Error tecnico en guardar establecimiento '); });
    this.creardialog = false;
  }
}
