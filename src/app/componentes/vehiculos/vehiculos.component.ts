import {Component, OnDestroy, OnInit} from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {Representante} from '../../dto/representante';
import {Vehiculo} from '../../dto/vehiculo';
import {Message, MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {Contribuyente} from '../../dto/contribuyente';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit, OnDestroy {
  lista: Vehiculo[];
  respuesta: Irespuesta;

  haydatos = true;
  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;


  constructor(private ciudService: CiudadanoService,
              private router: Router, private messageService: MessageService) {
  }
  ngOnInit(): void {
    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente) => {
      this.ciudadanoeActivo = data;

      if (this.ciudadanoeActivo !== null) {
        this.haydatos = true;
        if (this.ciudService.idSujetoVehiculos !== this.ciudadanoeActivo.idSujeto) {
          this.consultar(this.ciudadanoeActivo.idSujeto);
          this.ciudService.idSujetoVehiculos = this.ciudadanoeActivo.idSujeto;
        } else {
          if (this.ciudService.listaVehi !== null || this.ciudService.listaVehi !== undefined) {
            this.lista = this.ciudService.listaVehi;
          }
        }

      }
    });
    if (this.ciudService.ciudadanoActivo === null) {
      this.haydatos = false;
    } else {
      this.haydatos = true;
    }
  }
  consultar(idsujeto: number ): void {

    const x: Promise<Irespuesta> = this.ciudService.consultaVehiculos(idsujeto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.vehiculos;
        this.ciudService.listaVehi = this.lista;

      } else {
        this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
          detail: this.respuesta.mensaje, closable: true});
        this.ciudService.listaVehi = null;

      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en servicio Buscar actividades ', closable: true});
      });

  }
  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
  }

}
