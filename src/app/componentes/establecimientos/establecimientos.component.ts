import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {EstablecimientosService} from '../../servicios/establecimientos.service';
import {Actividadecon} from '../../dto/actividadecon';
import {Establecimiento} from '../../dto/establecimiento';

@Component({
  selector: 'app-establecimientos',
  templateUrl: './establecimientos.component.html',
  styleUrls: ['./establecimientos.component.css']
})
export class EstablecimientosComponent implements OnInit {

  lista: Establecimiento[];
  respuesta: Irespuesta;

  constructor(private ciudService: CiudadanoService,
              private router: Router, private estaServ: EstablecimientosService ) {
      if (this.ciudService.ciudadanoActivo === null) {
      alert('No hay ciudadano activo');
      this.router.navigate(['/crearciu']);
    } else {
        if (this.ciudService.ciudadanoActivo !== undefined) {
          this.consultar(this.ciudService.ciudadanoActivo.idSujeto);
        }
    }
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
}
