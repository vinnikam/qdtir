import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Contribuyente} from '../../dto/contribuyente';
import {Irespuesta} from '../../dto/irespuesta';
import {AuthServiceService} from '../../servicios/auth-service.service';

@Component({
  selector: 'app-ciudadano',
  templateUrl: './ciudadano.component.html',
  styleUrls: ['./ciudadano.component.css']
})
export class CiudadanoComponent implements OnInit {
  tipoiden: string;
  identificacion: string;
  elCiudadano: Contribuyente;

  private respuesta: Irespuesta;

  constructor(private ciudService: CiudadanoService, private autenticservice: AuthServiceService) {
    this.elCiudadano = new Contribuyente();
  }

  ngOnInit() {
    this.autenticservice.
  }
  buscar() {

    const x: Promise<Irespuesta> = this.ciudService.buscar(this.elCiudadano);
    x.then((value: Irespuesta) => {
       this.respuesta = value;
      // alert('Consumio servicio autenticacion');
       alert(value);
      if (this.respuesta.codigoError === '0') {
        alert('Usuario Existe. ');
        // carga el contribuyente
        this.ciudService.ciudadanoActivo = this.respuesta.contribuyente;

      } else {
        alert(this.respuesta.mensaje);
        this.ciudService.ciudadanoActivo = null;
      }
    })
      .catch(() => {alert('Error tecnico en la consulta del servicio Buscar'); });

    /*
    const  ciudadano = {
      tipoiden: this.tipoiden,
      identificacion: this.identificacion
    };
    this.ciudService.buscar(elCiudadano);
    if (this.elCiudadano !== null) {
      alert('Existe');
    } else {
      alert('No existe');
    }*/

  }
  nuevaBusqueda() {
    this.ciudService.ciudadanoActivo = null;
  }
}
