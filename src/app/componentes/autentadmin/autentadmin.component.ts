import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {Router} from '@angular/router';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Irespuesta} from '../../dto/irespuesta';
import {Message, MessageService} from 'primeng/api';




@Component({
  selector: 'app-autentadmin',
  templateUrl: './autentadmin.component.html',
  styleUrls: ['./autentadmin.component.css']
})
export class AutentadminComponent implements OnInit {
  private respuesta: Irespuesta;
  usuario: string;
  clave: string;

  constructor(private _authService: AuthServiceService,
              private router: Router, private _ciudadservice: CiudadanoService,
              private messageService: MessageService) { }

  ngOnInit() {
  }
  validar() {
    if (this._authService.autentAdmin(this.usuario, this.clave)) {
      this.messageService.add({key: 'custom', severity: 'success', summary: 'Información', detail: 'Usuario correcto. ', closable: true});
      this.router.navigate(['gestionfuncionario']);
    } else {
      this.messageService.add({key: 'custom', severity: 'error', closable: false, life: 2000,
        summary: 'Información', detail: 'Datos incorrectos, intente de nuevo! '});

      this.router.navigate(['autenticaadmin']);
    }

  }

}
