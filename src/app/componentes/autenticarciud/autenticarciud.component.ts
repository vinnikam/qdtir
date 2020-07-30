import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {Contribuyente} from '../../dto/contribuyente';
import {FormBuilder} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
import {Irtaoam} from '../../dto/irtaoam';

import {UtilidadesService} from '../../servicios/utilidades.service';
import {Basicovo} from '../../dto/basicovo';
import {todostiposiden} from '../../config/Propiedades';

declare var Context: any;

@Component({
  selector: 'app-autenticarciud',
  templateUrl: './autenticarciud.component.html',
  styleUrls: ['./autenticarciud.component.css']
})
export class AutenticarciudComponent implements OnInit {
  elCiudadano: Contribuyente;
  private respuesta: Irespuesta;
  private rtaoam: Irtaoam;
  private urlWSlogin: string;

  tipoId: string;
  numId: string;

  fecha: string;

  esExterno = false;

  msgs: Message[] = [];

  tiposDocumento ?: Basicovo[];



  constructor(private authService: AuthServiceService,
              private router: Router, private  ciudService: CiudadanoService,
              private messageService: MessageService, private rutaExt: ActivatedRoute,
              private util: UtilidadesService) {
    this.elCiudadano = new Contribuyente();
    this.authService.salir();
    // console.log('Inicio autenticar ciudadano');

  }

  ngOnInit() {
    this.tiposDocumento = todostiposiden;

    const dato  =  this.authService.claro;
    if (dato !== undefined) {
      const claro = this.util.desencryp(dato);
      this.tipoId = claro.split('-')[0];
      this.numId = claro.split('-')[1];
      this.fecha = claro.split('-')[2];
      this.esExterno =  this.validaExterno ();
      if (this.esExterno) {
        this.authService.ingresarCiudadano(this.elCiudadano.tipoDocumento, this.elCiudadano.nroIdentificacion);
        this.router.navigate(['/crearbus']);
      }
    }



    /*this.urlWSlogin = localStorage.getItem('wsLogin');
    if (this.urlWSlogin === null) {
      const x: Promise<Irespuesta> = this.authService.consultaPropiedad('wsLogin');
      x.then((value: Irespuesta) => {
        this.respuesta = value;
        if (this.respuesta.codigoError === '0') {
          localStorage.setItem('wsLogin', this.respuesta.mensaje);
          this.urlWSlogin = this.respuesta.mensaje;

        } else {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'No se cargo la ruta de WS-OAM. . ', closable: true});
        }
      })
        .catch((err ) => {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'Error tecnico en servicio consulta propiedad ', closable: true});
        });
    }
    */


  }
  autenticar() {


    /*if (true) {
      this.authService.ingresarCiudadano(this.elCiudadano.tipoDocumento, this.elCiudadano.nroIdentificacion);
      this.router.navigate(['/crearbus']);
      return ;
    }*/
    const x: Promise<Irtaoam> = this.authService.loginCiudadano(this.elCiudadano);
    x.then((value: Irtaoam) => {
      this.rtaoam = value;
      // alert('Consumio servicio autenticacion');
      if (this.rtaoam.authenticated !== 'false') {
        this.authService.ingresarCiudadano(this.elCiudadano.tipoDocumento, this.elCiudadano.nroIdentificacion);
        this.router.navigate(['/crearbus']);

      } else {
        // this.msgs = [];
        // this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'La fecha seleccionada es mayor a hoy. Verifique y continue.'});
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: this.rtaoam.responseDescription, closable: true});
        this.ciudService.autenticado = null;
      }

    })
      .catch((err ) => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en servicio autenticacion ciudadano ', closable: true});
      });
  }

  private validaExterno() {
    if (this.fecha !== undefined && this.numId !== undefined) {
      const hoy = this.util.obtenerFechahoyS('ddMMyyyy');
      if (this.fecha === hoy) {
        this.elCiudadano.tipoDocumento = this.util.convertirtipoidenticorto(this.tipoId);
        this.elCiudadano.nroIdentificacion = this.numId;

        return true;
      }
    }
    this.msgs = [];
    this.msgs.push({severity: 'warn', summary: 'Información:',
    detail: 'Los datos recibidos desde Oficina Virtual no son correctos. Autentiquese de nuevo. '});
    // this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
    //  detail: , closable: true});
    return false;
  }


}
