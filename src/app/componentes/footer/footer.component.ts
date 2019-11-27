import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer: string;
  footer1: string;
  footer2: string;
  footer3: string;
  footer4: string;
  footer5: string;
  footer6: string;
  footer7: string;
  footer8: string;
  footer9: string;
  constructor() {
    this.footer =  'Sede Administrativa:';
    this.footer1 =  'Carrera 30 Nº 25-90';
    this.footer2 =  'Código Postal 111311';
    this.footer3 =  'PBX: (571) 338 5000';
    this.footer4 =  'Información: Línea 195';
    this.footer5 =  'www.haciendabogota.gov.co';
    this.footer6 =  'Bogotá Te Escucha – SDQS - Bogota.gov.co';
    this.footer7 =  'Notificaciones Judiciales - notificacionesjudiciales@alcaldiabogota.gov.co';
    this.footer8 =  'Nit. 899.999.061-9';
    this.footer9 =  'Bogotá - Distrito Capital, Colombia.';
  }

  ngOnInit() {
  }

}
