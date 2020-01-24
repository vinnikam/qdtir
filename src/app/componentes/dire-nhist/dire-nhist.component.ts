import { Component, OnInit } from '@angular/core';
import {Irespuesta} from '../../dto/irespuesta';
import {Subscription} from 'rxjs';
import {Contribuyente} from '../../dto/contribuyente';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {DireccionesHistSujeto} from '../../dto/direcciones-hist-sujeto';

@Component({
  selector: 'app-dire-nhist',
  templateUrl: './dire-nhist.component.html',
  styleUrls: ['./dire-nhist.component.css']
})
export class DireNhistComponent implements OnInit {

  lista: DireccionesHistSujeto[];
  respuesta: Irespuesta;

  haydatos = true;
  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;

  constructor(private ciudService: CiudadanoService,
              private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente) => {
      this.ciudadanoeActivo = data;

      if (this.ciudadanoeActivo !== null) {
        this.haydatos = true;
        if (this.ciudService.idSujetoHistDir !== this.ciudadanoeActivo.idSujeto) {
          this.consultar(this.ciudadanoeActivo.idSujeto);
          this.ciudService.idSujetoHistDir = this.ciudadanoeActivo.idSujeto;
        } else {
          if (this.ciudService.listaDirHNot !== null || this.ciudService.listaDirHNot !== undefined) {
            this.lista = this.ciudService.listaDirHNot;
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

    const x: Promise<Irespuesta> = this.ciudService.consultaHistoDireccNot(idsujeto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.direccionesHistoN;
        this.ciudService.listaDirHNot = this.lista;

      } else {
        this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
          detail: this.respuesta.mensaje, closable: true});
        this.ciudService.listaVehi = null;

      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en servicio Buscar Historico de Direcciones ', closable: true});
      });

  }
  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
  }

}
