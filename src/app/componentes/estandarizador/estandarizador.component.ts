import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {bis, complemento, cuadrante, departamentos, letras, letras10, bis10, municipios, tipoViaPrimaria} from '../../config/Divipola';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Contacto} from '../../dto/contacto';
import {Basicovo} from '../../dto/basicovo';
import {TipoUso} from '../../dto/tipo-uso';
import {Message, MessageService} from 'primeng/api';
import {Observable, of, Subscription} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Contribuyente} from '../../dto/contribuyente';
import {UtilidadesService} from "../../servicios/utilidades.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-estandarizador',
  templateUrl: './estandarizador.component.html',
  styleUrls: ['./estandarizador.component.css']
})
export class EstandarizadorComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
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

  ubicacion: string;
  contacto: Contacto;
  respuesta: Irespuesta;

  listaTU: Basicovo [];
  respuestauso: TipoUso;
  viaPrimaria: any;
  nroViaPpal: string;
  letraViaPpal: any;
  bis1: any;
  letraBis: any;
  cuadrante1: any;
  nroViaGen: string;
  letraViaGen: any;
  nroPlaca: string;
  cuadranteVG: any;
  resultado: string;
  listviaprimaria: Basicovo[];
  letras: Basicovo[];
  bis: Basicovo[];
  cuadrante: Basicovo[];

  msgs: Message[] = [];

  msgsComplemento: Message[] = [];

  letras20: Basicovo[];

  letras10: Basicovo[];
  bis10: Basicovo[];
  cuadrante10: Basicovo[];


  complemento: Basicovo[] ;
  complemento1: Basicovo ;
  complemento2: any ;
  url: string;
  urluso: string;
  urlEditar: string;
  urlEditarDirNoti: string;
  departamento: Basicovo;
  // departamento: any;

  listadirTipoUso: Basicovo[];

  estandarizadorSubscription: Subscription;
  addContactoSubscription: Subscription;

  constribySubscription: Subscription;
  ciudadanoeActivo: Contribuyente;

  actualizaDireccionS: Subscription;

  @Input() validacionRegistroDireccion: boolean;
  @Input() validacionTipoUso: boolean;

  //@Input() dirTipoUso: Basicovo;

  dirTipoUso: any;

  constructor(public http: HttpClient, private ciudService: CiudadanoService, private router: Router,  private formBuilder: FormBuilder,
              private messageService: MessageService, private utilidades: UtilidadesService) {
    this.constribySubscription = this.ciudService.ciudadanoActivo.subscribe((data: Contribuyente) => {
      this.ciudadanoeActivo = data;
    });

    this.limpiarCampos;
    this.cargarDeptos();
    this.capturaDireccion = false;
    this.displayDirNotificacion = true;
    this.idSujeto = this.ciudadanoeActivo.idSujeto;
    this.codPostalDireccion = '11001';
    this.contacto = new Contacto();
    this.listviaprimaria = tipoViaPrimaria;
    this.letras = letras;
    this.bis = bis;
    this.ubicacion = '2';
    this.cuadrante = cuadrante;
    this.letras20 = letras;
    this.letras10 = letras10;
    this.bis10 = bis10;
    this.cuadrante10 = cuadrante;
    this.complemento =  complemento;
    this.capturaDireccion = false;
    this.urlEditarDirNoti = ciudService.urlEditarDirNoti;
    this.urluso = ciudService.urluso;
    this.url = ciudService.url;
    this.consultarDatos(this.utilidades.convertirtipoidenticorto(this.ciudadanoeActivo.tipoDocumento), this.ciudadanoeActivo.nroIdentificacion );
    this.validacionRegistroDireccion = ciudService.validacionRegistroDireccion;
    this.validacionTipoUso = ciudService.validacionTipoUso;
    this.consultarTipoUso();
  }


  ngOnInit() {
    this.estandarizadorSubscription = this.ciudService.displayDirNotificacion.subscribe((data: true) => {

    });

    this.addContactoSubscription = this.ciudService.displayAddContacto.subscribe((data: true) => {

    });
    this.actualizaDireccionS = this.ciudService.actualizaDireccion.subscribe((data: boolean) => {

    });

    this.buildForm();
  }



  validar(ubi : string): boolean {


    if (this.formulario.value.departamento === null || this.formulario.value.departamento === '') {

      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Campo Obligatorio', detail: 'El departamento es Requerido.'});
      return false;
    }

    if (this.formulario.value.mpioDireccion === null || this.formulario.value.mpioDireccion === '') {

      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Campo Obligatorio', detail: 'El Municipio es Requerido.'});
      return false;
    }
    if (this.formulario.value.dirTipoUso === null || this.formulario.value.dirTipoUso === '') {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Campo Obligatorio', detail: 'El Tipo de Uso es Requerido.'});
      return false;

    }
    if (this.formulario.value.codPostalDireccion === null || this.formulario.value.codPostalDireccion === '') {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Campo Obligatorio', detail: 'El Código Postal es Requerido.'});
      return false;

    }





    if(ubi === '2') {



      if (this.formulario.value.viaPrimaria === null || this.formulario.value.viaPrimaria === '') {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Campo Obligatorio', detail: 'La vía Primaria es Requerido.'});
        return false;

      }

      if (this.formulario.value.nroViaPpal === null || this.formulario.value.nroViaPpal === '') {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Campo Obligatorio', detail: 'Número vía Primaria es Requerido.'});
        return false;

      }


      if (this.formulario.value.nroViaGen === null || this.formulario.value.nroViaGen === '') {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Campo Obligatorio', detail: 'Número Via General es Requerido.'});
        return false;

      }

      if (this.formulario.value.nroPlaca === null || this.formulario.value.nroPlaca === '') {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Campo Obligatorio', detail: 'Número de placa es Requerido.'});
        return false;

      }


    }

    if(ubi === '1'){

      if (this.formulario.value.complemento1 === null || this.formulario.value.complemento1 === '') {
        this.msgsComplemento = [];
        this.msgsComplemento.push({severity: 'error', summary: 'Campo Obligatorio', detail: 'El complemento 1 es Requerido.'});
        return false;

      }

      if (this.formulario.value.complemento2 === null || this.formulario.value.complemento2 === '') {
        this.msgsComplemento = [];
        this.msgsComplemento.push({severity: 'error', summary: 'Campo Obligatorio', detail: 'El complemento 2 es Requerido.'});
        return false;

      }


    }


    if (this.formulario.invalid) {
      return false;
    } else {
      return true;
    }


  }



  private buildForm(){
    this.formulario = this.formBuilder.group({

      departamento: ['', Validators.required],
      mpioDireccion: ['', Validators.required],
      dirTipoUso: ['', Validators.required],
      codPostalDireccion: ['', Validators.maxLength(6)],
      ubicacion:['', ],
      viaPrimaria: ['',],
      nroViaPpal: ['', ],
      letraViaPpal: ['',],
      bis1: ['', ],
      letraBis: ['', ],
      cuadrante1: ['',],
      nroViaGen: ['', ],
      letraViaGen: ['',],
      nroPlaca: ['', ],
      cuadranteVG: ['', ],
      complemento1: ['',],
      complemento2: ['',]

    });
  }




  limpiarCampos():void{


    this.listviaprimaria = tipoViaPrimaria;

    this.letras = letras;
    this.bis = bis;
    this.cuadrante = cuadrante;

    this.letras20 = letras;
    this.letras10 = letras10;
    this.bis10 = bis10;
    this.cuadrante10 = cuadrante;
    this.viaPrimaria = '';
    this.complemento =  complemento;
    this.nroViaPpal = '';
    this.nroViaGen = '';
    this.letraViaGen = '';
    this.letraBis = '';
    this.nroPlaca = '';
    this.cuadranteVG = '';
    this.letraViaPpal = '';
    this.bis1 = '';
    this.cuadrante1 = '';

    this.direccion = '';
    this.formulario.value.departamento.codigo = '';
    this.formulario.value.mpioDireccion.codigo = '';

    this.listmunicipios = null;
    this.formulario.value.dirTipoUso.codigo = '';

    this.formulario.reset();

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
    const params = {codTId: tipo, nroId: numero};
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

  borrar(): void {
    this.limpiarCampos();
  }





  ok(): void {


      if (this.validar(this.ubicacion)) {


        this.ciudService.displayDirNotificacion.next(false);


        this.editarDirNotificacion().pipe(
          catchError(() => of([]))
        ).subscribe((value: Irespuesta) => {
          this.respuesta = value;
          // alert(value);
          if (this.respuesta.codigoError === '0') {
            this.ciudService.actualizaDireccion.next(true);
            this.ciudService.validacionDireccion = false;
            this.messageService.add({
              key: 'custom', severity: 'warn', summary: 'Información',
              detail: 'La dirección de notificación se edito correctamente. ', closable: true
            });

          } else {
            this.messageService.add({
              key: 'custom', severity: 'warn', summary: 'Información',
              detail: 'Error al editar la dirección. ', closable: true
            });

          }
        });


        this.consultarContribuyente(this.utilidades.convertirtipoidenticorto(this.ciudadanoeActivo.tipoDocumento), this.ciudadanoeActivo.nroIdentificacion);
        this.limpiarCampos();

      }


    }



  editarDirNotificacion(): Observable<Irespuesta>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = {direccion: this.direccion, municipio: this.formulario.value.mpioDireccion.codigo, departamento: this.formulario.value.departamento.codigo, tipoUso: 5, pais: 49,
      codPostal: this.formulario.value.codPostalDireccion, idSujeto:  this.idSujeto };
    return this.http.post<Irespuesta>(this.ciudService.urlEditarDirNoti, params, {headers});
  }




  capturar(): void {
    this.capturaDireccion = true;
    this.direccion = '';

  }



  cambioDir(): void {

    if(this.ubicacion === '2') {

      this.direccion = this.formulario.value.viaPrimaria.codigo;

      if (this.formulario.value.nroViaPpal !== undefined) {
        if (this.formulario.value.nroViaPpal !== '') {
          this.direccion += ' ' + this.formulario.value.nroViaPpal;
        }
      }
      if (this.formulario.value.letraViaPpal !== undefined) {
        if (this.formulario.value.letraViaPpal.codigo !== undefined && this.formulario.value.letraViaPpal.codigo !== undefined && this.formulario.value.letraViaPpal.codigo !== '') {
          this.direccion += ' ' + this.formulario.value.letraViaPpal.codigo;
        }
      }
      if (this.formulario.value.bis1 !== undefined && this.formulario.value.bis1.codigo !== undefined && this.formulario.value.bis1.codigo !== undefined && this.formulario.value.bis1.codigo !== '') {
        this.direccion += ' ' + this.formulario.value.bis1.codigo;
      }
      if (this.formulario.value.letraBis !== undefined && this.formulario.value.letraBis.codigo !== undefined && this.formulario.value.letraBis.codigo !== undefined && this.formulario.value.letraBis.codigo !== '') {
        this.direccion += ' ' + this.formulario.value.letraBis.codigo;
      }
      if (this.formulario.value.cuadrante1 !== undefined && this.formulario.value.cuadrante1.codigo !== undefined && this.formulario.value.cuadrante1.codigo !== '') {
        this.direccion += ' ' + this.formulario.value.cuadrante1.codigo;
      }
      if (this.formulario.value.nroViaGen !== undefined) {
        if (this.formulario.value.nroViaGen !== '') {
          this.direccion += ' ' + this.formulario.value.nroViaGen;
        }
      }
      if (this.formulario.value.letraViaGen !== undefined && this.formulario.value.letraViaGen.codigo !== undefined && this.formulario.value.letraViaGen.codigo !== undefined && this.formulario.value.letraViaGen.codigo !== '') {
        this.direccion += ' ' + this.formulario.value.letraViaGen.codigo;
      }

      if (this.formulario.value.nroPlaca !== undefined) {
        if (this.formulario.value.nroPlaca !== '') {
          this.direccion += ' ' + this.formulario.value.nroPlaca;
        }
      }

      if (this.formulario.value.cuadranteVG !== undefined && this.formulario.value.cuadranteVG.codigo !== undefined && this.formulario.value.cuadranteVG.codigo !== undefined && this.formulario.value.cuadranteVG.codigo !== '') {
        this.direccion += ' ' + this.formulario.value.cuadranteVG.codigo;
      }
    }
  }

  complementar(): void {
    let compl = '';
    if(this.ubicacion === '2') {
      if (this.direccion === undefined || this.direccion === '') {
        // mostrarMensaje('Debe pirmero diligenciar la direcci\xf3n antes de adicionarle el complemento.', AlertLevel.WARNING);
        return;
      }

    }


    if (this.formulario.value.complemento1.codigo !== undefined && this.formulario.value.complemento1.codigo !== '') {
      compl += ' ' + this.formulario.value.complemento1.codigo;
    }

    if (compl !== '' && this.formulario.value.complemento2 !== undefined && this.formulario.value.complemento2 !== '') {
      const x = this.formulario.value.complemento2.trim();
        if(this.direccion == undefined)
        {
          this.direccion = '';

        }

      this.direccion += compl + ' ' + x;
    } else {
      // mostrarMensaje('Debe diligenciar los dos campos del complemento de la direcci\xf3n para poderlo agregar.', AlertLevel.WARNING);
    }

    this.complemento1 = null;
    this.complemento2 = '';
  }


  registrar(): void {
    if (this.validar(this.ubicacion)) {

      this.contacto.idSujeto = this.idSujeto;
      this.contacto.pais = '49';
      this.urlEditar = this.urlEditarDirNoti;
      this.contacto.direccion = this.direccion;
      this.contacto.municipio = this.formulario.value.mpioDireccion.codigo;
      this.contacto.departamento = this.formulario.value.departamento.codigo;
      this.contacto.codPostal = this.formulario.value.codPostalDireccion;
      this.contacto.tipoUso = this.formulario.value.dirTipoUso.codigo;

      /*this.dirTipoUso.codigo;*/


      this.ciudService.registrarContacto(this.contacto, this.urlEditar).pipe(
        catchError(() => of([]))
      ).subscribe((contribuyente: Irespuesta) => {

        if (contribuyente.codigoError === '0') {
          this.ciudService.actualizaDireccion.next(true);

          this.messageService.add({
            key: 'custom', severity: 'warn', summary: 'Información',
            detail: 'El Contacto Dirección se agrego correctamente. ', closable: true
          });

        }

        else{

          this.messageService.add({
            key: 'custom', severity: 'Error', summary: 'Error',
            detail: 'Ocurrio un error en el momento de agregar la diirección . ', closable: true
          });


        }

        this.ciudService.consultarDatos(this.utilidades.convertirtipoidenticorto(this.ciudadanoeActivo.tipoDocumento), this.ciudadanoeActivo.nroIdentificacion);

      });

      this.limpiarCampos();

      this.ciudService.displayAddContacto.next(false);

    }
  }




  cambioDepto() {



    if(this.formulario.value.departamento.codigo !== null || this.formulario.value.departamento.codigo != '') {
      this.codDepartamento = Number(this.formulario.value.departamento.codigo);
      this.cargarMunicipio(this.codDepartamento);
    }
    }



  ngOnDestroy(): void {
    this.estandarizadorSubscription.unsubscribe();
    this.addContactoSubscription.unsubscribe();
    this.constribySubscription.unsubscribe();
    this.actualizaDireccionS.unsubscribe();
  }


}
