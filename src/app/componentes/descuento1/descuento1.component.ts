import {Component, OnDestroy, OnInit} from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Establecimiento} from '../../dto/establecimiento';
import {FormBuilder} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
import {Irespuesta} from '../../dto/irespuesta';
import {Descuentovo} from '../../dto/descuentovo';
import {Subscription} from 'rxjs';
import {Contribuyente} from '../../dto/contribuyente';

@Component({
  selector: 'app-descuento1',
  templateUrl: './descuento1.component.html',
  styleUrls: ['./descuento1.component.css']
})
export class Descuento1Component implements OnInit, OnDestroy {

  lista: Descuentovo[];
  respuesta: Irespuesta;
  haydatos =  true;
  idbuzon = false;
  idnotif =  false;
  confirmarcambio = false;

  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;



  constructor(private ciudService: CiudadanoService,
              private router: Router, private messageService: MessageService) {


  }

  ngOnInit() {
    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente) => {
      this.ciudadanoeActivo = data;
      if (this.ciudService.ciudadanoActivo === null || this.ciudadanoeActivo === undefined) {
        this.messageService.add({key: 'warn', severity: 'warn', summary: 'Información',
          detail: 'Actualmente no hay un contribuyente activo, realice una búsqueda.', closable: true});
        this.haydatos = false;
        // this.router.navigate(['/crearciu']);
      } else {
        this.haydatos = true;
        if (this.ciudService.idSujeto1Des !== this.ciudadanoeActivo.idSujeto) {
          this.consultaDatos();
          this.ciudService.idSujeto1Des = this.ciudadanoeActivo.idSujeto;
        } else {
          if (this.ciudService.listaDesc !== null || this.ciudService.listaDesc !== undefined) {
            this.lista = this.ciudService.listaDesc;
          }
        }
      }
    });


  }
  consultaDatos() {
    const x: Promise<Irespuesta> = this.ciudService.consultaDescuento1(this.ciudadanoeActivo.idSujeto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.descuentos1;
        this.ciudService.listaDesc = this.lista;
        this.cargardatos();

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: this.respuesta.mensaje, closable: true});
        this.ciudService.listaDesc = null;

        // alert();

      }
    })
      .catch(() => {
        // alert('Error tecnico en la consulta del servicio Buscar actividades');
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en la consulta del servicio Buscar', closable: true});

      });
  }
  actualizar(valor) {
    if (valor === 1) {
      console.log(this.idbuzon);
      console.log(this.idnotif);
      let bz = 0;
      let ntf = 0;
      if (this.idbuzon) {
        bz = 1;
      }
      if (this.idnotif) {
        ntf = 1;
      }
      const x: Promise<Irespuesta> = this.ciudService.actualizanotificaciones(bz, ntf, this.ciudadanoeActivo.idSujeto);
      x.then((value: Irespuesta) => {
        this.respuesta = value;
        // alert('Consumio servicio autenticacion');
        // alert(value);
        if (this.respuesta.codigoError === '0') {
          this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
            detail: 'Se actualizaron las notificacoines, a partir de este momento son los valores activos. ', closable: true});
          this.consultaDatos();
        } else {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'No se realizó la actualización de las notificaciones. ', closable: true});
        }
      })
        .catch(() => {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'Error tecnico en la actualización de notificaciones.', closable: true});
        });

    }
    this.confirmarcambio = false;
  }
  verdialog() {
    this.confirmarcambio = true;
  }
  cargardatos() {

    if (this.lista !== undefined && this.lista.length > 0 ) {
      if (this.lista[0].buzon === 1) {
        this.idbuzon = true;
      }
      if (this.lista[0].notificaciones === 1) {
        this.idnotif = true;
      }
    }


  }
  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
  }

}
