import {Basicovo} from './basicovo';

export class Funcionario {
  nombre ?: string;
  estado ?: string;
  fechaInicio ?: Date;
  fechaInicioS ?: string;
  fechaFin ?: Date;
  fechaFinS ?: string;
  permisos ?: Basicovo;

  toUper(): void {
    this.nombre = this.nombre.toLocaleUpperCase();
  }
}
