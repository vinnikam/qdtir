import {Component, OnDestroy, OnInit} from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Contribuyente} from '../../dto/contribuyente';
import {Irespuesta} from '../../dto/irespuesta';
import {AuthServiceService} from '../../servicios/auth-service.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {UtilidadesService} from '../../servicios/utilidades.service';
import {Router} from '@angular/router';
import {todosregimen, valores} from '../../config/Propiedades';
import {es} from '../../config/Propiedades';
import {Basicovo} from '../../dto/basicovo';



@Component({
  selector: 'app-ciudadano',
  templateUrl: './ciudadano.component.html',
  styleUrls: ['./ciudadano.component.css']
})
export class CiudadanoComponent implements OnInit, OnDestroy {
  tipoiden: string;
  identificacion: string;
  elCiudadano: Contribuyente;
  esjuridico = false;

  msgs: Message[] = [];
  es: any;


  rolCiudadano = false;
  permisoedicion = false;

  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;

  notificadialog = false;
  saledialog = false;

  actualizaNombreUsu: Subscription;

  private respuesta: Irespuesta;
  certificadoRit: string; // = `${valores.ip_servidor}${valores.certificadoRit}`;

  editarsuj = false;
  inscrrit = false;

  formularioMod: FormGroup;
  identificacionsujeto: string;

  regimenes ?: Basicovo[];

  inscritorit = false;


  constructor(private ciudService: CiudadanoService, private autenticservice: AuthServiceService,
              private messageService: MessageService, private utilidades: UtilidadesService,
              private router: Router, private formBuilder: FormBuilder,
              private util: UtilidadesService) {
    this.elCiudadano = new Contribuyente();
    this.esjuridico = false;
    this.certificadoRit = ciudService.certificadoRit;
    this.permisoedicion = this.autenticservice.permisoedicion;

    this.formularioMod = this.formBuilder.group({
      fechaDoc: [],
      nombre1: [],
      nombre2: [],
      apell1: [],
      apell2: [],
      matricula: [],
      fechareg: [],
      fechainscripcion: [],
      regimenTrib: []

    });
  }

