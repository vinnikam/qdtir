import {Component, Input, OnInit} from '@angular/core';
import {bis, complemento, cuadrante, departamentos, letras, municipios, tipoViaPrimaria} from '../../config/Divipola';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import {Irespuesta} from '../../dto/irespuesta';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {DatoscservicioService} from '../../servicios/datoscservicio.service';
import {Contacto} from '../../dto/contacto';
import {Basicovo} from '../../dto/basicovo';
import {TipoUso} from '../../dto/tipo-uso';

@Component({
  selector: 'app-estandarizador',
  templateUrl: './estandarizador.component.html',
  styleUrls: ['./estandarizador.component.css']
})
export class EstandarizadorComponent implements OnInit {


  listdptos: any;
  listmunicipios: any;
  @Input() dptoDireccion: any;
  @Input() mpioDireccion: any;
  @Input() codPostalDireccion: any;
  displayDirNotificacion = false;
  displayDirNotificacion2 = false;
  capturaDireccion: boolean;
  idSujeto: number;
  direccion: string;

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
  listviaprimaria: any;
  letras: any;
  bis: any;
  cuadrante: any;
  complemento: any ;
  complemento1: any ;
  complemento2: any ;
  url: string;
  urluso: string;
  urlEditar: string;
  urlEditarDirNoti: string;

  listadirTipoUso: Basicovo[];

  deptos ?: Basicovo[];
  municp ?: Basicovo[];


  @Input() validacionRegistroDireccion: boolean;
  @Input() validacionTipoUso: boolean;

  @Input() dirTipoUso: string;


  constructor(public http: HttpClient, private ciudService: CiudadanoService, private router: Router, private datosservicios: DatoscservicioService) {

    this.listdptos = departamentos;
    this.dptoDireccion = departamentos[4];
    this.listmunicipios = municipios;
    this.mpioDireccion = municipios[4][0];
    this.capturaDireccion = false;
    this.displayDirNotificacion = true;
    this.idSujeto = ciudService.ciudadanoActivo.idSujeto;
    this.codPostalDireccion = '11001';

    // this.direccion = this.ciudService.ciudadanoActivo.dirContactoNot[0].direccion;

    this.contacto = new Contacto();




    this.listdptos = departamentos;
    this.dptoDireccion = departamentos[4];
    this.listmunicipios = municipios;
    this.mpioDireccion = municipios[4][0];
    console.log('depto el 10' + JSON.stringify(this.dptoDireccion));
    console.log('aguas el 10' + JSON.stringify(this.mpioDireccion));
    this.listviaprimaria = tipoViaPrimaria;
    this.letras = letras;
    this.bis = bis;
    this.cuadrante = cuadrante;
    this.complemento =  complemento;
    this.capturaDireccion = false;
    this.urlEditarDirNoti = 'http://10.180.220.35:7777/ServiciosRITDQ/resources/contribuyente/editaDirecNotDANE/';
    this.urluso = 'http://10.180.220.35:7777/ServiciosRITDQ/resources/consultas/consultaruso/';
    this.url = 'http://10.180.220.35:7777/ServiciosRITDQ/resources/contribuyente';
    this.consultarDatos(ciudService.ciudadanoActivo.tipoDocumento, ciudService.ciudadanoActivo.nroIdentificacion );

    this.validacionRegistroDireccion = ciudService.validacionRegistroDireccion;
    this.validacionTipoUso = ciudService.validacionTipoUso;

    this.consultarTipoUso();

  }




  consultarDatos(tipoDocumento: string, numeroDocumento: string):void{

    if(tipoDocumento != null && numeroDocumento != null) {
      this.consultarContribuyente(tipoDocumento, numeroDocumento)
        .then((value: Irespuesta) => {this.respuesta  = value;
          if(this.ciudService.validacionDireccion){
            this.direccion = '';
          }
          else{
            this.direccion = this.respuesta.contribuyente.dirContactoNot[0].direccion;
          }
        })
        .catch((err: HttpErrorResponse) => {
          if (err.status !== 200) {
          }
        });


    }


  }

