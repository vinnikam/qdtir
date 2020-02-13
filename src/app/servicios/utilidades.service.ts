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
      const newDate = new Date(fecha);
      fecha = this.datapipe.transform(newDate, 'dd/MM/yyyy' );
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
  obtenerSolofecha(fecha: Date): Date {
    const fechas = this.datapipe.transform(fecha, 'dd/MM/yyyy');
    const hoyD = new Date(fechas);
    return hoyD;

  }

}
