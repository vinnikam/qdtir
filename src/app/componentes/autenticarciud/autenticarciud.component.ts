import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {Contribuyente} from '../../dto/contribuyente';
import {FormBuilder} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
import {Irtaoam} from '../../dto/irtaoam';

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

  constructor(private _authService: AuthServiceService,
              private router: Router, private  _ciudadano : CiudadanoService, private messageService: MessageService) {
    this.elCiudadano = new Contribuyente();
    this._authService.salir();
    console.log('Inicio autenticar ciudadano');
  }

  ngOnInit() {
    this.urlWSlogin = localStorage.getItem('wsLogin');
    if (this.urlWSlogin === null) {
      const x: Promise<Irespuesta> = this._authService.consultaPropiedad('wsLogin');
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
  }
  autenticar() {

    const x: Promise<Irtaoam> = this._authService.loginCiudadano(this.urlWSlogin, this.elCiudadano);
    x.then((value: Irtaoam) => {
      this.rtaoam = value;
      // alert('Consumio servicio autenticacion');
      if (this.rtaoam.authenticated !== 'false') {
        this._authService.ingresarCiudadano(this.elCiudadano.tipoDocumento, this.elCiudadano.nroIdentificacion);
        this.router.navigate(['/crearbus']);

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: this.rtaoam.responseDescription, closable: true});
        this._ciudadano.autenticado = null;
      }

    })
      .catch((err ) => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en servicio autenticacion ciudadano ', closable: true});
      });
  }
}
