import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {Contribuyente} from '../../dto/contribuyente';
import {FormBuilder} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-autenticarciud',
  templateUrl: './autenticarciud.component.html',
  styleUrls: ['./autenticarciud.component.css']
})
export class AutenticarciudComponent implements OnInit {
  elCiudadano: Contribuyente;
  private respuesta: Irespuesta;

  constructor(private _authService: AuthServiceService,
              private router: Router, private  _ciudadano : CiudadanoService, private messageService: MessageService) {
    this.elCiudadano = new Contribuyente();
    this._authService.salir();
    console.log('Inicio autenticar ciudadano');
  }

  ngOnInit() {
  }
  autenticar() {
    const x: Promise<Irespuesta> = this._authService.loginCiudadano(this.elCiudadano);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert('Consumio servicio autenticacion');
      if (true) {
        this._authService.ingresarCiudadano(this.elCiudadano.tipoDocumento, this.elCiudadano.nroIdentificacion);
       // this.router.navigate(['/crearciu']);



        this.router.navigate(['/crearbus']);

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Verifique sus credenciales. ', closable: true});
        // alert();
        this._ciudadano.autenticado = null;
      }

    // return false;

    })
      .catch((err ) => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en servicio autenticacion ciudadano ', closable: true});
        // alert('Error tecnico en la consulta de autenticacion del ciudadano' + err) ;
      });
  }
}
