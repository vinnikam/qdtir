import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {bis, complemento, cuadrante, departamentos, letras, municipios, tipoViaPrimaria} from '../../config/Divipola';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {DatoscservicioService} from '../../servicios/datoscservicio.service';
import {Contacto} from '../../dto/contacto';
import {Basicovo} from '../../dto/basicovo';
import {TipoUso} from '../../dto/tipo-uso';
import {Message, MessageService} from 'primeng/api';
import {of, Subscription} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Contribuyente} from '../../dto/contribuyente';

@Component({
  selector: 'app-estandarizador',
  templateUrl: './estandarizador.component.html',
  styleUrls: ['./estandarizador.component.css']
})
export class EstandarizadorComponent implements OnInit, OnDestroy {


  listdptos: any;
  listmunicipios: any;
  @Input() dptoDireccion: any;
  @Input() mpioDireccion: any;
  @Input() codPostalDireccion: any;
  displayDirNotificacion = false;
  displayDirNotificacion2 = false;
  capturaDireccion: boolean;
  idSujeto: number;
  codDepartamento: number;
  direccion: string;

  contacto: Contacto;
  respuesta: Irespuesta;

  listaTU: Basicovo [];
  respuestauso: TipoUso;
  viaPrimaria: Basicovo;
  nroViaPpal: string;
  letraViaPpal: Basicovo;
  bis1: Basicovo;
  letraBis: Basicovo;
  cuadrante1: Basicovo;
  nroViaGen: string;
  letraViaGen: any;
  nroPlaca: string;
  cuadranteVG: any;
  resultado: string;
  listviaprimaria: Basicovo[];
  letras: Basicovo[];
  bis: Basicovo[];
  cuadrante: Basicovo[];

  complemento: Basicovo[] ;
  complemento1: Basicovo ;
  complemento2: any ;
  url: string;
  urluso: string;
  urlEditar: string;
  urlEditarDirNoti: string;
  departamento: Basicovo;
  listadirTipoUso: Basicovo[];

  estandarizadorSubscription: Subscription;
  addContactoSubscription: Subscription;

  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;

  @Input() validacionRegistroDireccion: boolean;
  @Input() validacionTipoUso: boolean;

  @Input() dirTipoUso: Basicovo;


