import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credito-vehicular',
  templateUrl: './credito-vehicular.component.html',
  styleUrls: ['./credito-vehicular.component.css']
})
export class CreditoVehicularComponent implements OnInit {
  constructor( private router: Router) { }
  ngOnInit() {
    const tipoMonedaInputs = document.querySelectorAll('input[name="currency"]');

    tipoMonedaInputs.forEach((input) => {
      input.addEventListener('change', this.actualizarValoresAdicionales.bind(this));
    });
  }
 

  calcularCronograma() {
    const tipoMonedaInput = document.querySelector('input[name="currency"]:checked') as HTMLInputElement | null;
    const fechaDesembolsoInput = document.getElementById('fecha-desembolso') as HTMLInputElement | null;
    const valorVehiculoInput = document.getElementById('valor-vehiculo') as HTMLInputElement | null;
    const tasaEfectivaAnualInput = document.getElementById('tasa-efectiva-anual') as HTMLInputElement | null;
    const periodoPagoInput = document.getElementById('periodo-pago') as HTMLInputElement;
    const tasaDescuentoInput = document.getElementById('tasa-descuento') as HTMLInputElement | null;
    const seguroDesgravamenInput = document.getElementById('seguro-desgravamen') as HTMLInputElement;
    const cuotaInicialInput = document.getElementById('cuota-inicial') as HTMLInputElement | null;
    const montoPrestamoInput = document.getElementById('monto-prestamo') as HTMLInputElement;
    const cuotaFinalInput = document.getElementById('cuota-final') as HTMLInputElement;
    const cuotasAñoInput = document.getElementById('cuotas-año') as HTMLInputElement | null;

    const gastosNotarialesInput = document.getElementById('gastos-notariales') as HTMLInputElement;
    const gastosRegistralesInput = document.getElementById('gastos-registrales') as HTMLInputElement;
    const comisionEstudioInput = document.getElementById('comision-estudio') as HTMLInputElement;
    const portesInput = document.getElementById('portes') as HTMLInputElement;
    const gastosAdministracionInput = document.getElementById('gastos-administracion') as HTMLInputElement;
    const seguroVehicularAnualInput = document.getElementById('seguro-vehicular') as HTMLInputElement;

    const periodoTotalInput = document.getElementById('periodo-total') as HTMLInputElement;
    const periodoParcialInput = document.getElementById('periodo-parcial') as HTMLInputElement;



    // Verifica si todos los campos obligatorios están vacíos
    if (!tipoMonedaInput?.value && !fechaDesembolsoInput?.value && !valorVehiculoInput?.value && !tasaEfectivaAnualInput?.value) {
      alert('Faltan datos obligatorios');
    } else {
      // Comprueba cada campo individualmente y muestra alertas según corresponda
      if (!tipoMonedaInput || !tipoMonedaInput.value) {
        alert('Falta Tipo de Moneda');
        return; // Sale de la función si falta Tipo de Moneda
      }
      if (!fechaDesembolsoInput || !fechaDesembolsoInput.value) {
        alert('Falta Fecha de Desembolso');
        return;
      }
      if (!valorVehiculoInput || !valorVehiculoInput.value) {
        alert('Falta Valor de Vehículo');
        return;
      }
      if (!tasaEfectivaAnualInput || !tasaEfectivaAnualInput.value) {
        alert('Falta Tasa Efectiva Anual');
        return;
      }
      if (!tasaDescuentoInput || !tasaDescuentoInput.value) {
        alert('Falta Tasa de Descuento');
        return;
      }


      // Si llega hasta aquí, significa que todos los campos obligatorios tienen datos
      const tipoMoneda = tipoMonedaInput.value;
      const fechaDesembolso = fechaDesembolsoInput.value;
      let valorVehiculo = valorVehiculoInput.value;
      const tasaEfectivaAnual = tasaEfectivaAnualInput.value;
      const periodoPago = periodoPagoInput.value;
      const tasaDescuento = tasaDescuentoInput?.value;
      const seguroDesgravamen = seguroDesgravamenInput?.value;
      let cuotaInicial = cuotaInicialInput?.value;
      let montoPrestamo = montoPrestamoInput?.value;
      let cuotaFinal = cuotaFinalInput?.value;
      const cuotasAño =  cuotasAñoInput?.value;

      let gastosNotariales = gastosNotarialesInput.value;
      let gastosRegistrales = gastosRegistralesInput.value;
      let comisionEstudio = comisionEstudioInput?.value;
      let portes = portesInput.value;
      let gastosAdministracion= gastosAdministracionInput.value;
      const seguroVehicularAnual =  seguroVehicularAnualInput.value;
      const periodoTotal =  periodoTotalInput.value;
      const periodoParcial =  periodoParcialInput.value;


      
      if(tipoMoneda=='dolar'){
        valorVehiculo= (parseInt(valorVehiculo)).toString();
        if (cuotaInicial !== undefined) {
          cuotaInicial = (parseInt(cuotaInicial) ).toString();
        } 
        if (montoPrestamo !== undefined) {
          montoPrestamo = (parseInt(montoPrestamo) ).toString();
        } 
        if (cuotaFinal !== undefined) {
          cuotaFinal = (parseInt(cuotaFinal) ).toString();
        } 
      }else{
        valorVehiculo = valorVehiculoInput.value;
        cuotaInicial = cuotaInicialInput?.value;
        montoPrestamo = montoPrestamoInput?.value;
        cuotaFinal = cuotaFinalInput?.value;
      }

      this.router.navigate(['/view/cronograma',tipoMoneda,fechaDesembolso,valorVehiculo,tasaEfectivaAnual,
        periodoPago,tasaDescuento,seguroDesgravamen,cuotaInicial,montoPrestamo,cuotaFinal,
        cuotasAño,gastosNotariales,gastosRegistrales,comisionEstudio,portes,gastosAdministracion,seguroVehicularAnual,periodoTotal,periodoParcial]);




      

      }
  }

