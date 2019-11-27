import {Contribuyente} from './contribuyente';

export interface Irespuesta {
  valor: string;
  codigoError: string;
  mensaje: string;
  contribuyente: Contribuyente;
}
