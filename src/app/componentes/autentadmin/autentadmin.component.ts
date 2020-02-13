import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {Router} from '@angular/router';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Irespuesta} from '../../dto/irespuesta';
import {Message, MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';




@Component({
  selector: 'app-autentadmin',
  templateUrl: './autentadmin.component.html',
  styleUrls: ['./autentadmin.component.css']
})
export class AutentadminComponent implements OnInit, OnDestroy {
  private respuesta: Irespuesta;
  usuario: string;
  clave: string;
  token;
  actualizaNombreUsu: Subscription;

  constructor(private authService: AuthServiceService,
              private router: Router, private ciudadservice: CiudadanoService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.actualizaNombreUsu = this.authService.actualizaNombreUsu.subscribe((data: string) => {

    });
  }
  validar() {
    if (this.authService.autentAdmin(this.usuario, this.clave)) {

      const x: Promise<Irespuesta> = this.authService.crearTk(this.usuario, this.clave);

      x.then((value: Irespuesta) => {

        this.respuesta = value;
        this.token = this.respuesta.token;
        this.authService.actualizaNombreUsu.next(this.usuario);
      })
        .catch((err) => {
          this.messageService.add({key: 'custom', severity: 'error', summary: 'Información',
            detail: 'Error tecnico al obtener token .', closable: true});
        });
      localStorage.setItem('id_token', this.token);
      this.router.navigate(['gestionfuncionario']);

    } else {
      this.messageService.add({key: 'custom', severity: 'error', closable: false, life: 2000,
        summary: 'Información', detail: 'Datos de autenticacion incorrectos, verifique e intente de nuevo! '});
      this.authService.actualizaNombreUsu.next('');
      this.router.navigate(['admingral']);
    }

  }
  ngOnDestroy(): void {
    this.actualizaNombreUsu.unsubscribe();
  }


}
