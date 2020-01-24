import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {valores} from '../config/Propiedades';
import {Irespuesta} from '../dto/irespuesta';
import {Establecimiento} from '../dto/establecimiento';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientosService {

  urlBuscar = 'ServiciosRITDQ/resources/estab/consulta/';
  urlBorrar = 'ServiciosRITDQ/resources/estab/borra/';
  urlCrear  = 'ServiciosRITDQ/resources/estab/crea/';


  constructor(private http: HttpClient) { }

  consultar(idsujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : idsujeto
    };
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBuscar}`, datos).toPromise();
  }
  borrar(dato: Establecimiento): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBorrar}`, dato).toPromise();
  }
  crear(dato: Establecimiento): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlCrear}`, dato).toPromise();
  }
}
