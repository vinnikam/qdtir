import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {Router} from '@angular/router';
import {Irespuesta} from "../../dto/irespuesta";
import {Contribuyente} from "../../dto/contribuyente";

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit {
  private elCiudadano: Contribuyente;
  private respuesta: Irespuesta;

  constructor(private _authService: AuthServiceService,
              private router: Router) {
    this.elCiudadano = new Contribuyente();
    console.log("entro dijo la muda");
  }

  ngOnInit() {
  }
  ingresarFuncionario() {
    const x: Promise<Irespuesta> = this._authService.loginFuncionario(this.elCiudadano);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert('Consumio servicio autenticacion');
      if (this.respuesta.codigoError === '0') {
        alert('Usuario Existe. ');
        this.router.navigate(['/crearbus']);

      }else{
        alert('Verifique sus credenciales. ');
      }
    //this._authService.ingresarFuncionario();

    })
      .catch(() => {alert('Error tecnico en la consulta de autenticacion del funcionario'); });

  }


}
