import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {valores} from '../config/Propiedades';
import {Irespuesta} from '../dto/irespuesta';
import {Representante} from '../dto/representante';
import {Actividadecon} from '../dto/actividadecon';
import {Actividad} from '../dto/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  urlBuscar: string = 'ServiciosRITDQ/resources/activ/consulta/';
  urlBorrar: string = 'ServiciosRITDQ/resources/activ/borra/';
  urlCrear: string = 'ServiciosRITDQ/resources/activ/crea/';


  constructor(private http: HttpClient) { }

  consultar(idsujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : idsujeto
    }
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBuscar}`, datos).toPromise();
  }
  borrar(dato: Actividad): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBuscar}`, dato).toPromise();
  }
  crear(dato: Actividad): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlCrear}`, dato).toPromise();
  }
}
