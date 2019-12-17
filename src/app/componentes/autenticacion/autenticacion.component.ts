import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {Router} from '@angular/router';

import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Irespuesta} from '../../dto/irespuesta';
import {Contribuyente} from '../../dto/contribuyente';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit {
  private elCiudadano: Contribuyente;
  private respuesta: Irespuesta;

  constructor(private _authService: AuthServiceService,
              private router: Router, private _ciudadservice: CiudadanoService) {
    this.elCiudadano = new Contribuyente();
    this._authService.salir();
  }

  ngOnInit() {
  }
  ingresarFuncionario() {

    const x: Promise<Irespuesta> = this._authService.loginFuncionario(this.elCiudadano);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert('Consumio servicio autenticacion');
      if (this.respuesta.codigoError === '0') {
        // alert('Usuario Existe. ');
        this._ciudadservice.rolCiudadano = false ;
        this._authService.ingresarFuncionario(this.elCiudadano.usuario);
        this.router.navigate(['crearbus']);

      } else {
        alert('Verifique sus credenciales. ');
      }
    // this._authService.ingresarFuncionario();

    })
      .catch(() => {alert('Error tecnico en la consulta de autenticacion del funcionario'); });


  }
}
