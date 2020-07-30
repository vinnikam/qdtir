export class Representante {
  codigoRepres ?: number;
  idSujeto ?: number;
  tipoDocumento ?: string;
  documento ?: string;
  nombre ?: string;
  fechaInicio ?: string;
  fechaInicioD ?: Date;
  claseRepres ?: string;
  tipoRepres ?: string;
  fechaCierre ?: string;
  fechaCierreD ?: Date;
  idRepresentacion ?: number;

  fuente =  1; // shd
  usuarioauten ?: string;
  canal ?: string;
  funcionarioaut ?: string;
}
