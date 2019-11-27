import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit {

  constructor(private _authService: AuthServiceService,
              private router: Router) { }

  ngOnInit() {
  }
  ingresarFuncionario() {
    this._authService.ingresarFuncionario();
    this.router.navigate(['/crearciu']);
    return false;

  }
}