  ngOnInit() {
    this.es = es;

    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente ) => {
      this.ciudadanoeActivo = data;

    });
    this.actualizaNombreUsu = this.autenticservice.actualizaNombreUsu.subscribe((data: string) => {

    });
    if (this.autenticservice.datos !== undefined) {
      this.elCiudadano.nroIdentificacion = this.autenticservice.datos.nroId;
      this.elCiudadano.tipoDocumento = this.autenticservice.datos.codTId;
      this.buscar();
    }
    this.regimenes = todosregimen;
  }
  buscar() {


    const x: Promise<Irespuesta> = this.ciudService.buscar(this.elCiudadano);
    x.then((value: Irespuesta) => {
    this.respuesta = value;
    // alert('Consumio servicio autenticacion');
    // alert(value);
    if (this.respuesta.codigoError === '0') {

      // this.ciudService.ciudadanoActivo = this.respuesta.contribuyente;
      this.ciudadanoeActivo = this.respuesta.contribuyente;
      this.rolCiudadano = this.ciudService.rolCiudadano;
      if (this.ciudadanoeActivo.estadoRIT === 'NO_INSCRITO') {
        this.inscritorit = false;
      } else {
        this.inscritorit = true;
      }

      // this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
      //  detail: 'Se encontró contribuyente. Puede consultar la información en cada una de las pestañas. ', closable: true});
      this.certificadoRit += 'par1=' + this.utilidades.convertirtipoidenticorto(this.ciudadanoeActivo.tipoDocumento)  +
        '&par2=' + this.ciudadanoeActivo.nroIdentificacion;
      this.respuesta.contribuyente.certificadoRit = this.certificadoRit;
      this.ciudService.ciudadanoActivo.next(this.respuesta.contribuyente);
      if (this.ciudadanoeActivo.naturaleza.codigo === '2') {
        this.esjuridico = true;
      } else {
        this.esjuridico = false;
      }
      if (this.autenticservice.perfilusuario === 1) {
        if (this.ciudadanoeActivo !== null) {
          this.autenticservice.actualizaNombreUsu.next(this.ciudadanoeActivo.primerNombre + ' ' + this.ciudadanoeActivo.primerApellido);
        } else {
          this.autenticservice.actualizaNombreUsu.next('');
        }
      }
    } else {
      // alert(this.respuesta.mensaje);
      // this.ciudService.ciudadanoActivo = null;
      if (this.ciudService.rolCiudadano) {
        this.saledialog = true;
      } else {
        this.ciudService.ciudadanoActivo.next(null);
        this.ciudadanoeActivo = null;
        this.rolCiudadano = false;
        this.notificadialog = true;
        this.saledialog = false;
      }
    }
    this.ciudService.idSujetoVehiculos = 0;
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'Error tecnico en la consulta del servicio Buscar', closable: true});

      // alert('Error tecnico en la consulta del servicio Buscar');
        });



  }
  nuevaBusqueda(): void {
    this.ciudService.ciudadanoActivo.next(null);
    this.ciudService.idSujetoVehiculos = 0;
    this.ciudService.idSujetoPredios = 0;
    this.ciudService.idSujetoActiv = 0;
    this.ciudService.idSujetoRepre = 0;
    this.ciudService.idSujetoEstab = 0;
    this.ciudService.idSujeto1Des = 0;
    this.inscritorit = false;

  }

  ngOnDestroy(): void {
    this.constribySubscription.unsubscribe();
    this.actualizaNombreUsu.unsubscribe();
  }
  ircrear(accion: number): void {
    if (accion === 1) {
      this.router.navigate(['/crearciu']);
    }
    this.notificadialog = false;
  }
  irsalir(): void {
    this.saledialog = false;
    this.router.navigate(['/contribuyente']);
  }
  editar(): void {
    if (this.ciudadanoeActivo === undefined) {
      this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        detail: 'No se puede editar por que no hay contribuyente activo. ', closable: true});
    } else {

      this.identificacionsujeto =  this.ciudadanoeActivo.tipoDocumento + ' - ' + this.ciudadanoeActivo.nroIdentificacion;


      this.formularioMod.controls.nombre1.setValue(this.ciudadanoeActivo.primerNombre);
      this.formularioMod.controls.nombre2.setValue(this.ciudadanoeActivo.segundoNombre);
      this.formularioMod.controls.apell1.setValue(this.ciudadanoeActivo.primerApellido);
      this.formularioMod.controls.apell2.setValue(this.ciudadanoeActivo.segundoApellido);
      this.formularioMod.controls.matricula.setValue(this.ciudadanoeActivo.matriculaMercantil);
      this.formularioMod.controls.regimenTrib.setValue(this.ciudadanoeActivo.regimenTrib);

      if (this.ciudadanoeActivo.fecharegimenBogota !== 'NO REGISTRA') {
        this.formularioMod.controls.fechareg.setValue(this.util.convierteDateJvaDateJson(this.ciudadanoeActivo.fecharegimenBogotaD));
      }
      if (this.ciudadanoeActivo.fechaInscripcion !== 'NO REGISTRA' && this.ciudadanoeActivo.fechaInscripcion !== undefined) {
        this.formularioMod.controls.fechainscripcion.setValue(this.util.convierteDateJvaDateJson(this.ciudadanoeActivo.fechaInscripcionD));
      }
      if (this.ciudadanoeActivo.fechaDocumentoS !== 'NO REGISTRA' && this.ciudadanoeActivo.fechaDocumentoS !== undefined) {
        this.formularioMod.controls.fechaDoc.setValue(this.util.convierteDateJvaDateJson(this.ciudadanoeActivo.fechaDocumento));
      }

      this.editarsuj = true;
    }
  }
  inscRIT() {
    this.inscrrit = true;

  }
  inscribirenRIT(accion) {
    this.inscrrit = false;
    if (accion === 1) {
      this.ciudService.inscribirRIT(this.ciudadanoeActivo.idSujeto)
        .then((value: Irespuesta) => {
          this.respuesta = value;
          if (this.respuesta.codigoError === '0') {
            this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
              detail: 'Se registro el contribuyente en el RIT', closable: true});
            this.ciudadanoeActivo.estadoRIT = 'INSCRITO';
            this.inscritorit = true;
          } else {
            this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
              detail: 'No se actualizaron los datos del contribuyente, intente nuevamente', closable: true});
          }
        }).catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en la inscripcion RIT', closable: true});
      });

    }
  }
  cancelarmod() {
    this.editarsuj = false;
  }
  modificaSuj(): void {
    this.editarsuj = false;

    const datoscontri = {
      idSujeto: this.ciudadanoeActivo.idSujeto,
      pnombre: this.formularioMod.value.nombre1.toLocaleUpperCase(),
      snombre: this.formularioMod.value.nombre2.toLocaleUpperCase(),
      papell: this.formularioMod.value.apell1.toLocaleUpperCase(),
      sapell: this.formularioMod.value.apell2.toLocaleUpperCase(),
      matricula: this.formularioMod.value.matricula,
      fechadoc: this.formularioMod.value.fechaDoc,
      fecharegimen: this.formularioMod.value.fechareg,
      fechainscrip: this.formularioMod.value.fechainscripcion,
      regimentrib: this.formularioMod.value.regimenTrib,
      codTId : this.ciudadanoeActivo.naturaleza.codigo

    }

    const x: Promise<Irespuesta> = this.ciudService.editar(datoscontri);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert('Consumio servicio autenticacion');
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        this.messageService.add({key: 'custom', severity: 'info', summary: 'Información',
          detail: 'Se actualizaron los datos del contribuyente', closable: true});
        this.cargacambios(datoscontri);
      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'No se actualizaron los datos del contribuyente, intente nuevamente', closable: true});
      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en la consulta del servicio Buscar', closable: true});

        // alert('Error tecnico en la consulta del servicio Buscar');
      });
    this.limpiar();
  }

  cargacambios(datos: any): void {

    this.ciudadanoeActivo.primerNombre = datos.pnombre;
    this.ciudadanoeActivo.segundoNombre = datos.snombre;
    this.ciudadanoeActivo.primerApellido = datos.papell;
    this.ciudadanoeActivo.segundoApellido = datos.sapell;
    this.ciudadanoeActivo.matriculaMercantil = datos.matricula;
    this.ciudadanoeActivo.fechaDocumentoS = 'NO REGISTRA';
    this.ciudadanoeActivo.regimenTrib = datos.regimentrib;
    this.ciudadanoeActivo.fechaInscripcion = 'NO REGISTRA';

    if (datos.fechadoc !== undefined) {
      this.ciudadanoeActivo.fechaDocumentoS = this.util.cambiafecha(datos.fechadoc);
      this.ciudadanoeActivo.fechaDocumento = datos.fechadoc;
    }
    if (datos.fecharegimen !== undefined) {
      this.ciudadanoeActivo.fecharegimenBogota = this.util.cambiafecha(datos.fecharegimen);
      this.ciudadanoeActivo.fecharegimenBogotaD = datos.fecharegimen;
    }
    if (datos.fechainscrip !== undefined) {
      this.ciudadanoeActivo.fechaInscripcion = this.util.cambiafecha(datos.fechainscrip);
      this.ciudadanoeActivo.fechaInscripcionD = datos.fechainscrip;
    }
    this.limpiar();
  }
  limpiar(): void {
    this.formularioMod.controls.nombre1.setValue(undefined);
    this.formularioMod.controls.nombre2.setValue(undefined);
    this.formularioMod.controls.apell1.setValue(undefined);
    this.formularioMod.controls.apell2.setValue(undefined);
    this.formularioMod.controls.matricula.setValue(undefined);
    this.formularioMod.controls.fechareg.setValue(undefined);
    this.formularioMod.controls.fechainscripcion.setValue(undefined);
    this.formularioMod.controls.fechaDoc.setValue(undefined);
    this.formularioMod.controls.regimenTrib.setValue(undefined);
  }

}
