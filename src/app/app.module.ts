import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AutenticacionComponent } from './componentes/autenticacion/autenticacion.component';
import { CiudadanoComponent } from './componentes/ciudadano/ciudadano.component';
import { DatosContactoComponent } from './componentes/datos-contacto/datos-contacto.component';
import { ActividadesEconomicasComponent } from './componentes/actividades-economicas/actividades-economicas.component';
import { RepresentantesComponent } from './componentes/representantes/representantes.component';
import { EstablecimientosComponent } from './componentes/establecimientos/establecimientos.component';
import { VehiculosComponent } from './componentes/vehiculos/vehiculos.component';
import { PrediosComponent } from './componentes/predios/predios.component';
import {AuthServiceService} from './servicios/auth-service.service';
import {Seguridad} from './security/Seguridad';
import { FooterComponent } from './componentes/footer/footer.component';
import { HeaderComponent } from './componentes/header/header.component';
import {CiudadanoService} from './servicios/ciudadano.service';
import { AutenticarciudComponent } from './componentes/autenticarciud/autenticarciud.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CiudadanonvComponent } from './componentes/ciudadanonv/ciudadanonv.component';
import { Descuento1Component } from './componentes/descuento1/descuento1.component';
import {TabMenuModule} from 'primeng/tabmenu';

import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MenubarModule} from 'primeng/menubar';


const appRoutes: Routes = [
  {path: '', component: AutenticacionComponent},
  {path: 'autenticar', component: AutenticacionComponent},
  {path: 'autenticarCiud', component: AutenticarciudComponent},
  {path: 'crearbus', component: CiudadanoComponent, canActivate: [Seguridad]},
  {path: 'crearciu', component: CiudadanonvComponent, canActivate: [Seguridad]},
  {path: 'datoscontacto', component: DatosContactoComponent, canActivate: [Seguridad]},
  {path: 'actividades', component: ActividadesEconomicasComponent, canActivate: [Seguridad]},
  {path: 'representantes', component: RepresentantesComponent, canActivate: [Seguridad]},
  {path: 'establecimientos', component: EstablecimientosComponent, canActivate: [Seguridad]},
  {path: 'vehiculos', component: VehiculosComponent, canActivate: [Seguridad]},
  {path: 'predios', component: PrediosComponent, canActivate: [Seguridad]},
  {path: 'descuento', component: Descuento1Component, canActivate: [Seguridad]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AutenticacionComponent,
    CiudadanoComponent,
    DatosContactoComponent,
    ActividadesEconomicasComponent,
    RepresentantesComponent,
    EstablecimientosComponent,
    VehiculosComponent,
    PrediosComponent,
    FooterComponent,
    HeaderComponent,
    AutenticarciudComponent,
    CiudadanonvComponent,
    Descuento1Component,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TabMenuModule,
    AngularFontAwesomeModule,
    MenubarModule
  ],
  providers: [AuthServiceService, Seguridad, CiudadanoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
