import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestionfunc',
  templateUrl: './gestionfunc.component.html',
  styleUrls: ['./gestionfunc.component.css']
})
export class GestionfuncComponent implements OnInit {

  opccrear: boolean;

  constructor() {
    this.opccrear = true;
  }

  ngOnInit() {
  }
  ejecutaaccion() {

  }

}
