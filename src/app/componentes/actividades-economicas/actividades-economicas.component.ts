import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {ActividadesService} from '../../servicios/actividades.service';
import {Irespuesta} from '../../dto/irespuesta';
import {Actividadecon} from '../../dto/actividadecon';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-actividades-economicas',
  templateUrl: './actividades-economicas.component.html',
  styleUrls: ['./actividades-economicas.component.css']
})
export class ActividadesEconomicasComponent implements OnInit {
  lista: any[];
  respuesta: Irespuesta;
  creardialog: boolean;
  formulario: FormGroup;

  constructor(private ciudService: CiudadanoService,
              private router: Router, private activserv: ActividadesService,
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
      } else {
        this.consultar(9732551);
      }
    }
  }
  ngOnInit() {
  }
  consultar(idsujeto: number) {

    const x: Promise<Irespuesta> = this.activserv.consultar(idsujeto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.actividades;

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
