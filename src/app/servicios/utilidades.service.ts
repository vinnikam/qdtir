import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(private datapipe: DatePipe) { }

  cambiafecha(fecha: string) {
    if (fecha !== undefined){
      const newDate = new Date(fecha);
      fecha = this.datapipe.transform(newDate,'dd/MM/yyyy' );
      // alert(newDate + ' ' + fecha);
    }

    return fecha;
  }
}
