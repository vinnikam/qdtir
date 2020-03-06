import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {valores} from '../config/Propiedades';
import {Irespuesta} from '../dto/irespuesta';
import {Establecimiento} from '../dto/establecimiento';
import {EnvService} from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientosService {

  urlBuscar = 'ServiciosRITDQ/resources/estab/consulta/';
  urlBorrar = 'ServiciosRITDQ/resources/estab/borra/';
  urlCrear  = 'ServiciosRITDQ/resources/estab/crea/';

  ipservidor: string;


  constructor(private http: HttpClient, private env: EnvService) {
    this.ipservidor = env.urlservicios.toString();
  }

  consultar(idsujeto: number): Promise<Irespuesta> {
    const datos = {
      idSujeto : idsujeto
    };
    return  this.http.post<Irespuesta>(`${this.ipservidor}${this.urlBuscar}`, datos).toPromise();
  }
  borrar(dato: Establecimiento): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${this.ipservidor}${this.urlBorrar}`, dato).toPromise();
  }
  crear(dato: Establecimiento): Promise<Irespuesta> {

    return  this.http.post<Irespuesta>(`${this.ipservidor}${this.urlCrear}`, dato).toPromise();
  }
}
