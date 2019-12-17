import { Injectable } from '@angular/core';
import {valores} from '../config/Propiedades';
import {HttpClient} from '@angular/common/http';
import {Contribuyente} from '../dto/contribuyente';
import {Irespuesta} from '../dto/irespuesta';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  urlconsulta: string = 'ServiciosRITDQ/resources/consultas/consultafuncio/';
  urlcrear: string = 'ServiciosRITDQ/resources/consultas/crearfuncio/';
  urlinactivar: string = 'ServiciosRITDQ/resources/consultas/inactfuncio/';


  constructor(private http: HttpClient) { }

  consulta(usuario: string): Promise<Irespuesta> {
    const datos = {
      pnombre: usuario

    }
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlconsulta}`, datos).toPromise();
  }
  crear(usuario: string, fechainia: string, fechafina: string ): Promise<Irespuesta> {
    const datos = {
      pnombre: usuario,
      fechaini: fechainia,
      fechafin: fechafina
    }
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlcrear}`, datos).toPromise();
  }
  inactivar(usuario: string, fechainia: string, fechafina: string): Promise<Irespuesta> {
    const datos = {
      pnombre: usuario,
      fechafin: fechafina
    }
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlinactivar}`, datos).toPromise();
  }
}
