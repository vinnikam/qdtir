import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadanoService } from 'src/app/servicios/ciudadano.service';
import {es} from '../../config/Propiedades';

@Component({
  selector: 'app-gestionfunc',
  templateUrl: './gestionfunc.component.html',
  styleUrls: ['./gestionfunc.component.css']
})
export class GestionfuncComponent implements OnInit {

  opccrear: boolean;
  ocultarCrear: boolean;
  formulario: FormGroup;
  es: any;
  




  constructor(private router: Router , private formBuilder: FormBuilder, private ciudadServ: CiudadanoService) {
    this.opccrear = true;
    this.ocultarCrear = true;
    this.formulario = this.formBuilder.group({
      tipoAccion: [1],
      usuario: [],
      fechaInicio: [],
      fechaFin: []
    });


  }

  ngOnInit() {
    this.es = es;
    this.ocultarCrear = true;
    this.opccrear = true;
  }
  
 
  ejecutaaccion() {
    // alert (this.formulario.value.tipoPersona);
    if (this.formulario.value.tipoAccion === 1) { // Crear
      this.ocultarCrear=true;
    } else {
      this.ocultarCrear = false;
    }
    // alert ('ok ' + this.tipoPersonaNat);
  }


}
