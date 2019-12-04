import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {valores} from '../config/Propiedades';
import {Irespuesta} from '../dto/irespuesta';
import {Establecimiento} from '../dto/establecimiento';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientosService {

  urlBuscar: string = 'ServiciosRITDQ/resources/estab/consulta/';
  urlBorrar: string = 'ServiciosRITDQ/resources/estab/borra/';
  urlCrear: string = 'ServiciosRITDQ/resources/estab/crea/';


  constructor(private http: HttpClient) { }

  consultar(idSujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : idSujeto
    }
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBuscar}`, datos).toPromise();
  }
  borrar(dato: Establecimiento): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBorrar}`, dato).toPromise();
  }
  crear(dato: Establecimiento): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlCrear}`, dato).toPromise();
  }
}
