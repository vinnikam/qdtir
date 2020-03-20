import {DireccionesContacto} from './direcciones-contacto';
import {DireccionesContactoNotificacion} from './direcciones-contacto-notificacion';
import {Email} from './email';
import {Basicovo} from './basicovo';
import {AplicacionDescuento} from './aplicacion-descuento';

export class Contribuyente {
  idSujeto ?: number;
  tipoDocumento ?: string;
  nroIdentificacion ?: string;
  primerNombre ?: string;
  segundoNombre ?: string;
  primerApellido ?: string;
  segundoApellido ?: string;
  matriculaMercantil ?: string;
  estadoRIT ?: string;
  tipoPersona ?: number; // 1 NATURAL - 2 JURIDICA
  direccion ?: string;
  municipio ?: number;
  municipionombre ?: string;
  departamento ?: number;
  codPostal ?: number;
  pais ?: number;
  telefono ?: string;
  tipoTelefono ?: string;
  nuevoCorreo ?: string;
  indBuzon ?: number;
  notif ?: number;
  usuario ?: string;
  canal ?: string;
  descuento ?: boolean;
  clave ?: string;
  naturaleza ?: Basicovo;
  fecharegimenBogota ?: string;
  regimenTrib ?: string;
  fechaDocumento ?: Date;
  fechaDocumentoS ?: string;


  dirContacto ?: DireccionesContacto [];
  dirContactoNot ?: DireccionesContactoNotificacion[];
  email ?: Email[];
  telefonos ?: Basicovo[];

  aplicaDescuento?: AplicacionDescuento;

  certificadoRit ?: string;


}
