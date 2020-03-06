import { Component } from '@angular/core';
import {CiudadanoService} from './servicios/ciudadano.service';
import {AuthServiceService} from './servicios/auth-service.service';
import {Contribuyente} from './dto/contribuyente';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  /*constructor(private ciudService: CiudadanoService, private autenticservice: AuthServiceService) {
    this.ciudService.ciudadanoActivo = undefined;

  }*/


}
