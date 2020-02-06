import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Irespuesta} from '../../dto/irespuesta';
import {
  bis,
  bis10,
  complemento,
  cuadrante,
  departamentos,
  letras,
  letras10,
  municipios,
  tipoViaPrimaria
} from '../../config/Divipola';
import {Basicovo} from '../../dto/basicovo';
import {Contacto} from '../../dto/contacto';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {catchError} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {ModalService} from '../../servicios/modal.service';
import {Datacontacto} from '../../dto/datacontacto';
import {TipoUso} from '../../dto/tipo-uso';
import {Message, MessageService} from 'primeng/api';
import {Contribuyente} from '../../dto/contribuyente';
import {UtilidadesService} from '../../servicios/utilidades.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatoscservicioService} from "../../servicios/datoscservicio.service";
import {Representante} from "../../dto/representante";


@Component({
  selector: 'app-datos-contacto',
  templateUrl: './datos-contacto.component.html',
  styleUrls: ['./datos-contacto.component.css']
})
export class DatosContactoComponent implements OnInit, OnDestroy {


  myFormT: FormGroup;

  myForm: FormGroup;

  editForm: FormGroup;

  editFormTel: FormGroup;

  @Input() dptoDireccion: any;
  @Input() mpioDireccion: any;
  @Input() codPostalDireccion: any;
  @Input() tipoContacto: string;
  borrardialog: boolean;
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
  letras10: any;

  bis: any;
  bis10: any;
  cuadrante: any;
  complemento: any ;
  complemento1: any ;
  complemento2: any ;
  letraViaGen: any;
  cuadranteVG: any;

  contactoborra : any;

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

  msgsEmail: Message[] = [];
  msgsTelefono: Message[] = [];
  msgsConfirmacion: Message[] = [];

  respuesta: Irespuesta;
  respuestauso: TipoUso;

  displaymodificarContacto : boolean;


  displaymodificarContactoTel : boolean;

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
  actualizaDireccionS: Subscription;


