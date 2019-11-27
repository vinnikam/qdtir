import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contribuyente} from '../dto/contribuyente';
import {Irespuesta} from '../dto/irespuesta';
import {Telefono} from '../dto/telefono';
import {Correo} from '../dto/correo';
import {Direccion} from '../dto/direccion';

@Injectable({
  providedIn: 'root'
})
export class DatoscservicioService {
  server: string = 'http://10.180.220.35:7777/';
  urlBuscar: string = 'ServiciosRITDQ/resources/contribuyente';

  constructor(private http: HttpClient) { }

  consultaTelefonos(idSujeto: number): Promise<Telefono[]> {
    return null;
  }
  consultaCorreos(idSujeto: number): Promise<Correo[]> {
    return null;
  }
  consultaDirecciones(idSujeto: number): Promise<Direccion> {
    return null;
  }
  borraTelefonos(idSujeto: number, idDato: number): Promise<Irespuesta> {
    return null;
  }
  borraCorreos(idSujeto: number, idDato: number): Promise<Irespuesta> {
    return null;
  }
  borraDirecciones(idSujeto: number, idDato: number): Promise<Irespuesta> {
    return null;
  }
  creaTelefonos(idSujeto: number, datos: Telefono): Promise<Irespuesta> {
    return null;
  }
  creaCorreos(idSujeto: number, datos: Correo): Promise<Irespuesta> {
    return null;
  }
  creaDirecciones(idSujeto: number, datos: Direccion): Promise<Irespuesta> {
    return null;
  }


}
