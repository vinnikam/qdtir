export const valores = {
  // ip_servidor : 'http://10.180.220.35:7777/',
  certificadoRit : 'ServiciosRITDQ/certificado?',
  ip_servidor : 'http://10.180.52.86:7101/',
  admin: 'adminrit',
  clave: '9102qdtir'
}
export const tiposIdenJuridico = [
  {codigo: '', nombre: 'Seleccione una opción'},
  {codigo: '3', nombre: 'N.I.T.'},
  {codigo: '9', nombre: 'NIT EXTRANJERO'}
];
export const tiposIdenNatural = [
  {codigo: '', nombre: 'Seleccione una opción'},
  {codigo: '4', nombre: 'CEDULA DE CIUDADANIA'},
  {codigo: '2', nombre: 'CEDULA DE EXTRANJERIA'},
  {codigo: '5', nombre: 'PASAPORTE'},
  {codigo: '6', nombre: 'CARNET DIPLOMATICO'},
  {codigo: '1', nombre: 'TARJETA DE IDENTIDAD'},
  {codigo: '7', nombre: 'REGISTRO CIVIL'},
  {codigo: '8', nombre: 'N.U.I.P'}

];
// ng build --prod --base-href="/RITDQWEB/index.html"
export const es = {
  // date
  closeText: 'Cerrar' ,
  prevText: '<Ant' ,
  nextText: 'Sig>' ,
  currentText: 'Hoy' ,
  monthNames: [ 'enero' ,  'febrero' ,  'marzo'  ,  'abril'  ,  'mayo'  ,  'junio' ,
    'julio' , 'agosto' , 'septiembre' , 'octubre' , 'noviembre' , 'diciembre' ] ,
  monthNamesShort: [ 'ene' , 'feb' , 'mar' , 'abr' , 'may' , 'jun',
    'jul' , 'ago' , 'sep' , 'oct' , 'nov' , 'dic' ] ,
  dayNames: [ 'domingo' , 'lunes' , 'martes' , 'miércoles' , 'jueves' , 'viernes' , 'sábado' ] ,
  dayNamesShort: [ 'dom' , 'lun' , 'mar' , 'mié' , 'jue' , 'vie' , 'sáb' ] ,
  dayNamesMin: [ 'D' , 'L' , 'M' , 'X' , 'J' , 'V' , 'S' ] ,
  weekHeader: 'Sm' ,
  dateFormat: 'dd/mm/yy' ,
  firstDay: 1 ,
  isRTL: false ,
  showMonthAfterYear: false ,
  yearSuffix: '',

  // time
  timeOnlyTitle: 'Elegir una hora' ,
  timeText: 'Hora' ,
  hourText: 'Horas' ,
  minuteText: 'Minutos' ,
  secondText: 'Segundos' ,
  millisecText: 'Milisegundos' ,
  microsecText: 'Microsegundos' ,
  timezoneText: 'Uso horario' ,
  timeFormat: 'HH:mm' ,
  timeSuffix: '' ,
  amNames: ['a.m.' ,  'AM' ,  'A'] ,
  pmNames: ['p.m.' ,  'PM' ,  'P'] ,
};
