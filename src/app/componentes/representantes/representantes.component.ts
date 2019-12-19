import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {RepresentantesService} from '../../servicios/representantes.service';
import {Irespuesta} from '../../dto/irespuesta';
import {Establecimiento} from '../../dto/establecimiento';
import {Representante} from '../../dto/representante';
import {FormBuilder, FormGroup} from '@angular/forms';
import {es} from '../../config/Propiedades';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-representantes',
  templateUrl: './representantes.component.html',
  styleUrls: ['./representantes.component.css']
})
export class RepresentantesComponent implements OnInit {
  lista: Representante[];
  respuesta: Irespuesta;

  creardialog: boolean;
  borrardialog: boolean;
  formulario: FormGroup;
  formularioborra: FormGroup;
  es: any;
  representante: Representante;
  representanteborra: Representante;


  constructor(private ciudService: CiudadanoService,
              private router: Router, private represerv: RepresentantesService,
              private formBuilder: FormBuilder, private messageService: MessageService) {
    this.formulario = this.formBuilder.group({
      nombre: []

    });
    this.formularioborra = this.formBuilder.group({
      fechaCierre: []

    });
    if (this.ciudService.ciudadanoActivo === null) {
      // alert('No hay ciudadano activo');
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'No hay ciudadano activo. ', closable: true});

      this.router.navigate(['/crearciu']);
    } else {
      if (this.ciudService.ciudadanoActivo !== undefined) {
        this.consultar(this.ciudService.ciudadanoActivo.idSujeto);
      } else {
        this.consultar(484438);
      }

    }
  }
  ngOnInit() {
    this.es = es;
  }
  consultar(idsujeto: number ) {

    const x: Promise<Irespuesta> = this.represerv.consultar(idsujeto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.representantes;

      } else {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: this.respuesta.mensaje, closable: true});

        // alert(this.respuesta.mensaje);

      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en la consulta del servicio Buscar actividades ', closable: true});

        // alert('Error tecnico en la consulta del servicio Buscar actividades');
      });

  }

  crear() {
    this.creardialog = true;
  }
  crearEsta() {

  }
  guardar() {
    this.creardialog = false;
  }
  vercrear() {
    this.creardialog = true;
  }
  verborra(elesta: Representante) {
    this.borrardialog = true;
    this.representanteborra = elesta;
  }
  borrar() {
    const jsonString = JSON.stringify(this.formularioborra.value);
    this.representante = JSON.parse(jsonString) as Representante;
    this.representanteborra.fechaCierre = this.representante.fechaCierre;
    // alert(this.establecimiento);
    const x: Promise<Irespuesta> = this.represerv.borrar(this.representanteborra);

    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        // alert('BORRO ');
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Borró al representnte. ', closable: true});

        this.representante = undefined;
        this.consultar(this.representanteborra.idSujeto);

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No borró al representante.', closable: true});

      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en borrar representante ', closable: true});
        // alert();
      });
    this.creardialog = false;

  }
}
