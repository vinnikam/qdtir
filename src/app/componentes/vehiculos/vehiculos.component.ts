import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  constructor(private ciudService: CiudadanoService,
              private router: Router) {
    if (this.ciudService.ciudadanoActivo === null) {
      alert('No hay ciudadano activo')
      this.router.navigate(['/crearciu']);
    }
  }
  ngOnInit() {
  }

}
