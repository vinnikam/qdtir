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
  token;

  constructor(private _authService: AuthServiceService,
              private router: Router, private _ciudadservice: CiudadanoService,
              private messageService: MessageService) { }

  ngOnInit() {
  }
  validar() {
    if (this._authService.autentAdmin(this.usuario, this.clave)) {

      const x: Promise<Irespuesta> = this._authService.crearTk(this.usuario, this.clave);

      x.then((value: Irespuesta) => {

        this.respuesta = value;
        this.token = this.respuesta.token;
      })
        .catch((err) => {
          this.messageService.add({key: 'custom', severity: 'error', summary: 'Información',
            detail: 'Error tecnico al obtener token .', closable: true});
        });
      localStorage.setItem('id_token', this.token);
      this.router.navigate(['gestionfuncionario']);

    } else {
      this.messageService.add({key: 'custom', severity: 'error', closable: false, life: 2000,
        summary: 'Información', detail: 'Datos de autenticacion incorrectos, verifique e intente de nuevo! '});

      this.router.navigate(['autenticaadmin']);
    }

  }

}
