import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// @ts-ignore
import propiedades from '/src/assets/json/propiedades.json';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router ) {
  }

  ngOnInit() {

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
