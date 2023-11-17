import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-cuoton',
  templateUrl: './view-cuoton.component.html',
  styleUrls: ['./view-cuoton.component.css']
})
export class ViewCuotonComponent {
  fechaDesembolso: string;
  tasaEfectivaAnual: string; // Cambié el tipo a number, asegúrate de usar el tipo correcto
  periodoPago: string;
  seguroDesgravamen: string; // Cambié el tipo a boolean, asegúrate de usar el tipo correcto
  montoPrestamo: string; // Cambié el tipo a number, asegúrate de usar el tipo correcto
  cuotaFinal: string; // Cambié el tipo a number, asegúrate de usar el tipo correcto

  historyData: any;
  data: any[] = [];
  displayedColumns: string[] = ['position', 'fechaPago', 'saldoInicialCuotaFinal', 
  'interesCuotaFinal', 'amortCuotaFinal', 'seguroDesgCuotaFinal',  'saldoFinalCuotaFinal'];

  dataSource = new MatTableDataSource<any>(this.data);
  clickedRows = new Set<any>()

  constructor(private route: ActivatedRoute) {
    this.historyData = {};
    this.fechaDesembolso = this.route.snapshot.paramMap.get('fechaDesembolso')!;
    this.tasaEfectivaAnual = this.route.snapshot.paramMap.get('tasaEfectivaAnual')!;
    this.periodoPago = this.route.snapshot.paramMap.get('periodoPago')!;
    this.seguroDesgravamen = this.route.snapshot.paramMap.get('seguroDesgravamen')!;
    this.montoPrestamo = this.route.snapshot.paramMap.get('montoPrestamo')!;
    this.cuotaFinal = this.route.snapshot.paramMap.get('cuotaFinal')!;
  }




  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator

  ngOnInit(): void {
    //this.getHistory();
    this.getDatos();
    this.getCalculos();
    this.dataSource.paginator = this.paginator;
  }

  getDatos(): void {
    console.log('Fecha de Desembolso:', this.fechaDesembolso);
    console.log('Tasa Efectiva Anual (%):', this.tasaEfectivaAnual);
    console.log('Periodo de Pago:', this.periodoPago);
    console.log('Seguro de Desgravamen:', this.seguroDesgravamen);
    console.log('Monto del Préstamo:', this.montoPrestamo);
    console.log('Cuota Final:', this.cuotaFinal);
  }

