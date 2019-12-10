import {Contribuyente} from './contribuyente';
import {Basicovo} from './basicovo';
import {Representante} from './representante';
import {Establecimiento} from './establecimiento';
import {Actividadecon} from './actividadecon';
import {Vehiculo} from './vehiculo';

export interface Irespuesta {
  valor ?: string;
  codigoError ?: string;
  mensaje ?: string;
  contribuyente ?: Contribuyente;
  divpolitica ?: Basicovo[];
  representantes ?: Representante[];
  establecimientos ?: Establecimiento[];
  actividades ?: Actividadecon[];
  vehiculos ?: Actividadecon[];
  predios ?: Actividadecon[];
  authenticated ?: boolean;

}
