import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Contribuyente} from '../../dto/contribuyente';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Basicovo} from '../../dto/basicovo';
import {Irespuesta} from '../../dto/irespuesta';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {createElementCssSelector} from '@angular/compiler';
import {Message, MessageService} from 'primeng/api';
import {ValidadorService} from '../../servicios/validador.service';

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


  constructor(private router: Router , private formBuilder: FormBuilder, private ciudadServ: CiudadanoService,
              private messageService: MessageService, private validador: ValidadorService) {
    this.tipoPersonaNat = true;
    this.contribuyente = new Contribuyente();
    this.formulario = this.formBuilder.group({
      tipoPersona: [2],
      nroIdentificacion: ['', Validators.required],
      tipoDocumento: [],
      razonsocial: [ ''],
      primerNombre: [''],
      segundoNombre: [],
      primerApellido: [],
      segundoApellido: [],
      matriculaMercantil: [],
      estadoRIT: [],
      direccion: ['', Validators.required],
      codPostal : [0],
      pais: [0],
      departamento: [0],
      municipio: [],
      telefono: [],
      nuevoCorreo: ['', Validators.required],
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
    // alert (this.formulario.invalid);
    const valido = this.validar();

    if (!valido) {
      return ;
    } else {
      const jsonString = JSON.stringify(this.formulario.value);
      // console.log(jsonString);
      this.contribuyente = JSON.parse(jsonString) as Contribuyente;
      // console.log(this.contribuyente);

      // alert(elContribuyente.tipoPersona);
      // alert('ok');
      // console.log(this.contribuyente);
      const x: Promise<Irespuesta> = this.ciudadServ.crear(this.contribuyente);
      x.then((value: Irespuesta) => {
        // alert('Carga paises1');
        this.respuesta = value;
        if (this.respuesta.codigoError === '0') {
          // this.paises = this.respuesta.divpolitica;
          //  alert('SE REGISTRO' );
          this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
            detail: 'Se registro el contribuyente..', closable: true});
          this.formulario.reset();


        } else {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'No se registro el contribuyente.'+this.respuesta.mensaje, closable: true});

          // alert('NO SE REGISTRO');

        }
      })
        .catch((err) => {
          this.messageService.add({key: 'custom', severity: 'error', summary: 'Información',
            detail: 'Error técnico en el registro del contribuyente.', closable: true});

          // alert('Error tecnico en la consulta de paises' + err);
        });
    }




  }
  validar(): boolean {
    console.log(this.formulario.value);
    if (this.formulario.value.tipoDocumento === null) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El Tipo de  documento es Requerido.', closable: true});
      return false;
    }
    if (this.formulario.value.nroIdentificacion === '') {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El Número de documento es Requerido.', closable: true});
      return false;
    }
    if (this.formulario.value.nroIdentificacion === '') {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El Número de documento es Requerido.', closable: true});
      return false;
    }
    if (this.formulario.value.tipoPersona === 2) {
      // PERSONA NATURAL
      if (this.formulario.value.primerNombre === '') {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
          detail: 'El primer nombre es Requerido.', closable: true});
        return false;
      }
      if (this.formulario.value.primerApellido === '') {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
          detail: 'El segundo nombre es Requerido.', closable: true});
        return false;
      }

    } else {
      if (this.formulario.value.razonsocial === '') {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
          detail: 'La razón social es requerida.', closable: true});
        return false;
      }

    }
    if (this.formulario.value.direccion === '') {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'La direccioón es requerida.', closable: true});
      return false;
    }
    if (this.formulario.value.codPostal === '') {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El código postal es requerido.', closable: true});
      return false;
    }
    if (!ValidadorService.validaLongitud('' + this.formulario.value.codPostal, 6)) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El código postal debe ser de 5 digitos mínimo.', closable: true});
      return false;
    }
    if (this.formulario.value.pais === '') {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El país es requerido.', closable: true});
      return false;
    }
    const cpais = parseInt(this.formulario.value.pais, 0);
    if (cpais === 49) {
      if (this.formulario.value.departamento === '') {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
          detail: 'El departamento es requerido.', closable: true});
        return false;
      }
    }
    if (this.formulario.value.municipio === '') {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
          detail: 'El municipio es requerido.', closable: true});
        return false;
      }
    if (this.formulario.value.nuevoCorreo === '') {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El correo es requerido.', closable: true});
      return false;
    }
    if (!this.validador.validarEmail(this.formulario.value.nuevoCorreo)) {
      console.log(this.validador.validarEmail(this.formulario.value.nuevoCorreo));
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El formato del correo esta incorrecto, intente de nuevo.', closable: true});
      return false;
    }
    if (this.formulario.value.telefono === '') {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El teléfono es requerido.', closable: true});
      return false;
    }
    if (this.formulario.invalid) {
      return false;
    } else {
      return true;
    }

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

      } else {
        const  bas = new Basicovo();
        bas.codigo = '49';
        bas.nombre = 'COLOMBIA';
        this.paises[0] = bas;
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

  get f() { return this.formulario.controls; }
}