  constructor(public http: HttpClient, private modalService: ModalService, private  ciudService: CiudadanoService, private formBuilder: FormBuilder, private formBuilder2: FormBuilder,  private formBuilder3: FormBuilder,   private formBuilder4: FormBuilder, private router: Router,
              private messageService: MessageService, private utilidades: UtilidadesService, private confirmationService: ConfirmationService) {

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

    this.letras10 = letras;
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
          this.aDirCon = this.ciudadanoeActivo.dirContacto ;
          this.aDirNot = this.ciudadanoeActivo.dirContactoNot ;
          this.aDirMai = this.ciudadanoeActivo.email ;
          this.aDirTel = this.ciudadanoeActivo.telefonos ;
          this.aUnoPor = this.ciudadanoeActivo.aplicaDescuento ;
          this.direccion = this.ciudadanoeActivo.dirContactoNot[0].direccion;


        }
      }
    });
    this.actualizaDireccionS = this.ciudService.actualizaDireccion.subscribe((data: boolean) => {
      const rta = data;
      if (rta) {
        this.consultarDatos(this.utilidades.convertirtipoidenticorto(this.ciudadanoeActivo.tipoDocumento),
          this.ciudadanoeActivo.nroIdentificacion);
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


    this.buildForm();
    this.buildForm2();
    this.buildForm3();
    this.buildForm4();

  }



  private buildForm(){
    this.myFormT = this.formBuilder.group({
      telefono: ['', Validators.required],
      ext: ['', ],
      telTipoUso: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }


  private buildForm2(){
    this.myForm= this.formBuilder2.group({
      email: ['', Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      mailTipoUso: ['', Validators.required]
    });
  }



  private buildForm3(){
    this.editForm= this.formBuilder3.group({
      email: ['',
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]
    });
  }


  private buildForm4(){
    this.editFormTel = this.formBuilder4.group({
      telefono: ['', Validators.required],
      ext: ['', ],
      tipo: ['', Validators.required]
    });
  }


  validarTelefono(): boolean {

    if (this.myFormT.value.telefono === null || this.myFormT.value.telefono == '') {

      this.msgsTelefono = [];
      this.msgsTelefono.push({severity:'error', summary:'Campo Obligatorio', detail:'El Teléfono es Requerido.'});
      return false;
    }


    if (this.myFormT.value.telTipoUso === null || this.myFormT.value.telTipoUso == '') {

      this.msgsTelefono = [];
      this.msgsTelefono.push({severity:'error', summary:'Campo Obligatorio', detail:'El Tipo uso es Requerido.'});
      return false;
    }


    if (this.myFormT.value.tipo === null || this.myFormT.value.tipo == '') {

      this.msgsTelefono = [];
      this.msgsTelefono.push({severity:'error', summary:'Campo Obligatorio', detail:'El Tipo es Requerido.'});
      return false;
    }

    if (this.myFormT.invalid) {
      return false;
    } else {
      return true;
    }


  }

  validarEmail(): boolean {

    if (this.myForm.value.email === null || this.myForm.value.email == '') {

      this.msgsEmail = [];
      this.msgsEmail.push({severity:'error', summary:'Campo Obligatorio', detail:'El Email es Requerido.'});
      return false;
    }


    if (this.myForm.value.mailTipoUso === null || this.myForm.value.mailTipoUso == '') {

      this.msgsEmail = [];
      this.msgsEmail.push({severity:'error', summary:'Campo Obligatorio', detail:'El Tipo de uso es Requerido.'});
      return false;
    }



    if (this.myForm.invalid) {
      return false;
    } else {
      return true;
    }


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




  editarDirNotificacion(): Promise<Irespuesta>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = {direccion: this.direccion, municipio: '11001', departamento: 11, tipoUso: 5, pais: 49, codPostal: this.codPostalDireccion, idSujeto:  this.idSujeto };
    return this.http.post<Irespuesta>(this.urlEditarDirNoti, params,{headers: headers}).toPromise();

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

    this.limpiarCampos();
    this.displayAddContacto = true;
    this.ciudService.validacionDireccion = true;
    this.ciudService.validacionRegistroDireccion = true;
    this.ciudService.validacionTipoUso = true;

  }




  limpiarCampos():void{
    this.myFormT.reset();
    this.myForm.reset();

  }

  consultarTipo(): Promise<TipoUso> {
    console.log('el servicio configurado...' + this.urluso);
    return this.http.get<TipoUso>(this.urluso).toPromise();

  }



  registrar(): void
  {
    this.contacto.idSujeto = this.idSujeto ;
    this.contacto.pais     = '49' ;
     if(parseInt(this.tipoContacto ) === 1)
     {
       if(this.validarTelefono()) {
         this.urlEditar = this.urlEditaTelContacto;
         this.contacto.nuevoTelefono = this.myFormT.value.telefono;
         this.contacto.municipio = '149'; // $scope.telMpio ;
         this.contacto.depto = '11'; // $scope.telDpto ;
         this.contacto.codPostal = '110111'; // $scope.telcodPostal ;
         this.contacto.tipo = this.myFormT.value.tipo;
         this.contacto.ext = this.myFormT.value.ext;
         this.contacto.tipoUso = this.myFormT.value.telTipoUso;
         this.contacto.tipoT = this.tipoContacto;
         this.contacto.tipoContacto = this.tipoContacto;

         this.ciudService.registrarContacto(this.contacto, this.urlEditar).pipe(
           catchError(() => of([]))
         ).subscribe((cont: Irespuesta) => {

           this.messageService.add({
             key: 'custom', severity: 'warn', summary: 'Información',
             detail: 'El Contacto Teléfonico se agrego correctamente. ', closable: true
           });


           this.consultarDatos(this.tipoDocumento, this.numeroDocumento);  });

         this.limpiarCampos();
         this.displayAddContacto = false;

       }


     }


    if(parseInt(this.tipoContacto ) === 3) {
      if (this.validarEmail()) {

        this.urlEditar = this.urlEditaCorreoContacto;
        this.contacto.nuevocorreo = this.myForm.value.email;
        this.contacto.respuesta = '';
        this.contacto.tipoUso = this.myForm.value.mailTipoUso;
        this.contacto.tipoT = this.tipoContacto;
        this.contacto.tipoContacto = this.tipoContacto;

        this.ciudService.registrarContacto(this.contacto, this.urlEditar).pipe(
          catchError(() => of([]))
        ).subscribe((cont: Irespuesta) => {

          this.messageService.add({
            key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'El Contacto Email se agrego correctamente. ', closable: true
          });


          this.consultarDatos(this.tipoDocumento, this.numeroDocumento);  });

        this.limpiarCampos();
        this.displayAddContacto = false;

      }

    }


    if(parseInt(this.tipoContacto ) === 2) {

      this.urlEditar = this.urlEditarDirNoti ;
      this.contacto.direccion    = this.direccion ;
      this.contacto.municipio    = this.mpioDireccion.cod ;
      this.contacto.departamento = this.dptoDireccion.cod ;
      this.contacto.codPostal    = this.codPostal ;
      this.contacto.tipoUso      = this.dirTipoUso;
    }

  }



  modificarContacto(contacto: any ) {
    this.displaymodificarContacto = true;
    this.contacto = contacto;
}




  modificarContactoTel(contacto: any ) {
    this.displaymodificarContactoTel = true;
    this.contacto = contacto;
  }




  validarCorreo(): boolean {

    if (this.editForm.value.email === null || this.editForm.value.email == '') {

      this.msgsEmail = [];
      this.msgsEmail.push({severity:'error', summary:'Campo Obligatorio', detail:'El Email es Requerido.'});
      return false;
    }


    if (this.editForm.invalid) {
      return false;
    } else {
      return true;
    }


  }



  validarTel(): boolean {



      if (this.editFormTel.value.telefono === null || this.editFormTel.value.telefono == '') {

        this.msgsTelefono = [];
        this.msgsTelefono.push({severity:'error', summary:'Campo Obligatorio', detail:'El Teléfono es Requerido.'});
        return false;
      }


      if (this.editFormTel.value.tipo === null || this.editFormTel.value.tipo == '') {

        this.msgsTelefono = [];
        this.msgsTelefono.push({severity:'error', summary:'Campo Obligatorio', detail:'El Tipo es Requerido.'});
        return false;
      }

      if (this.editFormTel.invalid) {
        return false;
      } else {
        return true;
      }


    }






  actualizarTelefonoNotificacion(){


    if(this.validarTel()) {

      this.urlEditar = this.urlEditaTelContacto;
      this.contacto.idSujeto = this.idSujeto;
      this.contacto.nuevoTelefono = this.editFormTel.value.telefono;
      this.contacto.municipio = '149'; // $scope.telMpio ;
      this.contacto.depto = '11'; // $scope.telDpto ;
      this.contacto.codPostal = '110111'; // $scope.telcodPostal ;
      this.contacto.tipo = this.editFormTel.value.tipo;
      this.contacto.ext = this.editFormTel.value.ext;
      this.contacto.tipoUso = '5';
      this.contacto.tipoT = this.tipoContacto;
      this.contacto.tipoContacto = this.tipoContacto;

      this.ciudService.registrarContacto(this.contacto, this.urlEditar).pipe(
        catchError(() => of([]))
      ).subscribe((cont: Irespuesta) => {

        this.messageService.add({
          key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'El Contacto Teléfonico se modifico correctamente. ', closable: true
        });


        this.consultarDatos(this.tipoDocumento, this.numeroDocumento);  });

      this.limpiarCampos();
      this.displaymodificarContactoTel = false;
       }
  }


  actualizarCorreoNotificacion()

  {
  if(this.validarCorreo()) {

  this.urlEditar = this.urlEditaCorreoContacto;
  this.contacto.idSujeto = this.idSujeto;
  this.contacto.nuevocorreo = this.editForm.value.email;
  this.contacto.tipoUso = '5';
  this.ciudService.registrarContacto(this.contacto, this.urlEditar).pipe(
    catchError(() => of([]))
).subscribe((cont: Irespuesta) => {

        this.messageService.add({
          key: 'custom', severity: 'warn', summary: 'Información',
          detail: 'El Contacto Email se modifico correctamente. ', closable: true
        });

        this.consultarDatos(this.tipoDocumento, this.numeroDocumento);
      });

      this.displaymodificarContacto = false;
    }
  }




  verborra(contacto: any) {
    this.borrardialog = true;
    this.contactoborra = contacto;
  }



  verborraTel(contacto: any) {
    this.borrardialog = true;
    this.contactoborra = contacto;
  }


  EliminarContacto(){

  this.eliminaContacto(this.contactoborra);
    this.borrardialog = false;

  }


  SalirContacto(){

    this.borrardialog = false;

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



  confirmEliminacion(contacto: any) {
    this.confirmationService.confirm({
      message: 'Quiere borrar este registro?',
      header: 'Confirmación Eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {

        this.eliminaContacto(contacto);
        this.msgsConfirmacion = [{severity:'info', summary:'Confirmar', detail:'Registro Borrado'}];
      },
      reject: () => {
        this.msgsConfirmacion = [{severity:'info', summary:'Salir', detail:'Salircted'}];
      }
    });
  }



  ngOnDestroy(): void {
    this.contactoSubscription.unsubscribe();
    this.contactoAddSubscription.unsubscribe();
    this.constribySubscription.unsubscribe();
    this.actualizaDireccionS.unsubscribe();
  }


}



