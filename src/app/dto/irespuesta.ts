import {Contribuyente} from './contribuyente';
import {Basicovo} from './basicovo';
import {Representante} from './representante';
import {Establecimiento} from './establecimiento';
import {Actividadecon} from './actividadecon';
import {Vehiculo} from './vehiculo';
import { Predio } from './predio';

export interface Irespuesta {
  valor ?: string;
  codigoError ?: string;
  mensaje ?: string;
  contribuyente ?: Contribuyente;
  divpolitica ?: Basicovo[];
  representantes ?: Representante[];
  establecimientos ?: Establecimiento[];
<<<<<<< HEAD
  actividades ?: Actividadecon[];
  vehiculos ?: Actividadecon[];
  predios ?: Predio[];

=======
  actividades ?: Actividadecon;
  vehiculos ?: Vehiculo[];
  predios ?: any[];
  authenticated ?: boolean;
>>>>>>> 08d03d1697bde508e2c201ed90b9251447b7da4f

}
