import { Component, OnInit } from '@angular/core';
import {CiudadanoService} from '../../servicios/ciudadano.service';
import {Router} from '@angular/router';
import { Irespuesta } from 'src/app/dto/irespuesta';
import { Predio } from 'src/app/dto/predio';

@Component({
  selector: 'app-predios',
  templateUrl: './predios.component.html',
  styleUrls: ['./predios.component.css']
})
export class PrediosComponent implements OnInit {
  respuesta: Irespuesta;
  predios: Predio[];
  //5847944,5847644

  constructor(private ciudService: CiudadanoService,
              private router: Router) {
    if (this.ciudService.ciudadanoActivo === null) {
      alert('No hay ciudadano activo')
      this.router.navigate(['/crearciu']);
    }else {
      this.consultar(this.ciudService.ciudadanoActivo.idSujeto);
      //this.consultar(5847944);
    }
  }
  ngOnInit() {
  } 
  consultar(idsujeto: number){
    const x: Promise<Irespuesta> = this.ciudService.consultaPredios(idsujeto);
    x.then((value: Irespuesta) => {
       this.respuesta = value;
      
      if (this.respuesta.codigoError === '0') {
       
        this.predios = this.respuesta.predios;

      } else {
        ;
        alert(this.respuesta.mensaje);
        this.ciudService.ciudadanoActivo = null;
      }
    })
      .catch(() => {alert('Error tecnico en la consulta del servicio Buscar'); });
    

  }

}