  consultarContribuyente(tipo:string, numero: string): Promise<Irespuesta>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = {'codTId': '4', 'nroId': numero};
    console.log('el servicio configurado...'+this.url);
    return this.http.post<Irespuesta>(this.url, params,{headers: headers}).toPromise();

  }


  consultarTipoUso(): void {
    this.consultarTipo()
      .then((value: TipoUso) => {this.respuestauso  = value;
        this.listaTU = this.respuestauso.uso;
        this.listadirTipoUso  = this.listaTU;

      })
      .catch((err: HttpErrorResponse) => {
        if (err.status !== 200) {
        }
      });





  }


  cambioDpto(){
    if(this.dptoDireccion !== '' || this.dptoDireccion != null){
      alert('el departamento es ' + this.dptoDireccion);
      console.log('los municipios del depto', JSON.stringify( this.listmunicipios))


      for (let i = 0; i < this.listmunicipios.length; i++) {
        const Objetompio = this.listmunicipios[i];
        console.log('primeros digitos del municipio', Objetompio.cod);

      }
      // console.log('los municipios despues del filtro', JSON.stringify( this.listmunicipios))
    }
  }



  consultarTipo(): Promise<TipoUso>{
    console.log('el servicio configurado...'+this.urluso);
    return this.http.get<TipoUso>(this.urluso).toPromise();

  }

  ngOnInit() {
  }


  ok(): void {
    this.editarDirNotificacion();
    //  this.consultarContribuyente('4','79768891');
  }


  editarDirNotificacion(): Promise<Irespuesta> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = {direccion: this.direccion, municipio: '11001', departamento: 11, tipoUso: 5, pais: 49, codPostal: this.codPostalDireccion, idSujeto:  this.idSujeto };
    return this.http.post<Irespuesta>('http://10.180.220.35:7777/ServiciosRITDQ/resources/contribuyente/editaDirecNotDANE/', params,{headers: headers}).toPromise();

  }



  cancel(): void{



    this.datosservicios.displayDirNotificacion = false;
  }




  capturar(): void{

    this.capturaDireccion = true;

    // this.router.navigate(['estandarizadorDirecciones']);

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
      var x = this.complemento2.trim();
      this.direccion += compl + ' ' + x;
    } else {
      // mostrarMensaje('Debe diligenciar los dos campos del complemento de la direcci\xf3n para poderlo agregar.', AlertLevel.WARNING);
    }

    this.complemento1 = '';
    this.complemento2 = '';
  }



  registrar(): void {
    this.contacto.idSujeto = this.idSujeto ;
    this.contacto.pais     = '49' ;
    this.urlEditar = this.urlEditarDirNoti ;
    this.contacto.direccion    = this.direccion ;
    this.contacto.municipio    = this.mpioDireccion.cod ;
    this.contacto.departamento = '11' ;
    this.contacto.codPostal    = '110111';
    this.contacto.tipoUso      = this.dirTipoUso;
    this.ciudService.registrarContacto(this.contacto, this.urlEditar);
  }



  cargarDeptos(pais: number) {
    const x: Promise<Irespuesta> = this.ciudService.getDeptos(pais);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        this.deptos = this.respuesta.divpolitica;

      } else {
        //    this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        //      detail: 'No cargo deptos. ', closable: true});

        // alert();
      }
    })
      .catch(() => {
        //  this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        //    detail: 'Error tecnico en la consulta de departamentos', closable: true});

        // alert('Error tecnico en la consulta de departamentos');
      });

  }




  cargarMunic(depto: number) {
    const x: Promise<Irespuesta> = this.ciudService.getMunic(depto);
    x.then((value: Irespuesta) => {
      this.respuesta = value;
      // alert(value);
      if (this.respuesta.codigoError === '0') {
        this.municp = this.respuesta.divpolitica;

      } else {
        //  this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        //    detail: 'Error en la consulta de municipios. ', closable: true});

      }
    })
      .catch(() => {
        //  this.messageService.add({key: 'custom', severity: 'warn', summary: 'Información',
        //    detail: 'Error tecnico en borrar Municipios ', closable: true});
      });

  }



  cambioDepto() {
    this.cargarMunic(this.dptoDireccion);
  }




}