  constructor(public http: HttpClient, private ciudService: CiudadanoService, private router: Router,
              private datosservicios: DatoscservicioService, private messageService: MessageService) {
    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente) => {
      this.ciudadanoeActivo = data;
    });
    this.cargarDeptos();
    this.capturaDireccion = false;
    this.displayDirNotificacion = true;
    this.idSujeto = this.ciudadanoeActivo.idSujeto;
    this.codPostalDireccion = '11001';
    this.contacto = new Contacto();

    this.listviaprimaria = tipoViaPrimaria;
    this.letras = letras;
    this.bis = bis;
    this.cuadrante = cuadrante;
    this.complemento =  complemento;

    this.capturaDireccion = false;
    this.urlEditarDirNoti = ciudService.urlEditarDirNoti;
    this.urluso = ciudService.urluso;
    this.url = ciudService.url;

    this.consultarDatos(this.ciudadanoeActivo.tipoDocumento, this.ciudadanoeActivo.nroIdentificacion );
    this.validacionRegistroDireccion = ciudService.validacionRegistroDireccion;
    this.validacionTipoUso = ciudService.validacionTipoUso;
    this.consultarTipoUso();
  }


  ngOnInit() {
    this.estandarizadorSubscription = this.ciudService.displayDirNotificacion.subscribe((data: true) => {

    });

    this.addContactoSubscription = this.ciudService.displayAddContacto.subscribe((data: true) => {

    });


  }

  consultarDatos(tipoDocumento: string, numeroDocumento: string): void {

    if (tipoDocumento != null && numeroDocumento != null) {
      this.consultarContribuyente(tipoDocumento, numeroDocumento)
        .then((value: Irespuesta) => {
          this.respuesta  = value;
          if (this.ciudService.validacionDireccion) {
            this.direccion = '';
          } else {
            this.direccion = this.respuesta.contribuyente.dirContactoNot[0].direccion;
          }
        })
        .catch((err: HttpErrorResponse) => {
          if (err.status !== 200) {
          }
        });


    }


  }

  consultarContribuyente(tipo: string, numero: string): Promise<Irespuesta> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = {codTId: '4', nroId: numero};
    console.log('el servicio configurado...' + this.url);
    return this.http.post<Irespuesta>(this.url, params, { headers }).toPromise();

  }


  consultarTipoUso(): void {
    this.consultarTipo().then((value: TipoUso) => {
      this.respuestauso  = value;
      this.listaTU = this.respuestauso.uso;
      this.listadirTipoUso  = this.listaTU;

      })
      .catch((err: HttpErrorResponse) => {
        if (err.status !== 200) {
        }
      });

  }




  cargarDeptos() {
    const x: Promise<Irespuesta> = this.ciudService.getDeptos(49);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        this.listdptos = this.respuesta.divpolitica;

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error en la consulta de departamentos. ', closable: true});

      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en borrar departamentos ', closable: true});
      });

  }



  cargarMunicipio(coddepto: number) {
    const x: Promise<Irespuesta> = this.ciudService.getMunic(coddepto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        this.listmunicipios = this.respuesta.divpolitica;

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



  consultarTipo(): Promise<TipoUso> {
    // console.log('el servicio configurado...' + this.urluso);
    return this.http.get<TipoUso>(this.urluso).toPromise();

  }




  ok(): void {

    this.ciudService.displayDirNotificacion.next(false);

    const x: Promise<Irespuesta> = this.editarDirNotificacion();
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        this.ciudService.validacionDireccion = false;
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'La dirección de notificación se edito correctamente. ', closable: true});

      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error al editar la dirección. ', closable: true});

      }
    })
      .catch(() => {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error al editar la dirección ', closable: true});
      });


    this.consultarContribuyente('4', this.ciudadanoeActivo.nroIdentificacion);
  }


  editarDirNotificacion(): Promise<Irespuesta> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = {direccion: this.direccion, municipio: '11001', departamento: 11, tipoUso: 5, pais: 49,
      codPostal: this.codPostalDireccion, idSujeto:  this.idSujeto };
    return this.http.post<Irespuesta>(this.ciudService.urlEditarDirNoti, params, {headers}).toPromise();

  }

  cancel(): void {
    this.datosservicios.displayDirNotificacion = false;
  }




  capturar(): void {
    this.capturaDireccion = true;
  }



  cambioDir(): void {

    this.direccion = this.viaPrimaria.codigo;
    if (this.nroViaPpal !== '' ) { this.direccion += ' ' + this.nroViaPpal; }
    if (this.letraViaPpal !== undefined) {
    if ( this.letraViaPpal.codigo !== undefined && this.letraViaPpal.codigo !== undefined && this.letraViaPpal.codigo !== '') {
        this.direccion += ' ' + this.letraViaPpal.codigo;
      }
    }
    if (this.bis1 !== undefined && this.bis1.codigo !== undefined && this.bis1.codigo !== undefined && this.bis1.codigo !== '')
      { this.direccion += ' ' + this.bis1.codigo; }
    if (this.letraBis !== undefined && this.letraBis.codigo !== undefined && this.letraBis.codigo !== undefined && this.letraBis.codigo !== '') {
        this.direccion += ' ' + this.letraBis.codigo;
    }
    if (this.cuadrante1 !== undefined && this.cuadrante1.codigo !== undefined && this.cuadrante1.codigo !== '') {
        this.direccion += ' ' + this.cuadrante1.codigo;
    }
    if (this.nroViaGen !== '') { this.direccion += ' ' + this.nroViaGen; }
    if (this.letraViaGen !== undefined && this.letraViaGen.codigo !== undefined && this.letraViaGen.codigo !== undefined && this.letraViaGen.codigo !== '')
      { this.direccion += ' ' + this.letraViaGen.codigo; }
    if (this.nroPlaca !== '')
      { this.direccion += ' ' + this.nroPlaca; }
    if (this.cuadranteVG !== undefined && this.cuadranteVG.codigo !== undefined && this.cuadranteVG.codigo !== undefined && this.cuadranteVG.codigo !== '')
      { this.direccion += ' ' + this.cuadranteVG.codigo; }

  }

  complementar(): void {
    let compl = '';
    if (this.direccion === undefined || this.direccion === '') {
      // mostrarMensaje('Debe pirmero diligenciar la direcci\xf3n antes de adicionarle el complemento.', AlertLevel.WARNING);
      return;
    }

    if (this.complemento1.codigo !== undefined && this.complemento1.codigo !== '') {
      compl += ' ' + this.complemento1.codigo;
    }

    if (compl !== '' && this.complemento2 !== undefined && this.complemento2 !== '') {
      const x = this.complemento2.trim();
      this.direccion += compl + ' ' + x;
    } else {
      // mostrarMensaje('Debe diligenciar los dos campos del complemento de la direcci\xf3n para poderlo agregar.', AlertLevel.WARNING);
    }

    this.complemento1 = null;
    this.complemento2 = '';
  }



  registrar(): void {


    this.contacto.idSujeto = this.idSujeto ;
    this.contacto.pais     = '49' ;
    this.urlEditar = this.urlEditarDirNoti ;
    this.contacto.direccion    = this.direccion ;
    this.contacto.municipio    = this.mpioDireccion.codigo ;
    this.contacto.departamento = this.departamento.codigo;
    this.contacto.codPostal    = this.codPostalDireccion;
    this.contacto.tipoUso      = this.dirTipoUso.codigo;

    /*this.dirTipoUso.codigo;*/


    this.ciudService.registrarContacto(this.contacto, this.urlEditar).pipe(
      catchError(() => of([]))
    ).subscribe((cont: Irespuesta) => {

      this.consultarContribuyente('4', this.ciudadanoeActivo.nroIdentificacion);
    });

    this.ciudService.displayAddContacto.next(false);
  }




  cambioDepto() {
    this.codDepartamento = Number(this.departamento.codigo);
    this.cargarMunicipio(this.codDepartamento);
  }


  ngOnDestroy(): void {
    this.estandarizadorSubscription.unsubscribe();
    this.addContactoSubscription.unsubscribe();
    this.constribySubscription.unsubscribe();
  }


}
