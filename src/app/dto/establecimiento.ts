export class Establecimiento {
  id ?: number;
  idSujeto ?: number;
  fechaApertura ?: string;
  fechaCierre ?: string;
  fechaAperturaD ?: Date;
  fechaCierreD ?: Date;
  nombre ?: string;
  matricula ?: number;
  direccion ?: string;
  telefono1 ?: number;
  telefono2 ?: number;
  estadomatricula ?: number;
  tipo ?: number;
  pais?: number;
  municipio?: number;
  ciudad?: number;
  depto?: number;
  codPostal?: number;

  fuente =  1; // shd
  usuarioauten ?: string;
  canal ?: string;
  funcionarioaut ?: string;

}
