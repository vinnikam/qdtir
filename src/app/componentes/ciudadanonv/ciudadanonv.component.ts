import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {UtilidadesService} from '../../servicios/utilidades.service';
import {
paises
} from '../../config/Divipola';

@Component({
  selector: 'app-ciudadanonv',
  templateUrl: './ciudadanonv.component.html',
  styleUrls: ['./ciudadanonv.component.css']
})
export class CiudadanonvComponent implements OnInit, OnDestroy {
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
  constribySubscription: Subscription;

  ciudadanoeActivo: Contribuyente;

  estipotext = false;

  notificadialog = false;



  constructor(private router: Router , private formBuilder: FormBuilder, private ciudadServ: CiudadanoService,
              private messageService: MessageService, private validador: ValidadorService,
              private util: UtilidadesService) {
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
      municipionombre: '',
      telefono: [],
      nuevoCorreo: ['', Validators.required],
      tipoTelefono: [5],
      indBuzon: 0,
      notif: 0
    });


  }

  ngOnInit() {
    this.dataSubscription = this.ciudadServ.recargarFormulario.subscribe((data: boolean)  => {
      // this.formulario.reset();
    });
    this.constribySubscription = this.ciudadServ.ciudadanoActivo.subscribe((data: Contribuyente ) => {
      // this.ciudadanoeActivo = data;

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
    this.formulario.controls.indBuzon.setValue(0);
    this.formulario.controls.notif.setValue(0);

    this.formulario.controls.codPostal.setValue(110001);

    this.escolombia = true;
  }
  borrar(): void {
    // this.formulario.reset();
    this.formulario.controls.tipoPersona.setValue(2);
    this.cargarFormulario();
  }
  registrar(soloconsulta: boolean): void {

    // alert (this.formulario.invalid);
    const valido = this.validar(soloconsulta);

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
          this.ciudadanoeActivo = this.respuesta.contribuyente;
          // this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          //  detail: 'El contribuyente a registrar ya se encuentra en la base de RIT. ', closable: true});
          this.notificadialog = true;
        } else {
          if (!soloconsulta) {
            this.guardaContrib();
          }
        }

      })
        .catch(() => {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'Error tecnico en la consulta del servicio buscar contribuyente', closable: true});
        });

    }




  }
  guardaContrib(): void {
    if (!this.tipoPersonaNat) {
      this.formulario.value.primerNombre = this.formulario.value.razonsocial;
    }
    const cpais = parseInt(this.formulario.value.pais, 0);
    if (cpais !== 49) {
      this.formulario.value.municipionombre = this.formulario.value.municipio;
    }
    const jsonString = JSON.stringify(this.formulario.value);
    this.contribuyente = JSON.parse(jsonString) as Contribuyente;

    if (this.contribuyente.indBuzon === 1) {
      this.contribuyente.indBuzon = 1;
      this.contribuyente.notif = 1;
    }
    const x: Promise<Irespuesta> = this.ciudadServ.crear(this.contribuyente);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Se registro el contribuyente..', closable: true});
        this.cargarFormulario();
        this.cargacontribuyente();



      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No se registro el contribuyente.' + this.respuesta.mensaje, closable: true});

      }
    })
      .catch((err) => {
        this.messageService.add({key: 'custom', severity: 'error', summary: 'Información',
          detail: 'Error técnico en el registro del contribuyente.', closable: true});
      });

  }
  validar(soloconsulta: boolean): boolean {

    if (!this.util.validaCampo(this.formulario.value.tipoDocumento)) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El Tipo de  documento es Requerido.', closable: true});
      return false;
    }
    if (!this.util.validaCampo(this.formulario.value.nroIdentificacion)) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El Número de documento es Requerido.', closable: true});
      return false;
    }
    if (soloconsulta) {
      return true;
    }
    /*
    if (!this.util.validaCampo(this.formulario.value.nroIdentificacion)) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El Número de documento es Requerido.', closable: true});
      return false;
    }*/
    if (this.formulario.value.tipoPersona === 2) {
      // PERSONA NATURAL
      if (!this.util.validaCampo(this.formulario.value.primerNombre)) {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
          detail: 'El primer nombre es Requerido.', closable: true});
        return false;
      }
      if (!this.util.validaCampo(this.formulario.value.primerApellido)) {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
          detail: 'El segundo nombre es Requerido.', closable: true});
        return false;
      }

    } else {
      if (!this.util.validaCampo(this.formulario.value.razonsocial)) {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
          detail: 'La razón social es requerida.', closable: true});
        return false;
      }

    }
    if (!this.util.validaCampo(this.formulario.value.direccion)) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'La direccioón es requerida.', closable: true});
      return false;
    }/*
    if (!this.util.validaCampo(this.formulario.value.codPostal)) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El código postal es requerido.', closable: true});
      return false;
    }
    if (!this.util.validaLongitudMinMax('' + this.formulario.value.codPostal, 6, 6)) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El código postal debe ser de 6 digitos mínimo.', closable: true});
      return false;
    }*/
    if (!this.util.validaCampo(this.formulario.value.pais)) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El país es requerido.', closable: true});
      return false;
    }
    const cpais = parseInt(this.formulario.value.pais, 0);
    if (cpais === 49) {
      if (!this.util.validaCampo(this.formulario.value.departamento)) {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
          detail: 'El departamento es requerido.', closable: true});
        return false;
      }
    }
    if (!this.util.validaCampo(this.formulario.value.municipio)) {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
          detail: 'El municipio es requerido.', closable: true});
        return false;
      }
    if (!this.util.validaCampo(this.formulario.value.nuevoCorreo)) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El correo es requerido.', closable: true});
      return false;
    }
    if (!this.util.validarEmail(this.formulario.value.nuevoCorreo)) {
      // console.log(this.util.validarEmail(this.formulario.value.nuevoCorreo));
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Atención :',
        detail: 'El formato del correo esta incorrecto, intente de nuevo.', closable: true});
      return false;
    }
    if (!this.util.validaCampo(this.formulario.value.telefono)) {
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
    this.paises = paises;
  }
  cargarPaisesTabla() {

    const x: Promise<Irespuesta> = this.ciudadServ.getPaises();
    // alert('Carga paises');

    x.then((value: Irespuesta) => {
      // alert('Carga paises1');
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.paises = this.respuesta.divpolitica;
        this.formulario.controls.departamento.setValue(undefined); //  null
        this.formulario.controls.municipio.setValue(undefined); //  "5667"


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

    const postal = this.util.obtenerPostalCod(this.formulario.value.departamento);
    this.formulario.controls.codPostal.setValue(postal);
    this.cargarMunic(this.formulario.value.departamento);
  }
  verificar(): void {
    this.registrar(true);

  }
  cargarFormulario(): void {
    // this.formulario.reset();
    // this.formulario.controls.tipoPersona.setValue(2);
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
    this.formulario.controls.codPostal.setValue('110001'); //  566722
    this.formulario.controls.pais.setValue(undefined); //  "208"
    this.formulario.controls.departamento.setValue(undefined); //  null
    this.formulario.controls.municipio.setValue(undefined); //  "5667"
    this.formulario.controls.telefono.setValue(undefined); //  1234123
    this.formulario.controls.nuevoCorreo.setValue(undefined); //  "c@c.com"
    this.formulario.controls.tipoTelefono.setValue(5); //  null
    this.formulario.controls.indBuzon.setValue(undefined); //  null
    this.formulario.controls.notif.setValue(undefined); //  null
    this.formulario.value.indBuzon = 0;
    this.formulario.value.notif = 0;


  }
  get f() { return this.formulario.controls; }

  cargacontribuyente(): void {

    const x: Promise<Irespuesta> = this.ciudadServ.buscar(this.contribuyente);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.ciudadServ.ciudadanoActivo.next(this.respuesta.contribuyente);
        this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
          detail: 'Ya se cargó el contribuyente, verifique y complemente los demás datos. ', closable: true});
      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No se encontró contribuyente con los parametros ingresados, intente buscar de nuevo. ', closable: true});
      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en la consulta del servicio Buscar', closable: true});
      });

  }
  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }
  ircrear(accion: number): void {
    if (accion === 1) {
      this.ciudadServ.ciudadanoActivo.next(this.ciudadanoeActivo);
      this.router.navigate(['/crearbus']);
    } else {
      this.ciudadServ.ciudadanoActivo.next(null);
    }
    this.notificadialog = false;
  }
  marcabuzon(): void {
    alert(' valor ' + this.formulario.value.indBuzon);
    alert(' valor ' + this.formulario.value.notif);
  }
}
