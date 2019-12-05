import { Injectable } from '@angular/core';
import {Irespuesta} from '../dto/irespuesta';
import {HttpClient} from '@angular/common/http';
import {valores} from '../config/Propiedades';
import {Establecimiento} from '../dto/establecimiento';
import {Representante} from '../dto/representante';

@Injectable({
  providedIn: 'root'
})
export class RepresentantesService {
  server: string = 'http://127.0.0.1:7101/';

  urlBuscar: string = 'ServiciosRITDQ/resources/repres/consulta/';
  urlBorrar: string = 'ServiciosRITDQ/resources/repres/borra/';
  urlCrear: string = 'ServiciosRITDQ/resources/repres/crea/';


  constructor(private http: HttpClient) { }

  consultar(idSujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : idSujeto
    }
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBuscar}`, datos).toPromise();
  }
  borrar(dato: Representante): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBorrar}`, dato).toPromise();
  }
  crear(dato: Representante): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlCrear}`, dato).toPromise();
  }
}
