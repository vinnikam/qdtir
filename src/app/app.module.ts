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
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TooltipModule} from 'primeng/tooltip';



import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import { GestionfuncComponent } from './componentes/gestionfunc/gestionfunc.component';
import {NavbarserviceService} from './servicios/navbarservice.service';
import { AutentadminComponent } from './componentes/autentadmin/autentadmin.component';
import {MessageService} from 'primeng/api';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';


import {DatePipe} from '@angular/common';
import { EstandarizadorComponent } from './componentes/estandarizador/estandarizador.component';
import { DireNhistComponent } from './componentes/dire-nhist/dire-nhist.component';


import {ToggleButtonModule} from 'primeng/togglebutton';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { SoloTextoDirective } from './servicios/solo-texto.directive';




const appRoutes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent}, // autenticar
  {path: 'funcionario', component: AutenticacionComponent}, // autenticar
  {path: 'contribuyente', component: AutenticarciudComponent}, // autenticarCiud
  {path: 'admingral', component: AutentadminComponent}, // autenticaadmin
  {path: 'crearbus', component: CiudadanoComponent, canActivate: [Seguridad]},
  {path: 'crearciu', component: CiudadanonvComponent, canActivate: [Seguridad]},
  {path: 'datoscontacto', component: DatosContactoComponent, canActivate: [Seguridad]},
  {path: 'actividades', component: ActividadesEconomicasComponent, canActivate: [Seguridad]},
  {path: 'representantes', component: RepresentantesComponent, canActivate: [Seguridad]},
  {path: 'establecimientos', component: EstablecimientosComponent, canActivate: [Seguridad]},
  {path: 'vehiculos', component: VehiculosComponent, canActivate: [Seguridad]},
  {path: 'predios', component: PrediosComponent, canActivate: [Seguridad]},
  {path: 'gestionfuncionario', component: GestionfuncComponent, canActivate: [Seguridad]},
  {path: 'descuento', component: Descuento1Component, canActivate: [Seguridad]},
  {path: 'historicodir', component: DireNhistComponent, canActivate: [Seguridad]},
  {path: 'gestionparam', component: DireNhistComponent, canActivate: [Seguridad]}
];


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
    GestionfuncComponent,
    AutentadminComponent,
    EstandarizadorComponent,
    DireNhistComponent,
    InicioComponent,
    SoloTextoDirective,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TabMenuModule,
    AngularFontAwesomeModule,
    MenubarModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    CalendarModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    DropdownModule,
    CheckboxModule,
    PanelModule,
    TabViewModule,
    RadioButtonModule,
    TooltipModule,
    ToggleButtonModule
  ],
  providers: [AuthServiceService, Seguridad, CiudadanoService, NavbarserviceService, MessageService, DatePipe, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