  getCalculos(): void {
    
    //=+(1+9%)^(1/12)-1
    const tasaInteresMensual: number = (Math.pow(1 + ((parseFloat(this.tasaEfectivaAnual) / 100)), 1 / 12)) - 1;
    console.log('Tasa Interes Mensual112:', tasaInteresMensual);

    const tasaSeguroDesgraMensual: number = (parseFloat(this.seguroDesgravamen) / 100);
    console.log('Tasa Desgravamen Mensual112:', tasaSeguroDesgraMensual);



    const sumaTasasMensuales: number = tasaInteresMensual + tasaSeguroDesgraMensual;

    let cuotaTotal: number = ((parseFloat(this.montoPrestamo) * (sumaTasasMensuales)) / (1 - (Math.pow(1 + sumaTasasMensuales, -(parseInt(this.periodoPago))))));
   

    const saldoInicialCuotaFinal: number[] = new Array(parseInt(this.periodoPago) + 2);
    saldoInicialCuotaFinal[0]=0;
    saldoInicialCuotaFinal[1] = (parseInt(this.cuotaFinal))/(Math.pow(1+sumaTasasMensuales,
      parseInt(this.periodoPago)+1));
    console.log('Saldo Inicial Cuota Final:', saldoInicialCuotaFinal[0]);
    
    const interesCuotaFinal: number[] = new Array(parseInt(this.periodoPago) + 2);
    interesCuotaFinal[0]=0;
    interesCuotaFinal[1] = (saldoInicialCuotaFinal[1]*tasaInteresMensual)*-1;
    console.log('Interes Cuota Final:', interesCuotaFinal[1]);
    

    const amortizacionCuotaFinal: number[] = new Array(parseInt(this.periodoPago) + 2);
    

    for (let i = 0; i < amortizacionCuotaFinal.length-1; i++) {
        amortizacionCuotaFinal[i]=0;  
    }

    //console.log(amortizacionCuotaFinal);

    const seguroDesgCuotaFinal: number[] = new Array(parseInt(this.periodoPago) + 2);
    seguroDesgCuotaFinal[0]=0;
    seguroDesgCuotaFinal[1] = (saldoInicialCuotaFinal[1]*tasaSeguroDesgraMensual)*-1;
    console.log('Seguro Desg. Cuota Final:', seguroDesgCuotaFinal[1]);
    

    const saldoFinalCuotaFinal: number[] = new Array(parseInt(this.periodoPago) + 2);
    saldoFinalCuotaFinal[0]=0;
    saldoFinalCuotaFinal[1] = saldoInicialCuotaFinal[1]-interesCuotaFinal[1]-amortizacionCuotaFinal[1]-seguroDesgCuotaFinal[1];
    console.log('Saldo Final Cuota Final:', saldoFinalCuotaFinal[1]);
    
    for (let i = 2; i < seguroDesgCuotaFinal.length; i++) {
      if(parseInt(this.periodoPago)==36){
        if(i==37){
          saldoInicialCuotaFinal[i] = saldoFinalCuotaFinal[i-1];
          interesCuotaFinal[i] = saldoInicialCuotaFinal[i]*tasaInteresMensual*-1;
          seguroDesgCuotaFinal[i]=saldoInicialCuotaFinal[i]*tasaSeguroDesgraMensual*-1;
          amortizacionCuotaFinal[i]=-seguroDesgCuotaFinal[i]-interesCuotaFinal[i]
          +saldoInicialCuotaFinal[i];
          saldoFinalCuotaFinal[i]=0;
         
        }else{
          saldoInicialCuotaFinal[i] = saldoFinalCuotaFinal[i-1];
          interesCuotaFinal[i] = saldoInicialCuotaFinal[i]*tasaInteresMensual*-1;
          seguroDesgCuotaFinal[i]=saldoInicialCuotaFinal[i]*tasaSeguroDesgraMensual*-1;
          saldoFinalCuotaFinal[i]=saldoInicialCuotaFinal[i]-interesCuotaFinal[i]
          -amortizacionCuotaFinal[i]-seguroDesgCuotaFinal[i];
         
        }
      }else if(parseInt(this.periodoPago)==24){
        if(i==25){
          saldoInicialCuotaFinal[i] = saldoFinalCuotaFinal[i-1];
          interesCuotaFinal[i] = saldoInicialCuotaFinal[i]*tasaInteresMensual*-1;
          seguroDesgCuotaFinal[i]=saldoInicialCuotaFinal[i]*tasaSeguroDesgraMensual*-1;
          amortizacionCuotaFinal[i]=-seguroDesgCuotaFinal[i]-interesCuotaFinal[i]
          +saldoInicialCuotaFinal[i];
          saldoFinalCuotaFinal[i]=0;
         
        }else{
          saldoInicialCuotaFinal[i] = saldoFinalCuotaFinal[i-1];
          interesCuotaFinal[i] = saldoInicialCuotaFinal[i]*tasaInteresMensual*-1;
          seguroDesgCuotaFinal[i]=saldoInicialCuotaFinal[i]*tasaSeguroDesgraMensual*-1;
          saldoFinalCuotaFinal[i]=saldoInicialCuotaFinal[i]-interesCuotaFinal[i]
          -amortizacionCuotaFinal[i]-seguroDesgCuotaFinal[i];
         
        }
      }
     
      
    }
    console.log(saldoInicialCuotaFinal);

    /*
    
    */
    

    for (let i = 0; i < seguroDesgCuotaFinal.length; i++) {

      saldoInicialCuotaFinal[i] = parseFloat(saldoInicialCuotaFinal[i].toFixed(2));
      interesCuotaFinal[i] = parseFloat(interesCuotaFinal[i].toFixed(2));
      seguroDesgCuotaFinal[i]=parseFloat(seguroDesgCuotaFinal[i].toFixed(2));
      amortizacionCuotaFinal[i]=parseFloat(amortizacionCuotaFinal[i].toFixed(2));
      saldoFinalCuotaFinal[i]=parseFloat(saldoFinalCuotaFinal[i].toFixed(2));

    }




   const amortizacionMensualData = amortizacionCuotaFinal.map((amortizacion, index) => ({
    amortCuotaFinal: amortizacion,
      fechaPago: '',
      position: index,
     
    }));
    const seguroDesgravamenData = seguroDesgCuotaFinal.map((seguro, index) => ({
      seguroDesgCuotaFinal: seguro,
      fechaPago: '',
      position: index,
      
    }));

    const saldoInicialCuotaFinalData = saldoInicialCuotaFinal.map((saldo, index) => ({
      saldoInicialCuotaFinal: saldo,
      fechaPago: '',
      position: index,
     
    }));


  
    const interesCuotaFinalData = interesCuotaFinal.map((interes, index) => ({
      interesCuotaFinal: interes,
      fechaPago: '',
      position: index,
     
    }));

    const saldoFinalCuotaFinalData = saldoFinalCuotaFinal.map((saldo, index) => ({
      saldoFinalCuotaFinal: saldo,
      fechaPago: '',
      position: index,
      
    }));

    // Generar fechas y combinar con saldoMensual
    const fechasPago: string[] = new Array(parseInt(this.periodoPago) + 2);

    for (let i = 0; i < fechasPago.length; i++) {
      const fecha = new Date(this.fechaDesembolso);
      fecha.setMonth(fecha.getMonth() + i);
      fechasPago[i] = fecha.toISOString().substring(0, 10);
    }

    const fechasPagoData = fechasPago.map((fecha, index) => ({
      fechaPago: fecha,
      position: index,
      
    }));

    // Combina todas las nuevas variables con fechasPagoData
    const combinedData = seguroDesgravamenData.map((seguroDesMensualItem, index) => ({
      ...seguroDesMensualItem,
      ...interesCuotaFinalData[index],
      ...saldoFinalCuotaFinalData[index],
      ...amortizacionMensualData[index],
      ...saldoInicialCuotaFinalData[index],
      ...fechasPagoData[index],
    }));

    // Asignar combinedData a dataSource
    this.dataSource.data = combinedData;







    console.log('Cuota Total:', cuotaTotal);
    console.log(fechasPago.length);
    console.log(fechasPago);
    console.log(this.data)
   console.log('Periodo de Pago:', this.periodoPago);

  }

 
}
