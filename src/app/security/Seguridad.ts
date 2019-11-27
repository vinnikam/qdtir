import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthServiceService} from '../servicios/auth-service.service';

@Injectable()
export class Seguridad implements CanActivate {
  constructor(private _authService: AuthServiceService, private router: Router) {

  }

  canActivate() {
    if (this._authService.estaAutenticado()) {
      return true;
    }else {
      this.router.navigate(['/autenticar']);
      return false;
    }
  }


}
