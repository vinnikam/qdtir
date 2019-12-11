import {Basicovo} from './basicovo';

export class Vehiculo {
  placa ?: string;

  marca ?: Basicovo;
  linea ?: Basicovo;
  tipoServicio ?: Basicovo;
  clase ?: Basicovo;
  modelo ?: number;
  capacidadPasajeros ?: number;
  apacidadCarga ?: number;

  carroceria ?: Basicovo;

  responsable ?: string;
  porcentajeRespon ?: string;
}
