import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Irespuesta} from '../../dto/irespuesta';
import {bis, complemento, cuadrante, departamentos, letras, municipios, tipoViaPrimaria} from '../../config/Divipola';
import {Basicovo} from '../../dto/basicovo';
import {Contacto} from '../../dto/contacto';

import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import {catchError} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {ModalService} from '../../servicios/modal.service';
import {Datacontacto} from '../../dto/datacontacto';
import {TipoUso} from '../../dto/tipo-uso';
import {Message, MessageService} from 'primeng/api';
import {Contribuyente} from '../../dto/contribuyente';
import {UtilidadesService} from '../../servicios/utilidades.service';


@Component({
  selector: 'app-datos-contacto',
  templateUrl: './datos-contacto.component.html',
  styleUrls: ['./datos-contacto.component.css']
})
export class DatosContactoComponent implements OnInit, OnDestroy {

  /*
  constructor(private ciudService: CiudadanoService,
              private router: Router) {
    if (this.ciudService.ciudadanoActivo === undefined) {
      alert('No hay ciudadano activo')
      this.router.navigate(['/crearciu']);
    }

  }
*/

  @Input() dptoDireccion: any;
  @Input() mpioDireccion: any;
  @Input() codPostalDireccion: any;
  @Input() tipoContacto: string;

  listdptos: any;
  listmunicipios: any;
  viaPrimaria: any;
  letraViaPpal: any;
  bis1: any;
  letraBis: any;
  cuadrante1: any;
  aDirCon: any;
  aDirNot: any;
  aDirMai: any;
  aDirTel: any;
  aUnoPor: any;
  prmIn: any;
  listviaprimaria: any;
  letras: any;
  bis: any;
  cuadrante: any;
  complemento: any ;
  complemento1: any ;
  complemento2: any ;
  letraViaGen: any;
  cuadranteVG: any;

  name: string;
  direccion: string;
  url: string;
  urluso: string;
  bodyText: string;
  telTipoUso: string ;
  mailTipoUso: string;
  dirTipoUso: string;
  telefono: string;
  email: string;
  nroViaPpal: string;
  resultado: string;
  nroViaGen: string;
  nroPlaca: string;
  urlEditaTelContacto: string;
  urlEditaCorreoContacto: string;
  urlEditarDirNoti: string;
  urlEditar: string;
  urlEliminar: string;
  urlEliminaTelContacto: string;
  urlEliminarDirNoti: string;
  urlEliminaCorreoContacto: string;
  tipo: string;
  ext: string;
  codPostal: string;
  tipoDocumento: string;
  numeroDocumento: string;

  items: MenuItem[];
  activeItem: MenuItem;


  respuesta: Irespuesta;
  respuestauso: TipoUso;

  displayDirNotificacion = false;
  displayDirNotificacion2 = false;
  displayAddContacto = false;
  capturaDireccion: boolean;

  contacto: Contacto;
  datacontacto: Datacontacto;
  tipoUso: Basicovo;


  listaTU: Basicovo [];
  listatelTipoUso: Basicovo [];
  listamailTipoUso: Basicovo [];
  listadirTipoUso: Basicovo[];

  contactoSubscription: Subscription;
  contactoAddSubscription: Subscription;

  idSujeto: number;
  tipCon: number;
  haydatos = false;

  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;



