import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import { Irespuesta } from 'src/app/dto/irespuesta';
import { Predio } from 'src/app/dto/predio';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-predios',
  templateUrl: './predios.component.html',
  styleUrls: ['./predios.component.css']
})
export class PrediosComponent implements OnInit {
  respuesta: Irespuesta;
  predios: Predio[];
  haydatos = true;
  // 5847944,5847644

  constructor(private ciudService: CiudadanoService,
              private router: Router, private messageService: MessageService) {
    if (this.ciudService.ciudadanoActivo === null) {
      // alert('No hay ciudadano activo')
     /* this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'No hay ciudadano activo, proceda a realizar la busqueda y continue. ', closable: true}); */
      this.haydatos = false;
      // this.router.navigate(['/crearciu']);
    } else {
      this.consultar(this.ciudService.ciudadanoActivo.idSujeto);
      this.haydatos = true;

      // this.consultar(5449415);
    }
  }
  ngOnInit() {
  }
  consultar(idsujeto: number){
    const x: Promise<Irespuesta> = this.ciudService.consultaPredios(idsujeto);
    x.then((value: Irespuesta) => {
       this.respuesta = value;

       if (this.respuesta.codigoError === '0') {

        this.predios = this.respuesta.predios;

      } else {
         this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
           detail: this.respuesta.mensaje, closable: true});


      }
    })
      .catch(() => {
        // alert('Error tecnico en la consulta del servicio Buscar');
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en la consulta del servicio Buscar predios', closable: true});

      });


  }

}
