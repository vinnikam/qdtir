import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {CiudadanoService} from "../../servicios/ciudadano.service";
import {Router} from '@angular/router';
import {Irespuesta} from "../../dto/irespuesta";
import {Contribuyente} from "../../dto/contribuyente";

@Component({
  selector: 'app-autenticarciud',
  templateUrl: './autenticarciud.component.html',
  styleUrls: ['./autenticarciud.component.css']
})
export class AutenticarciudComponent implements OnInit {
  private elCiudadano: Contribuyente;
  private respuesta: Irespuesta;

  constructor(private _authService: AuthServiceService,
              private router: Router, private  _ciudadano : CiudadanoService) {
    this.elCiudadano = new Contribuyente();
    console.log("Inicio autenticar ciudadano");
  }


  ngOnInit() {
  }
  autenticar() {
    const x: Promise<Irespuesta> = this._authService.loginCiudadano(this.elCiudadano);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert('Consumio servicio autenticacion');
      if (this.respuesta.authenticated) {
        this._authService.ingresar();
       // this.router.navigate(['/crearciu']);
        const datos = {
          codTId: this.elCiudadano.tipoDocumento,
          nroId: this.elCiudadano.nroIdentificacion
        }
        this._ciudadano.autenticado = datos;

        this.router.navigate(['/crearbus']);

      }else{
        alert('Verifique sus credenciales. ');
        this._ciudadano.autenticado = null;
      }

    //return false;

    })
      .catch((err ) => {alert('Error tecnico en la consulta de autenticacion del ciudadano'+ err) ; });
  }
}
