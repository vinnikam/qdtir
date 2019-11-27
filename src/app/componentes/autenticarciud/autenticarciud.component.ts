import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-autenticarciud',
  templateUrl: './autenticarciud.component.html',
  styleUrls: ['./autenticarciud.component.css']
})
export class AutenticarciudComponent implements OnInit {

  constructor(private _authService: AuthServiceService,
              private router: Router) { }

  ngOnInit() {
  }
  autenticar() {
    this._authService.ingresar();
    this.router.navigate(['/crearciu']);

    return false;

  }
}
