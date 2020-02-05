import {Component, OnDestroy, OnInit} from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Contribuyente} from '../../dto/contribuyente';
import {Irespuesta} from '../../dto/irespuesta';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {FormBuilder} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {UtilidadesService} from '../../servicios/utilidades.service';

@Component({
  selector: 'app-ciudadano',
  templateUrl: './ciudadano.component.html',
  styleUrls: ['./ciudadano.component.css']
})
export class CiudadanoComponent implements OnInit, OnDestroy {
  tipoiden: string;
  identificacion: string;
  elCiudadano: Contribuyente;
  esjuridico = false;


  rolCiudadano = false;

  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;

  private respuesta: Irespuesta;
  certificadoRit = 'http://127.0.0.1:7101/ServiciosRITDQ/certificado?';

  constructor(private ciudService: CiudadanoService, private autenticservice: AuthServiceService,
              private messageService: MessageService, private utilidades: UtilidadesService) {
    this.elCiudadano = new Contribuyente();
    this.esjuridico = false;
  }

  ngOnInit() {
    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente ) => {
      this.ciudadanoeActivo = data;

    });
    if (this.autenticservice.datos !== undefined) {
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



      // this.ciudService.ciudadanoActivo = this.respuesta.contribuyente;
      this.ciudadanoeActivo = this.respuesta.contribuyente;
      this.rolCiudadano = this.ciudService.rolCiudadano;

      // this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
      //  detail: 'Se encontró contribuyente. Puede consultar la información en cada una de las pestañas. ', closable: true});
      this.certificadoRit += 'par1=' + this.utilidades.convertirtipoidenticorto(this.ciudadanoeActivo.tipoDocumento)  +
        '&par2=' + this.ciudadanoeActivo.nroIdentificacion;
      this.respuesta.contribuyente.certificadoRit = this.certificadoRit;
      this.ciudService.ciudadanoActivo.next(this.respuesta.contribuyente);
      if (this.ciudadanoeActivo.naturaleza.codigo === '2') {
        this.esjuridico = true;
      } else {
        this.esjuridico = false;
      }
    } else {
      // alert(this.respuesta.mensaje);
      // this.ciudService.ciudadanoActivo = null;

      this.ciudService.ciudadanoActivo.next(null);
      this.ciudadanoeActivo = null;
      this.rolCiudadano = false;
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
      detail: 'No se encontró contribuyente con los parametros ingresados, intente de nuevo. ', closable: true});
    }
    this.ciudService.idSujetoVehiculos = 0;
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'Error tecnico en la consulta del servicio Buscar', closable: true});

      // alert('Error tecnico en la consulta del servicio Buscar');
        });



  }
  nuevaBusqueda(): void {
    this.ciudService.ciudadanoActivo.next(null);
    this.ciudService.idSujetoVehiculos = 0;
    this.ciudService.idSujetoPredios = 0;
    this.ciudService.idSujetoActiv = 0;
    this.ciudService.idSujetoRepre = 0;
    this.ciudService.idSujetoEstab = 0;
    this.ciudService.idSujeto1Des = 0;

  }

  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
  }

}
