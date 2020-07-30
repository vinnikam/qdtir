import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import propiedades from '/src/assets/json/propiedades.json';
import {HttpClient} from '@angular/common/http';
import {UtilidadesService} from '../../servicios/utilidades.service';
import {AuthServiceService} from '../../servicios/auth-service.service';

declare var Context: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router, private rutaExt: ActivatedRoute, private util: UtilidadesService, private auth: AuthServiceService ) {
  }

  ngOnInit() {
    const dato  =  this.rutaExt.snapshot.queryParams.par1;
    if (dato !== undefined) {
      const claro = this.util.desencryp(dato);
      this.auth.claro = claro;
      this.ircontribuyente();
    }

  }
  ircontribuyente(): void {
    this.router.navigate(['/contribuyente']);

  }
  irfuncionario(): void {
    this.router.navigate(['/funcionario']);

  }
  iradmin(): void {
    this.router.navigate(['/admingral']);

  }

}
