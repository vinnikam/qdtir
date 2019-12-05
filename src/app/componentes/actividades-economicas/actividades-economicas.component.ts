import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-actividades-economicas',
  templateUrl: './actividades-economicas.component.html',
  styleUrls: ['./actividades-economicas.component.css']
})
export class ActividadesEconomicasComponent implements OnInit {

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
