export class Funcionario {
  nombre ?: string;
  estado?: string;
  fechaInicio?: Date;
  fechaInicioS?: string;
  fechaFin?: Date;
  fechaFinS?: string;
  toUper(): void {
    this.nombre = this.nombre.toLocaleUpperCase();
  }
}
