import {Component, OnDestroy, OnInit} from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import { Irespuesta } from 'src/app/dto/irespuesta';
import { Predio } from 'src/app/dto/predio';
import {Message, MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {Contribuyente} from '../../dto/contribuyente';

@Component({
  selector: 'app-predios',
  templateUrl: './predios.component.html',
  styleUrls: ['./predios.component.css']
})
export class PrediosComponent implements OnInit, OnDestroy {
  respuesta: Irespuesta;
  predios: Predio[];
  haydatos = true;
  // 5847944,5847644

  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;


  constructor(private ciudService: CiudadanoService,
              private router: Router, private messageService: MessageService) {
  }
  ngOnInit() {
    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente) => {
      this.ciudadanoeActivo = data;
      if (this.ciudService.ciudadanoActivo === null || this.ciudService.ciudadanoActivo === undefined) {
        this.haydatos = false;
        // this.router.navigate(['/crearciu']);
      } else {
        this.haydatos = true;
        if (this.ciudService.idSujetoPredios !== this.ciudadanoeActivo.idSujeto) {
          this.consultar(this.ciudadanoeActivo.idSujeto);
          this.ciudService.idSujetoPredios = this.ciudadanoeActivo.idSujeto;
        } else {
          if (this.ciudService.listaPred !== null || this.ciudService.listaPred !== undefined) {
            this.predios = this.ciudService.listaPred;
          }
        }
      }
    });

  }
  consultar(idsujeto: number) {
    const x: Promise<Irespuesta> = this.ciudService.consultaPredios(idsujeto);
    x.then((value: Irespuesta) => {
       this.respuesta = value;

       if (this.respuesta.codigoError === '0') {

        this.predios = this.respuesta.predios;
        this.ciudService.listaPred = this.predios;

      } else {
         this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
           detail: this.respuesta.mensaje, closable: true});
         this.ciudService.listaPred = null;

      }
    })
      .catch(() => {
        // alert('Error tecnico en la consulta del servicio Buscar');
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en la consulta del servicio Buscar predios', closable: true});

      });


  }
  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
  }


}
