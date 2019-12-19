import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Contribuyente} from '../../dto/contribuyente';
import {Irespuesta} from '../../dto/irespuesta';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {FormBuilder} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';

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

  constructor(private ciudService: CiudadanoService, private autenticservice: AuthServiceService, private messageService: MessageService) {
    this.elCiudadano = new Contribuyente();
    // alert(' Entro -');
  }

  ngOnInit() {
    if (this.autenticservice.datos !== undefined){
      this.elCiudadano.nroIdentificacion = this.autenticservice.datos.nroId;
      this.elCiudadano.tipoDocumento = this.autenticservice.datos.codTId;
      this.buscar();
    }
  }
  buscar() {


    const x: Promise<Irespuesta> = this.ciudService.buscar(this.elCiudadano);
    x.then((value: Irespuesta) => {
       this.respuesta = value;
      // alert('Consumio servicio autenticacion');
       // alert(value);
      if (this.respuesta.codigoError === '0') {
        // alert('Usuario Existe. ');
        // carga el contribuyente
        this.ciudService.ciudadanoActivo = this.respuesta.contribuyente;

      } else {
        // alert(this.respuesta.mensaje);
        this.ciudService.ciudadanoActivo = null;
      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'Error tecnico en la consulta del servicio Buscar', closable: true});

      // alert('Error tecnico en la consulta del servicio Buscar');
        });

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
