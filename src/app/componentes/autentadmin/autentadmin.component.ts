import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {Router} from '@angular/router';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Irespuesta} from '../../dto/irespuesta';
import {Contribuyente} from '../../dto/contribuyente';

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
              private router: Router, private _ciudadservice: CiudadanoService) { }

  ngOnInit() {
  }
  validar() {
    if (this._authService.autentAdmin(this.usuario, this.clave)) {
      this.router.navigate(['gestionfuncionario']);
    } else {
      this.router.navigate(['autenticaadmin']);
    }

  }
}
