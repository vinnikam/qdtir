import {Contribuyente} from './contribuyente';
import {Basicovo} from './basicovo';

export interface Irespuesta {
  valor ?: string;
  codigoError ?: string;
  mensaje ?: string;
  contribuyente ?: Contribuyente;
  divpolitica ?: Basicovo[];

}
