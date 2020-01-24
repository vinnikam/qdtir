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

  idrepresentantecrear: number;
  btncrear: boolean;

  msgs: Message[] = [];

  claserepresI: Basicovo[];
  tiposrepresI: Basicovo[];

  haydatos = true;

  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;






  constructor(private ciudService: CiudadanoService,
              private router: Router, private represerv: RepresentantesService,
              private formBuilder: FormBuilder, private messageService: MessageService,
              private util: UtilidadesService) {
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
  crearEsta() {

  }
  guardar() {

    const jsonString = JSON.stringify(this.formulario.value);
    this.representante = JSON.parse(jsonString) as Representante;
    this.representante.idSujeto = this.ciudadanoeActivo.idSujeto;
    this.representante.idRepresentacion = this.idrepresentantecrear;

    this.representante.fechaInicio  = this.util.cambiafecha(this.representante.fechaInicio);
    const x: Promise<Irespuesta> = this.represerv.crear(this.representante);

    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Creo el representante.', closable: true});
        this.representante = undefined;
        this.consultar(this.ciudadanoeActivo.idSujeto);

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No creó representante.!', closable: true});
      }
    })
      .catch(() => {
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
  }
  borrar() {
    const jsonString = JSON.stringify(this.formularioborra.value);
    this.representante = JSON.parse(jsonString) as Representante;
    this.representante.fechaCierre = this.util.cambiafecha(this.representante.fechaCierre);
    this.representanteborra.fechaCierre = this.representante.fechaCierre;
    this.representanteborra.idSujeto = this.ciudadanoeActivo.idSujeto;

    const x: Promise<Irespuesta> = this.represerv.borrar(this.representanteborra);

    x.then((value: Irespuesta) => {
      this.respuesta = value;

      if (this.respuesta.codigoError === '0') {

        this.messageService.add({key: 'custom', severity: 'success', summary: 'Información',
          detail: 'Borró al representante. ', closable: true});

        this.representante = undefined;
        this.consultar(this.ciudadanoeActivo.idSujeto);

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
        this.idrepresentantecrear = this.respuesta.contribuyente.idSujeto;
        this.btncrear = false;
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: '', detail: 'El contribuyente se encontro en la BD. '});

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
          this.msgs.push({severity: 'warn', summary: '', detail: 'No se cargaron las Clases de representación.'});

        }
      })
        .catch(() => {
          this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'Error tecnico en consultar las Clases de representación. ', closable: true});
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
  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
  }

}
