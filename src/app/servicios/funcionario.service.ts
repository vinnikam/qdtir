import { Injectable } from '@angular/core';
import {valores} from '../config/Propiedades';
import {HttpClient} from '@angular/common/http';
import {Contribuyente} from '../dto/contribuyente';
import {Irespuesta} from '../dto/irespuesta';
import {EnvService} from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  urlconsulta = 'ServiciosRITDQ/resources/funcionario/consultafuncio/';
  urlcrear = 'ServiciosRITDQ/resources/funcionario/crearfuncio/';
  urlinactivar = 'ServiciosRITDQ/resources/funcionario/inactfuncio/';
  urlconsultaAll = 'ServiciosRITDQ/resources/funcionario/todosFuncio/';

  ipservidor: string;

  constructor(private http: HttpClient, private env: EnvService) {
    this.ipservidor = env.urlservicios.toString();
  }

  consulta(usuario: string): Promise<Irespuesta> {
    const datos = {
      pnombre: usuario

    };
    return this.http.post<Irespuesta>(`${this.ipservidor}${this.urlconsulta}`, datos).toPromise();
  }
  crear(autenticado: string, usuario: string, fechainia: string, fechafina: string, permiso: number ): Promise<Irespuesta> {
    const datos = {
      pnombre: usuario,
      fechaini: fechainia,
      fechafin: fechafina,
      codigo: permiso,
      fuente: 1,
      canal: 'RITWEB_FUNCIONARIO',
      usuarioauten: autenticado
    };
    return this.http.post<Irespuesta>(`${this.ipservidor}${this.urlcrear}`, datos).toPromise();
  }
  inactivar(autenticado: string, usuario: string, fechafina: string): Promise<Irespuesta> {
    const datos = {
      pnombre: usuario,
      fechafin: fechafina,
      fuente: 1,
      canal: 'RITWEB_FUNCIONARIO',
      usuarioauten: autenticado

    };
    return this.http.post<Irespuesta>(`${this.ipservidor}${this.urlinactivar}`, datos).toPromise();
  }
  consultarAll(): Promise<Irespuesta> {
    return this.http.post<Irespuesta>(`${this.ipservidor}${this.urlconsultaAll}`, null).toPromise();
  }
}
