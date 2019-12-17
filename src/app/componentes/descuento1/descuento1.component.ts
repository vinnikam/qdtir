import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Establecimiento} from '../../dto/establecimiento';

@Component({
  selector: 'app-descuento1',
  templateUrl: './descuento1.component.html',
  styleUrls: ['./descuento1.component.css']
})
export class Descuento1Component implements OnInit {

  lista: any[];

  constructor(private ciudService: CiudadanoService,
              private router: Router) {
    if (this.ciudService.ciudadanoActivo === null) {
      alert('No hay ciudadano activo')
      this.router.navigate(['/crearciu']);
    } else {

    }

  }

  ngOnInit() {
  }

}
