import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-datos-contacto',
  templateUrl: './datos-contacto.component.html',
  styleUrls: ['./datos-contacto.component.css']
})
export class DatosContactoComponent implements OnInit {

  constructor(private ciudService: CiudadanoService,
              private router: Router, private messageService: MessageService) {
    if (this.ciudService.ciudadanoActivo === null) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
      detail: 'No hay ciudadano activo. ', closable: true});
      // alert('No hay ciudadano activo')
      this.router.navigate(['/crearciu']);
    }

  }

  ngOnInit() {
  }

}
