import {Component, OnDestroy, OnInit} from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {RepresentantesService} from '../../servicios/representantes.service';
import {Irespuesta} from '../../dto/irespuesta';
import {Establecimiento} from '../../dto/establecimiento';
import {Representante} from '../../dto/representante';
import {FormBuilder, FormGroup} from '@angular/forms';
import {es} from '../../config/Propiedades';
import {Message, MessageService} from 'primeng/api';
import {UtilidadesService} from '../../servicios/utilidades.service';
import {Contribuyente} from '../../dto/contribuyente';
import {Basicovo} from '../../dto/basicovo';
import {Subscription} from 'rxjs';
import {ValidadorService} from '../../servicios/validador.service';
import {AuthServiceService} from '../../servicios/auth-service.service';

@Component({
  selector: 'app-representantes',
  templateUrl: './representantes.component.html',
  styleUrls: ['./representantes.component.css']
})
export class RepresentantesComponent implements OnInit, OnDestroy {
  lista: Representante[];
  respuesta: Irespuesta;

  creardialog: boolean;
  borrardialog: boolean;
  formulario: FormGroup;
  formularioborra: FormGroup;
  es: any;
  representante: Representante;
  representanteborra: Representante;
  representanteBs ?: Contribuyente;

  idrepresentantecrear: number;
  btncrear: boolean;

  msgs: Message[] = [];

  claserepresI: Basicovo[];
  tiposrepresI: Basicovo[];

  haydatos = true;

  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;

  fechaInicial: string;
  fechaInicialD: Date;
  permisoedicion = false;
  confirmacion = false;