  actualizarDiaPago() {
    //console.log('Función actualizarDiaPago llamada');
    const fechaDesembolsoInput = document.getElementById('fecha-desembolso') as HTMLInputElement | null;
    const diaPagoInput = document.getElementById('dia-pago') as HTMLInputElement;

    if (fechaDesembolsoInput && fechaDesembolsoInput.value) {
      // Obten el valor del día de la fecha de desembolso
      const fechaDesembolso = new Date(fechaDesembolsoInput.value);
      const diaPago = fechaDesembolso.getDate() + 1; // Obtiene el día
      //console.log('Función actualizarDiaPago llamada: ',diaPago);

      // Actualiza el campo "Día de Pago de la Cuota" con el día calculado
      diaPagoInput.value = diaPago.toString();
      //console.log('Función actualizarDiaPago llamada: ',diaPagoInput.value);

    } else {
      // Si no hay fecha de desembolso, deja el campo en blanco
      diaPagoInput.value = '';
    }
  }


  actualizarValores() {
    //console.log('Función actualizarDiaPago llamada');
    const valorVehiculoInput = document.getElementById('valor-vehiculo') as HTMLInputElement | null;
    const cuotaInicialInput = document.getElementById('cuota-inicial') as HTMLInputElement;
    const montoPrestamoInput = document.getElementById('monto-prestamo') as HTMLInputElement;
    const cuotaFinalInput = document.getElementById('cuota-final') as HTMLInputElement;
    
    
    if (valorVehiculoInput && valorVehiculoInput.value) {
      const valorVehiculo = valorVehiculoInput.value;
      const cuotaInicial = ((parseInt(valorVehiculo) * 20) / 100); // 
      const montoPrestamo = ((parseInt(valorVehiculo) * 80) / 100); // 
      const cuotaFinal = ((parseInt(valorVehiculo) * 40) / 100); // 

      //console.log('Función cuota inicial llamada: ',cuotaInicial.toString());
      //console.log('Función monto del prestamo llamada: ',montoPrestamo.toString());
      //console.log('Función cuota final llamada: ',cuotaFinal.toString());

      cuotaInicialInput.value = cuotaInicial.toString();
      montoPrestamoInput.value = montoPrestamo.toString();
      cuotaFinalInput.value = cuotaFinal.toString();

      //console.log('Función cuota inicial llamada: ',cuotaInicialInput.value);
      //console.log('Función monto del prestamo llamada: ',montoPrestamoInput.value);
      //console.log('Función cuota final llamada: ',cuotaFinalInput.value);

    } else {

      cuotaInicialInput.value = '';
      montoPrestamoInput.value = '';
      cuotaFinalInput.value = '';

      
    }
  }

  actualizarValoresAdicionales(){
    const tipoMonedaInput = document.querySelector('input[name="currency"]:checked') as HTMLInputElement | null;
    const gastosNotarialesInput = document.getElementById('gastos-notariales') as HTMLInputElement;
    const gastosRegistralesInput = document.getElementById('gastos-registrales') as HTMLInputElement;
    const comisionEstudioInput = document.getElementById('comision-estudio') as HTMLInputElement;
    const portesInput = document.getElementById('portes') as HTMLInputElement;
    const gastosAdministracionInput = document.getElementById('gastos-administracion') as HTMLInputElement;
    //console.log('Función actualizarValoresAdicionales llamada',tipoMonedaInput?.value);
    if (!tipoMonedaInput || !tipoMonedaInput.value) {
      gastosNotarialesInput.value= '';
      gastosRegistralesInput.value= '';
      comisionEstudioInput.value= '';
      portesInput.value= '';
      gastosAdministracionInput.value= '';
    }else if(tipoMonedaInput.value==='sol'){
      gastosNotarialesInput.value= '380';
      gastosRegistralesInput.value= '190';
      comisionEstudioInput.value= '115';
      portesInput.value= '75';
      gastosAdministracionInput.value= '150';
    }else if(tipoMonedaInput.value==='dolar'){
      gastosNotarialesInput.value= '100';
      gastosRegistralesInput.value= '50';
      comisionEstudioInput.value= '30';
      portesInput.value= '20';
      gastosAdministracionInput.value= '40';
    }
    //console.log('Función actualizarValoresAdicionales llamada',gastosNotarialesInput.value);

  }


}




