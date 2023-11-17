import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSessionComponent } from './components/login-session/login-session.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { FinancierasComponent } from './components/financieras/financieras.component';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';
import { CreditoVehicularComponent } from './components/credito-vehicular/credito-vehicular.component';
import { ViewCronogramaComponent } from './components/view-cronograma/view-cronograma.component';
import { ViewCuotonComponent } from './components/view-cuoton/view-cuoton.component';
import { ViewHistorialComponent } from './components/view-historial/view-historial.component'; 
import { RefinanciamientoComponent } from './components/refinanciamiento/refinanciamiento.component';
import { DevolucionComponent } from './components/devolucion/devolucion.component';
const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LoginSessionComponent },
  { path: 'check/in', component: CheckInComponent },
  { path: 'financieras', component: FinancierasComponent},
  { path: 'close/session', component: CerrarSesionComponent },
  { path: 'credito/vehicular', component: CreditoVehicularComponent },
  { path: 'view/cronograma/:tipoMoneda/:fechaDesembolso/:valorVehiculo/:tasaEfectivaAnual/:periodoPago/:tasaDescuento/:seguroDesgravamen/:cuotaInicial/:montoPrestamo/:cuotaFinal/:cuotasAño/:gastosNotariales/:gastosRegistrales/:comisionEstudio/:portes/:gastosAdministracion/:seguroVehicularAnual/:periodoTotal/:periodoParcial', component: ViewCronogramaComponent },
  { path: 'view/cuoton/:periodoPago/:tasaEfectivaAnual/:seguroDesgravamen/:cuotaFinal/:montoPrestamo/:fechaDesembolso', component: ViewCuotonComponent },
  { path: 'view/historial', component: ViewHistorialComponent },
  { path: 'view/refinanciamiento/:tipoMoneda/:fechaDesembolso/:valorVehiculo/:tasaEfectivaAnual/:periodoPago/:tasaDescuento/:seguroDesgravamen/:cuotaInicial/:montoPrestamo/:cuotaFinal/:cuotasAño/:gastosNotariales/:gastosRegistrales/:comisionEstudio/:portes/:gastosAdministracion/:seguroVehicularAnual/:periodoTotal/:periodoParcial', component: RefinanciamientoComponent },
  { path: 'view/devolucion/:tipoMoneda/:fechaDesembolso/:valorVehiculo/:tasaEfectivaAnual/:periodoPago/:tasaDescuento/:seguroDesgravamen/:cuotaInicial/:montoPrestamo/:cuotaFinal/:cuotasAño/:gastosNotariales/:gastosRegistrales/:comisionEstudio/:portes/:gastosAdministracion/:seguroVehicularAnual/:periodoTotal/:periodoParcial/:montoPagado', component: DevolucionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
