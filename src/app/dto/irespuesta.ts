import {Contribuyente} from './contribuyente';
import {Basicovo} from './basicovo';
import {Representante} from './representante';
import {Establecimiento} from './establecimiento';
import {Actividadecon} from './actividadecon';
import {Vehiculo} from './vehiculo';
import { Predio } from './predio';
import {Descuentovo} from './descuentovo';
import {DireccionesHistSujeto} from './direcciones-hist-sujeto';
import {Funcionario} from './funcionario';

export interface Irespuesta {
  valor ?: string;
  codigoError ?: string;
  mensaje ?: string;
  contribuyente ?: Contribuyente;
  divpolitica ?: Basicovo[];
  representantes ?: Representante[];
  establecimientos ?: Establecimiento[];
  direccionesHistoN ?: DireccionesHistSujeto[];

  actividades ?: Actividadecon;

  vehiculos ?: Vehiculo[];
  predios ?: Predio[];

  authenticated ?: boolean;

  descuentos1 ?: Descuentovo[];

  claserepres ?: Basicovo[];
  tiporepres ?: Basicovo[];
  token ?: string;

  funcionarios ?: Funcionario[];


}
