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
  // server: string = ip_servidor'http://127.0.0.1:7101/';

  urlBuscar = 'ServiciosRITDQ/resources/repres/consulta/';
  urlBorrar = 'ServiciosRITDQ/resources/repres/borra/';
  urlCrear = 'ServiciosRITDQ/resources/repres/crea/';
  urlClase = 'ServiciosRITDQ/resources/repres/clasesrepre/';
  urlTipoR = 'ServiciosRITDQ/resources/repres/tiposrepre/';


  constructor(private http: HttpClient) { }

  consultar(idsujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : idsujeto
    };
    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBuscar}`, datos).toPromise();
  }
  borrar(dato: Representante): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlBorrar}`, dato).toPromise();
  }
  crear(dato: Representante): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlCrear}`, dato).toPromise();
  }
  consultatiposrepre(codigo: number): Promise<Irespuesta> {

    return  this.http.get<Irespuesta>(`${valores.ip_servidor}${this.urlTipoR}${codigo}`).toPromise();
  }
  consultaclaserepre(): Promise<Irespuesta> {

    return  this.http.get<Irespuesta>(`${valores.ip_servidor}${this.urlClase}`).toPromise();

  }

}
