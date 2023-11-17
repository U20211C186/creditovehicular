import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*proporciona servicios de red para las aplicaciones Angular. 
Permite realizar solicitudes HTTP a servidores remotos y 
recibir respuestas en formato JSON u otros formatos.*/
import {HttpClientModule} from '@angular/common/http'

/*proporciona servicios de enrutamiento para las aplicaciones 
web de Angular. Permite configurar la navegación de la aplicación 
y definir rutas que corresponden a distintas páginas o componentes 
de la misma.*/
import {RouterModule} from '@angular/router';

import { MaterialModule } from 'src/shared/material.module';
import { LoginSessionComponent } from './components/login-session/login-session.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { FinancierasComponent } from './components/financieras/financieras.component';
import { ToolbarSessionComponent } from './components/toolbar-session/toolbar-session.component';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';
import { CreditoVehicularComponent } from './components/credito-vehicular/credito-vehicular.component';
import { ViewCronogramaComponent } from './components/view-cronograma/view-cronograma.component';
import { ViewCuotonComponent } from './components/view-cuoton/view-cuoton.component';
import { ViewHistorialComponent } from './components/view-historial/view-historial.component';
import { RefinanciamientoComponent } from './components/refinanciamiento/refinanciamiento.component';
import { DevolucionComponent } from './components/devolucion/devolucion.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginSessionComponent,
    CheckInComponent,
    FinancierasComponent,
    ToolbarSessionComponent,
    CerrarSesionComponent,
    CreditoVehicularComponent,
    ViewCronogramaComponent,
    ViewCuotonComponent,
    ViewHistorialComponent,
    RefinanciamientoComponent,
    DevolucionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
