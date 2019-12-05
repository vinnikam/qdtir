import {Basicovo} from './basicovo';

export class Vehiculo {
  placa ?: string;

  marca ?: string;
  linea ?: string;
  tipoServicio ?: Basicovo;
  clase ?: Basicovo;
  modelo ?: number;
  capacidadPasajeros ?: number;
  apacidadCarga ?: number;

  carroceria ?: Basicovo;

  responsable ?: string;
  porcentajeRespon ?: string;
}