  constructor(public http: HttpClient, private modalService: ModalService, private  ciudService: CiudadanoService, private router: Router,
              private messageService: MessageService, private utilidades: UtilidadesService) {

    this.url = ciudService.url;
    this.urluso = ciudService.urluso;
    this.urlEditaTelContacto = ciudService.urlEditaTelContacto;
    this.urlEditaCorreoContacto = ciudService.urlEditaCorreoContacto;
    this.urlEditarDirNoti = ciudService.urlEditarDirNoti;
    this.urlEliminaTelContacto = ciudService.urlEliminaTelContacto;
    this.urlEliminarDirNoti = ciudService.urlEliminarDirNoti;
    this.urlEliminaCorreoContacto = ciudService.urlEliminaCorreoContacto;


    this.ciudService.displayDirNotificacion.next(false);
    this.ciudService.displayAddContacto.next(false);


    this.listviaprimaria = tipoViaPrimaria;
    this.letras = letras;
    this.bis = bis;
    this.cuadrante = cuadrante;
    this.complemento =  complemento;
    this.capturaDireccion = false;
    this.contacto = new Contacto();
    this.datacontacto = new Datacontacto();

    this.consultarTipoUso();

    this.codPostalDireccion = '11001';
  }

  ngOnInit() {
    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente) => {
      this.ciudadanoeActivo = data;
      if (this.ciudadanoeActivo === null || this.ciudadanoeActivo === undefined) {
        this.haydatos = false;
        // this.router.navigate(['/crearciu']);
      } else {
        this.haydatos = true;
        this.idSujeto = this.ciudadanoeActivo.idSujeto;
        if (this.ciudService.idSujetoActiv !== this.ciudadanoeActivo.idSujeto) {
          this.tipoDocumento = this.utilidades.convertirtipoidenticorto(this.ciudadanoeActivo.tipoDocumento);
          this.numeroDocumento = this.ciudadanoeActivo.nroIdentificacion;
          this.consultarDatos(this.tipoDocumento, this.numeroDocumento);
        }
      }
    });
    this.contactoSubscription = this.ciudService.displayDirNotificacion.subscribe((data: true) => {
      this.displayDirNotificacion = data;
    });



    this.contactoAddSubscription = this.ciudService.displayAddContacto.subscribe((data: true) => {
      this.displayAddContacto = data;
    });

    this.items = [
      {label: 'Mis Direcciones', icon: 'fa fa-fw fa-bar-chart', id: '1' },
      {label: 'Mis Correos', icon: 'fa fa-fw fa-calendar', id: '2' },
      {label: 'Mis Telefonos', icon: 'fa fa-fw fa-twitter', id: '3' }
    ];
    this.activeItem = this.items[0];

  }







  consultarDatos(tipoDocumento: string, numeroDocumento: string): void {

    if (tipoDocumento != null && numeroDocumento != null) {
      this.consultarContribuyente(tipoDocumento, numeroDocumento).then((value: Irespuesta) => {
        this.respuesta  = value;
        this.aDirCon = this.respuesta.contribuyente.dirContacto ;
        this.aDirNot = this.respuesta.contribuyente.dirContactoNot ;
        this.aDirMai = this.respuesta.contribuyente.email ;
        this.aDirTel = this.respuesta.contribuyente.telefonos ;
        this.aUnoPor = this.respuesta.contribuyente.aplicaDescuento ;
        this.direccion = this.respuesta.contribuyente.dirContactoNot[0].direccion;
        console.log('los telefonos--->', JSON.stringify(this.aDirTel));
      })
        .catch((err: HttpErrorResponse) => {
          console.log(err);
          if (err.status !== 200) {
          }
        });


    }


  }


  consultarTipoUso(): void {
    this.consultarTipo()
      .then((value: TipoUso) => {
        this.respuestauso  = value;

        this.listaTU = this.respuestauso.uso;

        console.log('--->', JSON.stringify( this.listaTU));
        this.listatelTipoUso = this.listaTU;
        this.listamailTipoUso = this.listaTU;
        this.listadirTipoUso  = this.listaTU;


      })
      .catch((err: HttpErrorResponse) => {
        if (err.status !== 200) {
        }
      });





  }





  consultarContribuyente(tipo: string, numero: string): Promise<Irespuesta>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = {codTId: tipo, nroId: numero};

    return this.http.post<Irespuesta>(this.url, params,{ headers: headers}).toPromise();

  }

  nuevaDirNotificacion() {

    this.ciudService.displayDirNotificacion.next(true);
    this.ciudService.validacionDireccion = false;
    this.ciudService.validacionRegistroDireccion = false;
    this.ciudService.validacionTipoUso = false;

  }


  capturar(): void {
    this.displayDirNotificacion2 = true;
    this.ciudService.displayDirNotificacion.next(false);
  }


  cambioDir(): void{

    this.direccion = this.viaPrimaria;
    if (this.nroViaPpal !== '') this.direccion += ' ' + this.nroViaPpal;
    if (this.letraViaPpal !== void 0 && this.letraViaPpal !== void 0 && this.letraViaPpal !== '') this.direccion += ' ' + this.letraViaPpal;
    if (this.bis1 !== void 0 && this.bis1 !== void 0 && this.bis1 !== '') this.direccion += ' ' + this.bis1;
    if (this.letraBis !== void 0 && this.letraBis !== void 0 && this.letraBis !== '') this.direccion += ' ' + this.letraBis;
    if (this.cuadrante1 !== void 0 && this.cuadrante1 !== void 0 && this.cuadrante1 !== '') this.direccion += ' ' + this.cuadrante1;
    if (this.nroViaGen !== '') this.direccion += ' ' + this.nroViaGen;
    if (this.letraViaGen !== void 0 && this.letraViaGen !== void 0 && this.letraViaGen !== '') this.direccion += ' ' + this.letraViaGen;
    if (this.nroPlaca !== '') this.direccion += ' ' + this.nroPlaca;
    if (this.cuadranteVG !== void 0 && this.cuadranteVG !== void 0 && this.cuadranteVG !== '') this.direccion += ' ' + this.cuadranteVG;

  }


  editarDirNotificacion(): Promise<Irespuesta>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = {direccion: this.direccion, municipio: '11001', departamento: 11, tipoUso: 5, pais: 49, codPostal: this.codPostalDireccion, idSujeto:  this.idSujeto };
    return this.http.post<Irespuesta>(this.urlEditarDirNoti, params,{headers: headers}).toPromise();

  }


  complementar(): void{
    let compl = '';
    if (this.direccion === void 0 || this.direccion == '') {
      // mostrarMensaje('Debe pirmero diligenciar la direcci\xf3n antes de adicionarle el complemento.', AlertLevel.WARNING);
      return;
    }

    if (this.complemento1 !== void 0 && this.complemento1 !== '') {
      compl += ' ' + this.complemento1;
    }

    if (compl !== '' && this.complemento2 !== void 0 && this.complemento2 !== '') {
      const x = this.complemento2.trim();
      this.direccion += compl + ' ' + x;
    } else {
      // mostrarMensaje('Debe diligenciar los dos campos del complemento de la direcci\xf3n para poderlo agregar.', AlertLevel.WARNING);
    }

    this.complemento1 = '';
    this.complemento2 = '';
  }


  cancel(): void{
    this.ciudService.displayDirNotificacion.next(false);
    this.consultarContribuyente('4', this.ciudadanoeActivo.nroIdentificacion);
  }





  ok(): void {

    const x: Promise<Irespuesta> = this.editarDirNotificacion();
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      if (this.respuesta.codigoError === '0') {

        this.ciudService.displayDirNotificacion.next(false);
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: this.respuesta.mensaje, closable: true});


      } else {
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: this.respuesta.mensaje, closable: true});

      }
    })
      .catch(() => {
        // alert('Error tecnico en la consulta del servicio Buscar actividades');
        this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'Error tecnico en la consulta del servicio Buscar', closable: true});

      });
    this.consultarContribuyente(this.tipoDocumento, this.numeroDocumento);
  }


  addContacto(): void{

    this.displayAddContacto = true;
    this.ciudService.validacionDireccion = true;
    this.ciudService.validacionRegistroDireccion = true;
    this.ciudService.validacionTipoUso = true;

  }


  consultarTipo(): Promise<TipoUso> {
    console.log('el servicio configurado...' + this.urluso);
    return this.http.get<TipoUso>(this.urluso).toPromise();

  }



  registrar(): void
  {

    this.contacto.idSujeto = this.idSujeto ;
    this.contacto.pais     = '49' ;


    switch( parseInt(this.tipoContacto ) ) {
      case 1:                                                         // TELEFONO
        this.urlEditar = this.urlEditaTelContacto ;
        this.contacto.nuevoTelefono = this.telefono ;
        this.contacto.municipio     = '149' ; // $scope.telMpio ;
        this.contacto.depto         = '11' ; // $scope.telDpto ;
        this.contacto.codPostal     = '110111' ; // $scope.telcodPostal ;
        this.contacto.tipo          = this.tipo ;
        this.contacto.ext           = this.ext ;
        this.contacto.tipoUso       = this.telTipoUso;
        this.contacto.tipoT =  this.tipoContacto;
        this.contacto.tipoContacto =  this.tipoContacto;


        break ;
      case 2:                                                         // DIRECCION
        this.urlEditar = this.urlEditarDirNoti ;
        this.contacto.direccion    = this.direccion ;
        this.contacto.municipio    = this.mpioDireccion.cod ;
        this.contacto.departamento = this.dptoDireccion.cod ;
        this.contacto.codPostal    = this.codPostal ;
        this.contacto.tipoUso      = this.dirTipoUso;
        break ;
      case 3:                                                         // EMAIL
        this.urlEditar = this.urlEditaCorreoContacto ;
        this.contacto.nuevocorreo = this.email ;
        this.contacto.respuesta   = '' ;
        this.contacto.tipoUso     = this.mailTipoUso ;
        this.contacto.tipoT =  this.tipoContacto;
        this.contacto.tipoContacto =  this.tipoContacto;
        break;
      default:

        alert( 'Tipo de contacto no definido');
    }



    this.ciudService.registrarContacto(this.contacto, this.urlEditar).pipe(
      catchError(() => of([]))
    ).subscribe((cont: Irespuesta) => {
      this.consultarDatos(this.tipoDocumento, this.numeroDocumento);  });

    this.displayAddContacto = false;

  }




  eliminaContacto(contacto: any ) {

    console.log('contacto --->', JSON.stringify( contacto));

    if (contacto.tipoT === void 0) {
      this.tipCon = parseInt(contacto.tipo.codigo);
    } else {
      this.tipCon = parseInt(contacto.tipoT.codigo);
    }



    this.datacontacto.idSujeto = this.idSujeto.toString();
    this.datacontacto.tipoUso = contacto.uso.codigo;

    switch (this.tipCon) {
      case 1:                                                         // TELEFONO
        this.urlEliminar = this.urlEliminaTelContacto;
        this.datacontacto.idTelefono = contacto.codigoTelefono;
        this.datacontacto.numTelefono = contacto.numero;
        break;
      case 2:                                                         // DIRECCION
        this.urlEliminar = this.urlEliminarDirNoti;
        this.datacontacto.idNomenclatura = contacto.nome_id;
        break;
      case 3:                                                         // EMAIL
        this.urlEliminar = this.urlEliminaCorreoContacto;
        this.datacontacto.codCorreo = contacto.codigo;
        this.datacontacto.elCorreo = contacto.direccion;
        break;
      default:
        console.log('Tipo de contacto no definido');
    }
    this.ciudService.eliminarContacto(this.datacontacto, this.urlEliminar).pipe(
      catchError(() => of([]))
    ).subscribe((cont: Irespuesta) => {
      this.consultarDatos(this.tipoDocumento, this.numeroDocumento);  });

  }

  ngOnDestroy(): void {
    this.contactoSubscription.unsubscribe();
    this.constribySubscription.unsubscribe();
  }


}



