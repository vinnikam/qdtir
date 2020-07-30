export class Actividad {

  idActividad ?: number;
  codigo ?: number;
  descripcion ?: string;
  fec_inicio ?: string;
  fecCese ?: string;
  fec_inicioD ?: Date;
  fecCeseD ?: Date;
  union ?: string;

  usuario ?: string;
  idSujeto ?: number;

  fuente =  1; // shd
  usuarioauten ?: string;
  canal ?: string;
  funcionarioaut ?: string;
}
