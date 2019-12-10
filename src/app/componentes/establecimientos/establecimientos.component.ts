import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {EstablecimientosService} from '../../servicios/establecimientos.service';
import {Actividadecon} from '../../dto/actividadecon';
import {Establecimiento} from '../../dto/establecimiento';
import {FormBuilder, FormGroup} from '@angular/forms';

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

  constructor(private ciudService: CiudadanoService,
              private router: Router, private estaServ: EstablecimientosService ,
              private formBuilder: FormBuilder) {
      this.formulario = this.formBuilder.group({
        nombre: []

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
    this.creardialog = false;
  }
}
