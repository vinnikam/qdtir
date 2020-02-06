import { Injectable } from '@angular/core';
import {valores} from '../config/Propiedades';
import {HttpClient} from '@angular/common/http';
import {Contribuyente} from '../dto/contribuyente';
import {Irespuesta} from '../dto/irespuesta';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  urlconsulta = 'ServiciosRITDQ/resources/funcionario/consultafuncio/';
  urlcrear = 'ServiciosRITDQ/resources/funcionario/crearfuncio/';
  urlinactivar = 'ServiciosRITDQ/resources/funcionario/inactfuncio/';
  urlconsultaAll = 'ServiciosRITDQ/resources/funcionario/todosFuncio/';


  constructor(private http: HttpClient) { }

  consulta(usuario: string): Promise<Irespuesta> {
    const datos = {
      pnombre: usuario

    };
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlconsulta}`, datos).toPromise();
  }
  crear(usuario: string, fechainia: string, fechafina: string ): Promise<Irespuesta> {
    const datos = {
      pnombre: usuario,
      fechaini: fechainia,
      fechafin: fechafina
    };
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlcrear}`, datos).toPromise();
  }
  inactivar(usuario: string, fechafina: string): Promise<Irespuesta> {
    const datos = {
      pnombre: usuario,
      fechafin: fechafina
    };
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlinactivar}`, datos).toPromise();
  }
  consultarAll(): Promise<Irespuesta> {
    return this.http.post<Irespuesta>(`${valores.ip_servidor}${this.urlconsultaAll}`, null).toPromise();
  }
}
