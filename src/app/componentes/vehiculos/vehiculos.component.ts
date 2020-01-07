import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {Representante} from '../../dto/representante';
import {Vehiculo} from '../../dto/vehiculo';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  lista: Vehiculo[];
  respuesta: Irespuesta;

  haydatos: boolean;

  constructor(private ciudService: CiudadanoService,
              private router: Router, private messageService: MessageService) {
    if (this.ciudService.ciudadanoActivo === undefined) {
      // alert('No hay ciudadano activo')
      /*this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'No hay ciudadano activo. ', closable: true});*/
      this.haydatos = false;
      this.router.navigate(['/crearciu']);
    } else {
      if (this.ciudService.ciudadanoActivo !== undefined) {
        this.consultar(this.ciudService.ciudadanoActivo.idSujeto);
      } /*else {
        this.consultar(4881773);
      }*/
    }
  }
  ngOnInit() {
  }
  consultar(idsujeto: number ) {

    const x: Promise<Irespuesta> = this.ciudService.consultaVehiculos(idsujeto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.vehiculos;
        this.haydatos = true;

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: this.respuesta.mensaje, closable: true});

        // alert();

      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en servicio Buscar actividades ', closable: true});
        // alert('Error tecnico en la consulta del servicio Buscar actividades');
      });

  }
}
