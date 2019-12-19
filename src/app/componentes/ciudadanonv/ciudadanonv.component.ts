import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Contribuyente} from '../../dto/contribuyente';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Basicovo} from '../../dto/basicovo';
import {Irespuesta} from '../../dto/irespuesta';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {createElementCssSelector} from '@angular/compiler';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-ciudadanonv',
  templateUrl: './ciudadanonv.component.html',
  styleUrls: ['./ciudadanonv.component.css']
})
export class CiudadanonvComponent implements OnInit {
  contribuyente: Contribuyente;
  tipoPersonaNat: boolean;
  escolombia: boolean ;

  formulario: FormGroup;
  paises ?: Basicovo[];
  deptos ?: Basicovo[];
  municp ?: Basicovo[];

  respuesta ?: Irespuesta;


  constructor(private router: Router , private formBuilder: FormBuilder, private ciudadServ: CiudadanoService, private messageService: MessageService) {
    this.tipoPersonaNat = true;
    this.contribuyente = new Contribuyente();
    this.formulario = this.formBuilder.group({
      tipoPersona: [1],
      nroIdentificacion: [],
      tipoDocumento: [],
      razonsocial: [],
      primerNombre: [],
      segundoNombre: [],
      primerApellido: [],
      segundoApellido: [],
      matriculaMercantil: [],
      estadoRIT: [],
      direccion: [],
      codPostal : [0],
      pais: [0],
      departamento: [0],
      municipio: [0],
      telefono: [],
      nuevoCorreo: [],
      tipoTelefono: [],
      indBuzon: [0],
      notif: [0]
    });


  }

  ngOnInit() {
    this.tipoPersonaNat = true;
    this.formulario.value.tipoPersona = 1;
    this.formulario.value.tipoTelefono = 5;
    this.cargarPaises();
    this.cargarDeptos(49);
    this.cargarMunic(11);
    this.escolombia = true;
  }
  registrar(): void {
    const jsonString = JSON.stringify(this.formulario.value);
    // console.log(jsonString);
    this.contribuyente = JSON.parse(jsonString) as Contribuyente;
    console.log(this.contribuyente);

    // alert(elContribuyente.tipoPersona);
    // alert('ok');
    console.log(this.contribuyente);
    const x: Promise<Irespuesta> = this.ciudadServ.crear(this.contribuyente);
    x.then((value: Irespuesta) => {
      // alert('Carga paises1');
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        // this.paises = this.respuesta.divpolitica;
       //  alert('SE REGISTRO' );
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Se registro el controbuyente..', closable: true});


      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No se registo el contribuyente.', closable: true});

        // alert('NO SE REGISTRO');

      }
    })
      .catch((err) => {
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Error tecnico en la consulta de paises.', closable: true});

        // alert('Error tecnico en la consulta de paises' + err);
      });

  }
  cambiotp() {
    // alert (this.formulario.value.tipoPersona);
    if (this.formulario.value.tipoPersona === 1) { // JURIDICA
      this.tipoPersonaNat = false;
    } else {
      this.tipoPersonaNat = true;
    }
    // alert ('ok ' + this.tipoPersonaNat);

  }
  cargarPaises() {
    const x: Promise<Irespuesta> = this.ciudadServ.getPaises();
    // alert('Carga paises');

    x.then((value: Irespuesta) => {
      // alert('Carga paises1');
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.paises = this.respuesta.divpolitica;
        // alert(this.paises.length);

      } else {
        const  bas = new Basicovo();
        bas.codigo = '49';
        bas.nombre = 'COLOMBIA';
        this.paises[0] = bas;
        // alert(this.respuesta.mensaje);
        // this.ciudService.ciudadanoActivo = null;
      }
    })
      .catch((err) => {
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Error tecnico en la consulta de paises.', closable: true});
      // alert('Error tecnico en la consulta de paises' + err);
      });
  }
  cargarDeptos(pais: number) {
    const x: Promise<Irespuesta> = this.ciudadServ.getDeptos(pais);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        this.deptos = this.respuesta.divpolitica;

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No cargo deptos. ', closable: true});

        // alert();
      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en la consulta de departamentos', closable: true});

        // alert('Error tecnico en la consulta de departamentos');
      });

  }
  cargarMunic(depto: number) {
    const x: Promise<Irespuesta> = this.ciudadServ.getMunic(depto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        this.municp = this.respuesta.divpolitica;

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error en la consulta de municipios. ', closable: true});

      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en borrar Municipios ', closable: true});
      });

}

  cambioPais() {
    // alert(this.formulario.value.pais);
    if (this.formulario.value.pais === '49') {
      this.escolombia = true;
      this.cargarDeptos(this.formulario.value.pais);

    } else {
      this.escolombia = false;

    }

  }
  cambioDepto() {
    this.cargarMunic(this.formulario.value.departamento);
  }
}
