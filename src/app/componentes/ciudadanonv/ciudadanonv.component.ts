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
import {tiposIdenJuridico, tiposIdenNatural} from '../../config/Propiedades';
import {Subscription} from 'rxjs';

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

  tiposDocumento ?: Basicovo[];

  respuesta ?: Irespuesta;

  dataSubscription: Subscription;

  estipotext = false;


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
      tipoTelefono: [5],
      indBuzon: [0],
      notif: [0]
    });


  }

  ngOnInit() {
    this.dataSubscription = this.ciudadServ.recargarFormulario.subscribe((data: boolean)  => {
      // this.formulario.reset();
    });
    // this.formulario.reset();
    this.cargarFormulario();
    this.formulario.controls.tipoPersona.setValue(2);
    this.tipoPersonaNat = true;
    this.formulario.value.tipoPersona = 1;
    this.formulario.value.tipoTelefono = 5;
    this.cargarTiposDocumento();
    this.cargarPaises();
    this.cargarDeptos(49);
    this.cargarMunic(11);
    this.escolombia = true;
  }
  borrar(): void {
    // this.formulario.reset();
    this.formulario.controls.tipoPersona.setValue(2);
    this.cargarFormulario();
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

      const x: Promise<Irespuesta> = this.ciudadServ.buscar(this.contribuyente);
      x.then((value: Irespuesta) => {
        this.respuesta = value;
        if (this.respuesta.codigoError === '0') {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'El contribuyente a registrar ya se encuentra en la base de RIT. ', closable: true});

        } else {
          this.guardaContrib();
        }

      })
        .catch(() => {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'Error tecnico en la consulta del servicio buscar contribuyente', closable: true});
        });

    }




  }
  guardaContrib(): void {
    const jsonString = JSON.stringify(this.formulario.value);
    this.contribuyente = JSON.parse(jsonString) as Contribuyente;
    const x: Promise<Irespuesta> = this.ciudadServ.crear(this.contribuyente);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Se registro el contribuyente..', closable: true});
        this.cargarFormulario();


      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No se registro el contribuyente.'+ this.respuesta.mensaje, closable: true});

      }
    })
      .catch((err) => {
        this.messageService.add({key: 'custom', severity: 'error', summary: 'Información',
          detail: 'Error técnico en el registro del contribuyente.', closable: true});
      });

  }
  validar(): boolean {

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
        detail: 'El código postal debe ser de 6 digitos mínimo.', closable: true});
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
    const tipoper = this.formulario.value.tipoPersona;
    if (this.formulario.value.tipoPersona === 1) { // JURIDICA
      this.tipoPersonaNat = false;
    } else {
      this.tipoPersonaNat = true;
    }
    // this.formulario.reset();
    this.formulario.controls.tipoPersona.setValue(tipoper);
    this.cargarFormulario();


    this.cargarTiposDocumento();
    // alert ('ok ' + this.tipoPersonaNat);

  }
  cambiotiden(): void {
    if (this.formulario.value.tipoDocumento === '5') {
      this.estipotext = true;
    } else {
      this.estipotext = false;
    }
    console.log(this.estipotext);
  }
  cargarTiposDocumento() {
    if (this.tipoPersonaNat) {
      this.tiposDocumento = tiposIdenNatural;
    } else {
      this.tiposDocumento = tiposIdenJuridico;
    }


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
  cambioDepto(): void {
    this.cargarMunic(this.formulario.value.departamento);
  }
  cargarFormulario(): void {
    this.formulario.controls.nroIdentificacion.setValue(undefined); // "5667"
    this.formulario.controls.tipoDocumento.setValue(undefined); // "5"
    this.formulario.controls.razonsocial.setValue(undefined); // null
    this.formulario.controls.primerNombre.setValue(undefined); // "5667"
    this.formulario.controls.segundoNombre.setValue(undefined); // "5667"
    this.formulario.controls.primerApellido.setValue(undefined); // "5667"
    this.formulario.controls.segundoApellido.setValue(undefined); //  "5667"
    this.formulario.controls.matriculaMercantil.setValue(undefined); //  null
    this.formulario.controls.estadoRIT.setValue(undefined); //  null
    this.formulario.controls.direccion.setValue(undefined); //  "5667"
    this.formulario.controls.codPostal.setValue(undefined); //  566722
    this.formulario.controls.pais.setValue(undefined); //  "208"
    this.formulario.controls.departamento.setValue(undefined); //  null
    this.formulario.controls.municipio.setValue(undefined); //  "5667"
    this.formulario.controls.telefono.setValue(undefined); //  1234123
    this.formulario.controls.nuevoCorreo.setValue(undefined); //  "c@c.com"
    this.formulario.controls.tipoTelefono.setValue(5); //  null
    this.formulario.controls.indBuzon.setValue(undefined); //  null
    this.formulario.controls.notif.setValue(undefined); //  null
  }
  get f() { return this.formulario.controls; }
}