  constructor(private ciudService: CiudadanoService,
              private router: Router, private represerv: RepresentantesService,
              private formBuilder: FormBuilder, private messageService: MessageService,
              private util: UtilidadesService, private autenticservice: AuthServiceService) {
    this.formulario = this.formBuilder.group({

      fechaInicio: [],
      claseRepres: [],
      tipoRepres: [],
      documento: [],
      tipoDocumento: [],
      idRepresentacion: []


    });
    this.formularioborra = this.formBuilder.group({
      fechaCierre: []

    });

  }
  ngOnInit() {
    this.es = es;
    this.formulario.controls.fechaInicio.setValue(this.util.obtenerFechahoy());
    this.formularioborra.controls.fechaCierre.setValue(this.util.obtenerFechahoy());
    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente) => {
      this.ciudadanoeActivo = data;
      if (this.ciudService.ciudadanoActivo === null || this.ciudService.ciudadanoActivo === undefined) {
        this.haydatos = false;

      } else {
        if (this.ciudService.idSujetoRepre !== this.ciudadanoeActivo.idSujeto) {
          this.consultar(this.ciudadanoeActivo.idSujeto);
          this.haydatos = true;
          this.ciudService.idSujetoRepre = this.ciudadanoeActivo.idSujeto;
        } else {
          if (this.ciudService.listaRepre !== null || this.ciudService.listaRepre !== undefined) {
            this.lista = this.ciudService.listaRepre;
          }
        }
      }
      this.cargarclasesrepres();
    });
    this.permisoedicion = this.autenticservice.permisoedicion;

  }
  consultar(idsujeto: number ) {

    const x: Promise<Irespuesta> = this.represerv.consultar(idsujeto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {
        this.lista = this.respuesta.representantes;
        this.ciudService.listaRepre = this.lista;
      } else {
          this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
          detail: this.respuesta.mensaje, closable: true});
          this.ciudService.listaRepre = null;

      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error técnico en la consulta del servicio Buscar representantes ', closable: true});

        // alert('Error tecnico en la consulta del servicio Buscar actividades');
      });

  }

  crear() {
    this.creardialog = true;
  }
  cancelar(opcion) {
    if ( opcion === 1) {
      this.creardialog = false;
    } else if ( opcion === 2) {
      this.borrardialog = false;
    }

  }
  abreconfirmacion() {
    this.confirmacion = true;
  }
  confirma(opcion ) {
    this.confirmacion = false;
    if (opcion === 1) {
      this.borrar();
    }
  }
  guardar() {
    if (!this.valido()) {
      return ;
    }
    const jsonString = JSON.stringify(this.formulario.value);
    this.representante = JSON.parse(jsonString) as Representante;
    this.representante.nombre = this.representanteBs.primerNombre.toLocaleUpperCase();
    this.representante.idSujeto = this.ciudadanoeActivo.idSujeto;
    this.representante.idRepresentacion = this.idrepresentantecrear;

    this.representante.fechaInicio  = this.util.cambiafecha(this.formulario.value.fechaInicio);

    // trazabilidad
    this.representante.fuente = this.autenticservice.fuente;
    this.representante.canal = this.autenticservice.canal;
    this.representante.usuarioauten = this.autenticservice.usuarioautent;
    this.representante.funcionarioaut = this.autenticservice.funcionarioaut;

    const x: Promise<Irespuesta> = this.represerv.crear(this.representante);

    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Creo el representante.', closable: true});
        this.representante = undefined;
        this.consultar(this.ciudadanoeActivo.idSujeto);
        this.limpiar(1);

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No creó representante.!', closable: true});
      }
    })
      .catch((err) => {
        // console.log(err);
        this.messageService.add({key: 'custom', severity: 'error', summary: 'Información',
          detail: 'Error tecnico en guardar representante ', closable: true});
        // alert();
      });

    this.creardialog = false;
  }
  vercrear() {
    this.creardialog = true;
    this.btncrear = true;
  }
  verborra(elesta: Representante) {
    this.borrardialog = true;
    this.representanteborra = elesta;
    this.fechaInicial = this.representanteborra.fechaInicio;
  }
  borrar() {
    const fecha = new Date(this.formularioborra.value.fechaCierre);
    const finicial = new Date(this.fechaInicial);
    const hoy = this.util.obtenerFechahoy();
    if (fecha < finicial  || fecha > hoy) {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención',
        detail: 'La fecha seleccionada debe ser mayor o igual a la fecha inicial, o es mayor a hoy. Verifique y continue.'});
      return ;
    }
    const jsonString = JSON.stringify(this.formularioborra.value);
    this.representante = JSON.parse(jsonString) as Representante;
    this.representante.fechaCierre = this.util.cambiafecha(this.representante.fechaCierre);
    this.representanteborra.fechaCierre = this.representante.fechaCierre;
    this.representanteborra.idSujeto = this.ciudadanoeActivo.idSujeto;

      // trazabilidad
    this.representanteborra.fuente = this.autenticservice.fuente;
    this.representanteborra.canal = this.autenticservice.canal;
    this.representanteborra.usuarioauten = this.autenticservice.usuarioautent;
    this.representanteborra.funcionarioaut = this.autenticservice.funcionarioaut;


    const x: Promise<Irespuesta> = this.represerv.borrar(this.representanteborra);

    x.then((value: Irespuesta) => {
      this.respuesta = value;

      if (this.respuesta.codigoError === '0') {

        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Finaliza la representación. ', closable: true});
        this.limpiar(2);

        this.representante = undefined;
        this.consultar(this.ciudadanoeActivo.idSujeto);

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No se finaliza la representación.', closable: true});

      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error en la finalizacion de la representacion.  ', closable: true});
        // alert();
      });
    this.borrardialog = false;

  }
  confirmar() {
    const dato = new Contribuyente();
    dato.tipoDocumento = this.formulario.value.tipoDocumento;
    dato.nroIdentificacion = this.formulario.value.documento;

    const x: Promise<Irespuesta> = this.ciudService.buscar(dato);

    x.then((value: Irespuesta) => {
      this.respuesta = value;

      if (this.respuesta.codigoError === '0') {
        this.representanteBs = this.respuesta.contribuyente;
        this.idrepresentantecrear = this.respuesta.contribuyente.idSujeto;
        this.btncrear = false;
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: '', detail: 'Se encontró el contribuyente ' + this.respuesta.contribuyente.primerNombre
            + ' ' + this.respuesta.contribuyente.primerApellido + 'en la BD. '});

      } else {
        this.msgs = [];
        this.msgs.push({severity: 'warn', summary: '', detail: 'Contribuyente no existe en la BD.'});

        this.idrepresentantecrear = undefined;
        this.btncrear = true;

      }
      })
      .catch(() => {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'Error tecnico en consultar el contribuyente. ', closable: true});
      // alert();
    });

  }
   cargarclasesrepres() {
    if (this.claserepresI === undefined) {
      const x: Promise<Irespuesta> = this.represerv.consultaclaserepre();
      x.then((value: Irespuesta) => {
        this.respuesta = value;

        if (this.respuesta.codigoError === '0') {
          this.claserepresI = this.respuesta.claserepres;

        } else {
          this.msgs = [];
          this.msgs.push({severity: 'warn', summary: '', detail: 'No se cargaron las clases de representación.'});

        }
      })
        .catch(() => {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'Error tecnico en consultar las clases de representación. ', closable: true});
          // alert();
        });
    }
  }
  cambioClase() {
      this.cargartiporepres(this.formulario.value.claseRepres);
  }
  cargartiporepres(codigo: number) {
      const x: Promise<Irespuesta> = this.represerv.consultatiposrepre(codigo);
      x.then((value: Irespuesta) => {
        this.respuesta = value;

        if (this.respuesta.codigoError === '0') {
          this.tiposrepresI = this.respuesta.tiporepres;

        } else {
          this.msgs = [];
          this.msgs.push({severity: 'warn', summary: '', detail: 'No se cargaron los tipos de representación.'});

        }
      })
        .catch(() => {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'Error tecnico en consultar las Tipos de representación. ', closable: true});
          // alert();
        });

  }
  valido(): boolean {
    const fecha = new Date(this.formulario.value.fechaInicio);
    const hoy = this.util.obtenerFechahoy();
    if (fecha > hoy ) {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'La fecha seleccionada es mayor a hoy. Verifique y continue.'});
      return false;
    }
    if (this.formulario.value.tipoDocumento === '') {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'El Tipo de documento es requerida.'});
      return false;
    }
    if (this.formulario.value.documento === '') {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'El documento es requerida.'});
      return false;
    }

    if (this.formulario.value.claseRepres === '') {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'La clase de representación es requerido.'});
      return false;
    }
    if (this.formulario.value.tipoRepres === '') {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Atención', detail: 'El tipo de representación es requerido.'});
      return false;
    }

    return true;
  }
  limpiar(tipo: number): void {
    if (tipo === 1) { // crear
      this.formulario.controls.fechaInicio.setValue(this.util.obtenerFechahoy());
      this.formulario.controls.claseRepres.setValue(undefined); // "5667"
      this.formulario.controls.tipoRepres.setValue(undefined); // "5667"
      this.formulario.controls.documento.setValue(undefined); // "5667"
      this.formulario.controls.tipoDocumento.setValue(undefined); // "5667"
      this.formulario.controls.idRepresentacion.setValue(undefined); // "5667"
    }
    if (tipo === 2) { // borrar
      this.formularioborra.controls.fechaCierre.setValue(this.util.obtenerFechahoy());
    }

  }
  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
  }

}
