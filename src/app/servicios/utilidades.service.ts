import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import {switchAll} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(private datapipe: DatePipe) { }

  fechaValida(fecha: string): boolean {
    if (fecha === undefined || fecha === '') {
      return false;
    }

    const hoy = this.obtenerFechahoy();
    const fechaCompa = new Date(fecha);
    if (fechaCompa >= hoy) {
      return true;
    }
    return false;
  }
  cambiafecha(fecha: string) {
    if (fecha !== undefined) {
      // const newDate = new Date(fecha);
      fecha = this.datapipe.transform(fecha, 'dd/MM/yyyy' );
    }

    return fecha;
  }
  convertirtipoidenti(cadena: string): string {
    switch (cadena) {
      case  'TARJETA_DE_IDENTIDAD':
        return '1';
      case  'CEDULA_DE_EXTRANJERIA':
        return '2';
      case  'NUMERO_DE_IDENTIFICACION_TRIBUTARIA':
        return '3';
      case  'CEDULA_DE_CIUDADANIA':
        return '4';
      case  'PASAPORTE':
        return '5';
      case  'CARNET_DIPLOMATICO':
        return '6';
      case  'REGISTRO_CIVIL_DE_NACIMIENTO':
        return '7';
      case  'NUMERO_UNICO_DE_IDENTIFICACION_PERSONAL':
        return '8';
      case  'NIT_EXTRANJERO':
        return '9';
      default:
        return '2';
    }
  }
  convertirtipoidenticorto(cadena: string): string {
      switch (cadena) {
        case  'T.I.':
          return '1';
        case  'C.E.':
          return '2';
        case  'N.I.T.':
          return '3';
        case  'C.C.':
          return '4';
        case  'PASAPORTE':
          return '5';
        case  'CARNET DIPLOMATICO':
          return '6';
        case  'REGISTRO CIVIL':
          return '7';
        case  'N.U.I.P.':
          return '8';
        case  'NIT EXTRANJERO':
          return '9';
        default:
          return '2';
      }
  }
  obtenerFechahoy(): Date {
    const hoy = new Date();
    const fecha = this.datapipe.transform(hoy, 'MM-dd-yyyy');
    const hoyD = new Date(fecha);
    return hoyD;

  }
  formateaFecha(fecha: string) {
    let fechad = new Date();
    try { // instrucciones a probar
      fechad = new Date(fecha);
    } catch (e) {
      fechad = new Date();
    }
    return fechad;
  }

  obtenerSolofecha(fecha: Date): Date {
    const fechas = this.datapipe.transform(fecha, 'dd/MM/yyyy');
    const hoyD = new Date(fechas);
    return hoyD;

  }
  convierteDateJvaDateJson(fecha: Date): Date {
    const fechas = this.datapipe.transform(fecha, 'yyyy-MM-dd');
    const lafecha = new Date(fechas);
    return lafecha;

  }
  validaCampo(campo: any): boolean {
    if (campo === '' || campo === null || campo === undefined) {
      return false;
    }
    return true;
  }
   validaLongitud(dato: string, longmin: number) {
    console.log(dato.length);
    if (dato.length < longmin) {
      return false;
    } else {
      return true;
    }

  }
  validaLongitudMinMax(dato: string, longmin: number, longmax) {
    // console.log(dato.length);
    if (dato.length < longmin || dato.length > longmax) {
      return false;
    } else {
      return true;
    }

  }
  validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  obtenerPostalCod(coddepto: number)  {
    let  postal = '' + coddepto + '0001';
    if (postal.length === 5) {
      postal = '0' + postal;
    }
    return postal;
  }

}
