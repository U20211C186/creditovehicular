import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Finance } from 'financejs'
import { VehicleCreditService } from 'src/app/services/vehicle.credit.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
@Component({
  selector: 'app-view-cronograma',
  templateUrl: './view-cronograma.component.html',
  styleUrls: ['./view-cronograma.component.css']
})

export class ViewCronogramaComponent {
  static diaPagoGlobal: string;
  static monedaGlobal: string;
  static vanGlobal: string;
  static tirGlobal: string;
  static cuotonGlobal: string;
  static cuotaMensualGlobal: string;
  static flujoMensualGlobal: string;
  static tceaGlobal: string;
  static seguroVehicularGlobal: string;

  static saldo1Global: string;
  static saldo12Global: string;
  static montoPagadoGlobal: string;


  tipoMoneda: string;
  fechaDesembolso: string;
  valorVehiculo: string; // Cambié el tipo a number, asegúrate de usar el tipo correcto
  tasaEfectivaAnual: string; // Cambié el tipo a number, asegúrate de usar el tipo correcto
  periodoPago: string;
  tasaDescuento: string;
  seguroDesgravamen: string; // Cambié el tipo a boolean, asegúrate de usar el tipo correcto
  cuotaInicial: string; // Cambié el tipo a number, asegúrate de usar el tipo correcto
  montoPrestamo: string; // Cambié el tipo a number, asegúrate de usar el tipo correcto
  cuotaFinal: string; // Cambié el tipo a number, asegúrate de usar el tipo correcto
  cuotasAño: string; // Cambié el tipo a number, asegúrate de usar el tipo correcto
  gastosNotariales: string; // Cambié el tipo a boolean, asegúrate de usar el tipo correcto
  gastosRegistrales: string; // Cambié el tipo a boolean, asegúrate de usar el tipo correcto
  comisionEstudio: string; 
  portes: string; 
  gastosAdministracion:string;
  seguroVehicularAnual: string; // Cambié el tipo a boolean, asegúrate de usar el tipo correcto
  periodoTotal: string; // Cambié el tipo a boolean, asegúrate de usar el tipo correcto
  periodoParcial: string; // Cambié el tipo a boolean, asegúrate de usar el tipo correcto


  formGroup: any;
  viewCuoton() {
    this.router.navigate(['/view/cuoton', this.periodoPago, this.tasaEfectivaAnual, this.seguroDesgravamen, this.cuotaFinal, this.montoPrestamo, this.fechaDesembolso]);
  }










  historyData: any;
  data: any[] = [];
  displayedColumns: string[] = ['position', 'date', 'saldo', 'interes', 'segurodes', 'amortizacion', 'cuota','segurovehi','portes','gastosadmin','flujototal'];

  dataSource = new MatTableDataSource<any>(this.data);
  clickedRows = new Set<any>()

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private vehicleCreditService: VehicleCreditService,
    private authService: AuthService) {

    this.historyData = {};
    this.tipoMoneda = this.route.snapshot.paramMap.get('tipoMoneda')!;
    this.fechaDesembolso = this.route.snapshot.paramMap.get('fechaDesembolso')!;
    this.valorVehiculo = this.route.snapshot.paramMap.get('valorVehiculo')!;
    this.tasaEfectivaAnual = this.route.snapshot.paramMap.get('tasaEfectivaAnual')!;
    this.periodoPago = this.route.snapshot.paramMap.get('periodoPago')!;
    this.tasaDescuento = this.route.snapshot.paramMap.get('tasaDescuento')!;
    this.seguroDesgravamen = this.route.snapshot.paramMap.get('seguroDesgravamen')!;
    this.cuotaInicial = this.route.snapshot.paramMap.get('cuotaInicial')!;
    this.montoPrestamo = this.route.snapshot.paramMap.get('montoPrestamo')!;
    this.cuotaFinal = this.route.snapshot.paramMap.get('cuotaFinal')!;
    this.cuotasAño = this.route.snapshot.paramMap.get('cuotasAño')!;

    this.gastosNotariales = this.route.snapshot.paramMap.get('gastosNotariales')!;
    this.gastosRegistrales = this.route.snapshot.paramMap.get('gastosRegistrales')!;
    this.comisionEstudio = this.route.snapshot.paramMap.get('comisionEstudio')!;
    this.portes = this.route.snapshot.paramMap.get('portes')!;
    this.gastosAdministracion = this.route.snapshot.paramMap.get('gastosAdministracion')!;
    this.seguroVehicularAnual = this.route.snapshot.paramMap.get('seguroVehicularAnual')!;
    this.periodoTotal = this.route.snapshot.paramMap.get('periodoTotal')!;
    this.periodoParcial = this.route.snapshot.paramMap.get('periodoParcial')!;


  }



  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator

  ngOnInit(): void {
    //this.getHistory();
    this.getDatos();
    if(this.periodoTotal==='0'&&this.periodoParcial==='0'){
      this.getCalculos();
    }else if(this.periodoTotal==='0'&&this.periodoParcial!='0'){
      console.log('Periodo Parcial:',this.periodoParcial);

      this.getCalculosPeriodoGraciaParcial();
    }else if(this.periodoTotal!='0'&&this.periodoParcial==='0'){
      console.log('Periodo Total:',this.periodoTotal);

      this.getCalculosPeriodoGraciaTotal();
    }else if(this.periodoTotal!='0'&&this.periodoParcial!='0'){
      console.log('Periodo Total:',this.periodoTotal);
      console.log('Periodo Parcial:',this.periodoParcial);

      this.getCalculosPeriodoGraciaTotalYParial();
    }
    this.dataSource.paginator = this.paginator;
  }


  getDatos(): void {
    console.log('Tipo de Moneda:', this.tipoMoneda);
    console.log('Fecha de Desembolso:', this.fechaDesembolso);
    console.log('Valor de Vehículo:', this.valorVehiculo);
    console.log('Tasa Efectiva Anual (%):', this.tasaEfectivaAnual);
    console.log('Periodo de Pago:', this.periodoPago);
    console.log('Tasa de Descuento (COK):', this.tasaDescuento);
    console.log('Seguro de Desgravamen:', this.seguroDesgravamen);
    console.log('Cuota Inicial:', this.cuotaInicial);
    console.log('Monto del Préstamo:', this.montoPrestamo);
    console.log('Cuota Final:', this.cuotaFinal);
    console.log('Cuotas al Año:', this.cuotasAño);
  }
  devolverElAuto():void{
    this.router.navigate(['/view/devolucion',this.tipoMoneda,this.fechaDesembolso,this.valorVehiculo,this.tasaEfectivaAnual,this.periodoPago,this.tasaDescuento,this.seguroDesgravamen,this.cuotaInicial,this.montoPrestamo,this.cuotaFinal,this.cuotasAño,this.gastosNotariales,this.gastosRegistrales,this.comisionEstudio,this.portes,this.gastosAdministracion,this.seguroVehicularAnual,this.periodoTotal,this.periodoParcial,ViewCronogramaComponent.montoPagadoGlobal]);

  }
  
renovarElAuto():void{
  this.router.navigate(['/view/refinanciamiento',this.tipoMoneda,this.fechaDesembolso,this.valorVehiculo,this.tasaEfectivaAnual,this.periodoPago,this.tasaDescuento,this.seguroDesgravamen,this.cuotaInicial,this.montoPrestamo,this.cuotaFinal,this.cuotasAño,this.gastosNotariales,this.gastosRegistrales,this.comisionEstudio,this.portes,this.gastosAdministracion,this.seguroVehicularAnual,this.periodoTotal,this.periodoParcial]);

}


quedarseConElAuto():void{
  const requestPayload: any = {
    userId:this.authService.getUser()?.id,
    fechaDesembolso: this.fechaDesembolso,
    moneda: this.tipoMoneda,
    diaPago: ViewCronogramaComponent.diaPagoGlobal,
    valorVehiculo: this.valorVehiculo,
    tasaEfectivaAnual: this.tasaEfectivaAnual,
    periodoPago: this.periodoPago,
    tasaDesgravamen: this.seguroDesgravamen,
    cuotaInicial: this.cuotaInicial,
    montoPrestamo: this.montoPrestamo,
    cuotaFinal: this.cuotaFinal,
    cuotasAnio: this.cuotasAño,
    cuotaMensual: ViewCronogramaComponent.cuotaMensualGlobal,
    cok:  this.tasaDescuento,
    van: ViewCronogramaComponent.vanGlobal,
    tir: ViewCronogramaComponent.tirGlobal,
    gastoNotarial:this.gastosNotariales,
    gastoRegistral:this.gastosRegistrales,
    comisionEstudio:this.comisionEstudio,
    porte:this.portes,
    gastoAdministracion:this.gastosAdministracion,
    periodoTotal:this.periodoTotal,
    periodoParcial:this.periodoParcial,
    flujoMensual:ViewCronogramaComponent.flujoMensualGlobal,
    tasaSeguroVehicular:this.seguroVehicularAnual,
    seguroVehicular:ViewCronogramaComponent.seguroVehicularGlobal,
    tcea:ViewCronogramaComponent.tceaGlobal 
  };

  this.vehicleCreditService.createVehicleCredit(requestPayload).subscribe(
    (response) => {
      console.log('Producto guardado en la base de datos:', response);
    }
  );
}


//CON PERIODOS DE GRACIA TOTAL
getCalculosPeriodoGraciaTotalYParial(): void {

  ViewCronogramaComponent.cuotonGlobal = this.cuotaFinal;

  this.montoPrestamo=(parseFloat(this.montoPrestamo)+parseFloat(this.gastosNotariales)
  +parseFloat(this.gastosRegistrales)+parseFloat(this.comisionEstudio)).toString();

  //=+(1+9%)^(1/12)-1

  const tasaInteresMensual: number = (Math.pow(1 + ((parseFloat(this.tasaEfectivaAnual) / 100)), 1 / 12)) - 1;
  console.log('Tasa Interes Mensual112:', tasaInteresMensual);
  const tasaSeguroDesgraMensual: number = (parseFloat(this.seguroDesgravamen) / 100);


  const tasaSeguroVehiMensual: number = (parseFloat(this.seguroVehicularAnual) / 100) / 12;
  console.log('Tasa Vehicular Mensual112:', tasaSeguroVehiMensual);

  const sumaTasasMensuales: number = tasaInteresMensual + tasaSeguroDesgraMensual;

  //=+(1440180*(C181+C182))/(1-(1+(C181+C182))^-8)
  //cuotaTotal = parseFloat(cuotaTotal.toFixed(2));
  /*
      const cuotaTotal: number = ((parseInt(this.montoPrestamo) *( iTasa+(parseFloat(this.seguroDesgravamen) / 100)))
       / (1 - (Math.pow(1 + iTasa+(parseFloat(this.seguroDesgravamen) / 100), 
       -(parseInt(this.periodoPago))))))+Svm;
      */

  const cero: string = '0';

  //ESTADO DE CUENTA MENSUAL FISICO
  const estadoCuentaMensual: string[] = new Array(parseInt(this.periodoPago) + 2);
  estadoCuentaMensual[0] = parseFloat(cero).toFixed(2);
  const diez: string = '10';

  //SEGURO VEHICULAR MENSUAL
  const seguroVehiMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  seguroVehiMensual[0] = 0;
  const auxSeguroVehi = parseInt(this.valorVehiculo) * tasaSeguroVehiMensual;
  console.log('Auxiliar Seguro Vehicular12122:', auxSeguroVehi);
  //CUOTA MENSUAL
  const cuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  cuotaMensual[0] = 0;

  const portesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  portesMensual[0]=0;

  const gastosAdministracionMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  gastosAdministracionMensual[0]=0;

  for (let i = 1; i < portesMensual.length; i++) {
    gastosAdministracionMensual[i] = parseInt(this.gastosAdministracion);


    portesMensual[i] = parseInt(this.portes);
  }

  if(this.periodoPago==='36'){
    gastosAdministracionMensual[37]=0;
    seguroVehiMensual[37]=0;
    portesMensual[37]=0;
  }else if (this.periodoPago==='24'){
    gastosAdministracionMensual[25]=0;
    seguroVehiMensual[25]=0;

    portesMensual[25]=0;
  }





 

  let ceroAux: string = '0.00';
  const ceroAux2 = parseFloat(ceroAux);

  //INTERES MENSUAL    
  const interesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  interesMensual[0] = 0;
  //interesMensual[1] = Im1.toFixed(2);
  interesMensual[1] = (parseFloat(this.montoPrestamo) * tasaInteresMensual);


  //SEGURO DESGRAVAMEN MENSUAL
  const seguroDesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  seguroDesMensual[0] = 0;
  //seguroDesMensual[1] = Sd.toFixed(2);
  seguroDesMensual[1] = (parseFloat(this.montoPrestamo) * tasaSeguroDesgraMensual);

  //AMORTIZACION MENSUAL
  const amortizacionMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  amortizacionMensual[0] = 0;
  //amortizacionMensual[1] = amortizacion.toFixed(2);
  for(let i=0;i<(parseInt(this.periodoParcial)+parseInt(this.periodoTotal));i++){
    amortizacionMensual[i+1] = 0;
  }

  console.log('Amortizacion MensualASDDDDDDDDDDDDDDDDDDDD:', amortizacionMensual);
  console.log('Amortizacion MensualASDDDDDDDDDDDDDDDDDDDD:', amortizacionMensual[4]);


  //SALDO MENSUAL
  const saldoMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  saldoMensual[0] = parseFloat(this.montoPrestamo);
  saldoMensual[1] = parseFloat(this.montoPrestamo)-amortizacionMensual[1]+interesMensual[1];
 
//4
  //1 2 3 4

  //PARA PERIODO DE GRACIA TOTAL
 

  for(let i=1;i<(parseInt(this.periodoTotal)+parseInt(this.periodoParcial));i++){
    interesMensual[i+1] = (saldoMensual[i] *tasaInteresMensual);

    if(i<parseInt(this.periodoTotal)){

      saldoMensual[i+1] = (saldoMensual[i] - (amortizacionMensual[0])+(interesMensual[i+1]));

    }else{

      saldoMensual[i+1] = (saldoMensual[i] - (amortizacionMensual[0]));
    }

    //saldoMensual[i+1] = (saldoMensual[i] - (amortizacionMensual[i+1])+(interesMensual[i+1]));
  }
  console.log('Interes MensualASDASD',interesMensual);
  console.log('Saldo MensualASDASD',saldoMensual);


  let cuotaTotal: number = ((saldoMensual[parseInt(this.periodoParcial)+parseInt(this.periodoTotal)] * (sumaTasasMensuales)) / (1 - (Math.pow(1 + sumaTasasMensuales, -(parseInt(this.periodoPago)-parseInt(this.periodoParcial)-parseInt(this.periodoTotal))))));

  console.log('Cuota Total:', cuotaTotal);





  //4
  if(parseInt(this.periodoParcial)===1){
    seguroDesMensual[1] = (parseFloat(this.montoPrestamo) * tasaSeguroDesgraMensual);

  }else{
    //4
    for(let i=1;i<(parseInt(this.periodoParcial)+parseInt(this.periodoTotal));i++){
      seguroDesMensual[i+1]=((saldoMensual[i]) * tasaSeguroDesgraMensual);
    }
  }
  console.log('Seguro Desgravamen MensualASDASD',seguroDesMensual);
  
  let auxSumaPeriodos=parseInt(this.periodoParcial)+parseInt(this.periodoTotal);

  for(let i=auxSumaPeriodos;i<parseInt(this.periodoPago)+1;i++){

    interesMensual[i+1] = ((saldoMensual[i]) * tasaInteresMensual);
    seguroDesMensual[i+1] = ((saldoMensual[i]) * tasaSeguroDesgraMensual);

    amortizacionMensual[i+1] = (cuotaTotal - (interesMensual[i+1]) - (seguroDesMensual[i+1]));

    saldoMensual[i+1] = ((saldoMensual[i]) - amortizacionMensual[i+1]);

  }
  if(parseInt(this.periodoPago)===36){
    interesMensual[37]=0;
  }else if(parseInt(this.periodoPago)===24){
    interesMensual[25]=0;
  }
  console.log('Interes MensualASDASD',interesMensual);

  if(parseInt(this.periodoPago)===36){
    seguroDesMensual[37]=0;
  }else if(parseInt(this.periodoPago)===24){
    seguroDesMensual[25]=0;
  }
  console.log('Seguro Seguro Desgravamen MensualASDASD',seguroDesMensual);


  if(parseInt(this.periodoPago)===36){
    saldoMensual[37]=0;
  }else if(parseInt(this.periodoPago)===24){
    saldoMensual[25]=0;
  }
  
  console.log('Saldo MensualASDASD',saldoMensual);


  if(parseInt(this.periodoPago)===36){
    amortizacionMensual[37]=0;
  }else if(parseInt(this.periodoPago)===24){
    amortizacionMensual[25]=0;
  }
  
  console.log('Amortizacion MensualASDASD',amortizacionMensual);

  for (let i = 1; i < cuotaMensual.length; i++) {
    if (parseInt(this.periodoPago) == 36) {
      if (i == 37) {
        cuotaMensual[i] = parseFloat(this.cuotaFinal);
      } else {
        cuotaMensual[i] = cuotaTotal;
      }
    } else if (parseInt(this.periodoPago) == 24) {
      if (i == 25) {
        cuotaMensual[i] = parseFloat(this.cuotaFinal);
      } else {
        cuotaMensual[i] = cuotaTotal;
      }
    }
    seguroVehiMensual[i] = auxSeguroVehi;
    estadoCuentaMensual[i] = parseFloat(diez).toFixed(2);
  }

  if(this.periodoPago==='36'){
    seguroVehiMensual[37]=0;
  }else if (this.periodoPago==='24'){
    seguroVehiMensual[25]=0;

  }

  //Calcular Cuota Mensual 
  for(let i=1;i<parseInt(this.periodoPago)+1;i++){
    interesMensual[i+1] = (saldoMensual[i] *tasaInteresMensual);

    if(i<=parseInt(this.periodoTotal)){

      cuotaMensual[i] = (seguroDesMensual[i]);

      

    }else if (i>parseInt(this.periodoTotal)&&i<(parseInt(this.periodoParcial)+parseInt(this.periodoTotal)+1)){
      cuotaMensual[i] = (seguroDesMensual[i])+(interesMensual[i]);

    }else{
      cuotaMensual[i] = cuotaTotal;
    }


    //saldoMensual[i+1] = (saldoMensual[i] - (amortizacionMensual[i+1])+(interesMensual[i+1]));
  }
  if(parseInt(this.periodoPago)===36){
    cuotaMensual[37]=0;
  }else if(parseInt(this.periodoPago)===24){
    cuotaMensual[25]=0;
  }
  console.log('Cuota MensualASDASDSDADASD',cuotaMensual);





  const flujoTotalMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  flujoTotalMensual[0]=parseInt(this.montoPrestamo);

  const auxcuotaMensual = cuotaMensual.slice(1, -1);
  console.log('Aux Cuota Mensual:',auxcuotaMensual);

  for (let i = 0; i < auxcuotaMensual.length; i++) {
    flujoTotalMensual[i+1] = (auxcuotaMensual[i]+auxSeguroVehi+parseInt(this.portes)+parseInt(this.gastosAdministracion));
  }

  if(this.periodoPago==='36'){
    flujoTotalMensual[37]=0;

  }else if (this.periodoPago==='24'){
    flujoTotalMensual[25]=0;

  }

  console.log('Flujo Total MensualALDOPASTRANA:',flujoTotalMensual);
  
  console.log('Portes MensualALDOPASTRANA:',portesMensual);
  console.log('Seguro VehicularALDOPASTRANA:',seguroVehiMensual);
  console.log('Gatos AdministracionDOPASTRANA:',gastosAdministracionMensual);



  //console.log((parseFloat(saldoMensual[1]) * iTasa).toFixed(2));


  let sumaVAN: number = 0;
  let finance = new Finance();

  //CACULO DE LA VAN
  if (parseInt(this.periodoPago) == 36) {
    const auxcuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 1);
    //auxcuotaMensual[0]=(parseInt(this.montoPrestamo));

    for (let i = 1; i < cuotaMensual.length - 2; i++) {
      auxcuotaMensual[i - 1] = (cuotaMensual[i] * 1);
    }
    auxcuotaMensual[35] = auxcuotaMensual[1];

    auxcuotaMensual[36] = (parseInt(this.cuotaFinal) * 1);
    console.log(auxcuotaMensual);


    const auxTasaDescuento = (Math.pow(1 + (parseFloat(this.tasaDescuento) / 100), (1 / 12))) - 1;
    console.log(auxTasaDescuento);


    for (let i = 0; i < auxcuotaMensual.length; i++) {
      auxcuotaMensual[i] = parseFloat(auxcuotaMensual[i].toFixed(2));
    }

    flujoTotalMensual[37]=parseInt(this.cuotaFinal);

    console.log('Flujo Mensual asdasdasaSDASD ALDO PASTRANA',flujoTotalMensual);

    const auxflujoMensual = flujoTotalMensual.slice(1);

    /*
    const auxflujoMensual: number[] = new Array(parseInt(this.periodoPago));
    for (let i = 0; i < auxflujoMensual.length; i++) {
      auxflujoMensual[i] = flujoTotalMensual[i];
    }*/

    

    console.log('Flujo Mensual asdasdasaSDASD',auxflujoMensual);

/*
    const auxflujoMensual2: number[] = new Array(parseInt(this.periodoPago));
    for (let i = 0; i < auxflujoMensual2.length; i++) {
      auxflujoMensual2[i] = (flujoTotalMensual[1]*-1);
    }*/

    //const auxVAN: number = finance.NPV(auxTasaDescuento,parseInt(this.montoPrestamo)*1,...auxflujoMensual2);

    for (let i = 0; i < auxflujoMensual.length; i++) {
      sumaVAN += (auxflujoMensual[i] / (Math.pow(1 + auxTasaDescuento, i +1)));
    }
    //sumaVAN += (parseInt(this.cuotaFinal)/(Math.pow(1+auxTasaDescuento,37)));

    sumaVAN *= -1;

    sumaVAN = sumaVAN + (parseInt(this.montoPrestamo));
    console.log(`sumaVAN: `, sumaVAN);

    //sumaVAN=auxVAN;
    ViewCronogramaComponent.vanGlobal = sumaVAN.toFixed(2);

    

    const auxTIR: number = finance.IRR((parseInt(this.montoPrestamo) * -1), ...auxflujoMensual);
    console.log(`sumaTIR: `, auxTIR);
    ViewCronogramaComponent.tirGlobal = auxTIR.toFixed(2);

    for (let i = 1; i < flujoTotalMensual.length; i++) {
      flujoTotalMensual[i] = parseFloat((flujoTotalMensual[i]*-1).toFixed(2));
    }

  } else {
    const auxcuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 1);
    //auxcuotaMensual[0]=(parseInt(this.montoPrestamo));

    for (let i = 1; i < cuotaMensual.length - 2; i++) {
      auxcuotaMensual[i - 1] = (cuotaMensual[i] * 1);
    }
    auxcuotaMensual[23] = auxcuotaMensual[1];

    auxcuotaMensual[24] = (parseInt(this.cuotaFinal) * 1);
    console.log(auxcuotaMensual);
    const auxTasaDescuento = (Math.pow(1 + (parseFloat(this.tasaDescuento) / 100), (1 / 12))) - 1;
    console.log(auxTasaDescuento);


    for (let i = 0; i < auxcuotaMensual.length; i++) {
      auxcuotaMensual[i] = parseFloat(auxcuotaMensual[i].toFixed(2));
    }
    console.log(auxcuotaMensual);

    console.log('Flujo Mensual asdasdasaSDASD ALDO PASTRANA',flujoTotalMensual);

    flujoTotalMensual[25]=parseInt(this.cuotaFinal);
    const auxflujoMensual = flujoTotalMensual.slice(1);

    console.log('Flujo Mensual asdasdasaSDASD',auxflujoMensual);
/*
    const auxflujoMensual2: number[] = new Array(parseInt(this.periodoPago));
    for (let i = 0; i < auxflujoMensual2.length; i++) {
      auxflujoMensual2[i] = (flujoTotalMensual[1]*-1);
    }*/

    //const auxVAN: number = finance.NPV(auxTasaDescuento,parseInt(this.montoPrestamo)*1,...auxflujoMensual2);

    for (let i = 0; i < auxflujoMensual.length; i++) {
      sumaVAN += (auxflujoMensual[i] / (Math.pow(1 + auxTasaDescuento, i +1)));
    }
    //sumaVAN += (parseInt(this.cuotaFinal)/(Math.pow(1+auxTasaDescuento,37)));

    sumaVAN *= -1;

    sumaVAN = sumaVAN + (parseInt(this.montoPrestamo));
    console.log(`sumaVAN: `, sumaVAN);

    //sumaVAN=auxVAN;
    ViewCronogramaComponent.vanGlobal = sumaVAN.toFixed(2);

    

    const auxTIR: number = finance.IRR((parseInt(this.montoPrestamo) * -1), ...auxflujoMensual);
    console.log(`sumaTIR: `, auxTIR);
    ViewCronogramaComponent.tirGlobal = auxTIR.toFixed(2);

    for (let i = 1; i < flujoTotalMensual.length; i++) {
      flujoTotalMensual[i] = parseFloat((flujoTotalMensual[i]*-1).toFixed(2));
    }


  }

  if(this.periodoPago==='36'){
    seguroVehiMensual[37]=0;
  }else if(this.periodoPago==='24'){
    seguroVehiMensual[25]=0;
  }


  //////////////////////////
  cuotaTotal = parseFloat(cuotaTotal.toFixed(2));

  for (let i = 1; i < cuotaMensual.length; i++) {
    if (parseInt(this.periodoPago) == 36) {
      if (i == 37) {
        cuotaMensual[i] = parseFloat(this.cuotaFinal);
      } else {
        cuotaMensual[i] = cuotaTotal;
      }
    } else if (parseInt(this.periodoPago) == 24) {
      if (i == 25) {
        cuotaMensual[i] = parseFloat(this.cuotaFinal);
      } else {
        cuotaMensual[i] = cuotaTotal;
      }
    }
    seguroVehiMensual[i] = parseFloat(seguroVehiMensual[i].toFixed(2));

  }


  for (let i = 1; i < parseInt(this.periodoParcial)+1; i++) {
    
    cuotaMensual[i] = seguroDesMensual[i]+interesMensual[i];
    flujoTotalMensual[i] = (cuotaMensual[i]+seguroVehiMensual[i]+portesMensual[i]+gastosAdministracionMensual[i]);
    
    
  }

  interesMensual[1] = parseFloat(interesMensual[1].toFixed(2));


  seguroDesMensual[1] = parseFloat(seguroDesMensual[1].toFixed(2));

  amortizacionMensual[1] = parseFloat(amortizacionMensual[1].toFixed(2));




  saldoMensual[1] = parseFloat(saldoMensual[1].toFixed(2));

  for (let i = 1; i < flujoTotalMensual.length; i++) {
    
    flujoTotalMensual[i] = parseFloat(flujoTotalMensual[i].toFixed(2));

  }

  console.log('Flujo Total Mensual:', flujoTotalMensual);
  console.log('Cuota Mensual:', cuotaMensual);
  console.log('Interes Mensual:', interesMensual);
  console.log('Seguro Desgravamen Mensual:', seguroDesMensual);
  console.log('Amortizacion Mensual:', amortizacionMensual);
  console.log('Saldo Mensual:', saldoMensual);


  

  for (let i = 2; i < saldoMensual.length; i++) {

    interesMensual[i] = parseFloat(interesMensual[i].toFixed(2));
    seguroDesMensual[i] = parseFloat(seguroDesMensual[i].toFixed(2));
    amortizacionMensual[i] = parseFloat(amortizacionMensual[i].toFixed(2));
    saldoMensual[i] = parseFloat(saldoMensual[i].toFixed(2));
  }

  for(let i=1;i<parseInt(this.periodoParcial);i++){
    cuotaMensual[i+1]=parseFloat(cuotaMensual[i+1].toFixed(2));
  }
  cuotaMensual[1]=parseFloat(cuotaMensual[1].toFixed(2));


  ViewCronogramaComponent.saldo1Global=(saldoMensual[1]).toString();
  ViewCronogramaComponent.saldo12Global=(saldoMensual[12]).toString();

  console.log('Saldo 1:',  ViewCronogramaComponent.saldo1Global);
  console.log('Saldo 12:',  ViewCronogramaComponent.saldo12Global);
  ViewCronogramaComponent.montoPagadoGlobal=(parseFloat(ViewCronogramaComponent.saldo1Global)-parseFloat(ViewCronogramaComponent.saldo12Global)).toString();
  console.log('Cuota Pagada:',  ViewCronogramaComponent.montoPagadoGlobal);




  ViewCronogramaComponent.cuotaMensualGlobal = cuotaMensual[20].toFixed(2);

  ViewCronogramaComponent.flujoMensualGlobal = (flujoTotalMensual[20]).toFixed(2);


  if (parseInt(this.periodoPago) == 36) {
    interesMensual[37] = 0;
    seguroDesMensual[37] = 0;
    amortizacionMensual[37] = 0;
    saldoMensual[37] = 0;
    cuotaMensual[37] = 0;

  } else {

    interesMensual[25] = 0;
    seguroDesMensual[25] = 0;
    amortizacionMensual[25] = 0;
    saldoMensual[25] = 0;
    cuotaMensual[25] = 0;
  }
  const partesFecha: string[] = this.fechaDesembolso.split('-');
  const dia: number = parseInt(partesFecha[2], 10);  // Extrae el día como un número
  ViewCronogramaComponent.diaPagoGlobal = dia.toString();

  console.log('Fecha Desembolso:', this.fechaDesembolso);
  console.log('Moneda:', this.tipoMoneda);
  console.log('Dia Pago:', ViewCronogramaComponent.diaPagoGlobal);
  console.log('Valor Vehiculo:', this.valorVehiculo);
  console.log('Tasa Efectiva Anual:', this.tasaEfectivaAnual);
  console.log('Periodo Pago:', this.periodoPago);
  console.log('Seguro Desgravamen:', this.seguroDesgravamen);
  console.log('Cuota Inicial:', this.cuotaInicial);
  console.log('Monto Prestamo:', this.montoPrestamo);
  console.log('Cuota Final:', this.cuotaFinal);
  console.log('Cuotas al Año:', this.cuotasAño);
  console.log('Cuota Mensual:', ViewCronogramaComponent.cuotaMensualGlobal);

  console.log('COK:', this.tasaDescuento);
  console.log('VAN:', ViewCronogramaComponent.vanGlobal);
  console.log('TIR:', ViewCronogramaComponent.tirGlobal);
  //=+(1+C206)^12-1
  ViewCronogramaComponent.tceaGlobal = ((((Math.pow(1+(parseFloat(ViewCronogramaComponent.tirGlobal)/100),12))-1)*100).toFixed(2)).toString();

  ViewCronogramaComponent.seguroVehicularGlobal = (seguroVehiMensual[5].toString()); 


  //this.quedarseConElAuto();

  /*
  const requestPayload: any = {
    userId:this.authService.getUser()?.id,
    fechaDesembolso: this.fechaDesembolso,
    moneda: this.tipoMoneda,
    diaPago: ViewCronogramaComponent.diaPagoGlobal,
    valorVehiculo: this.valorVehiculo,
    tasaEfectivaAnual: this.tasaEfectivaAnual,
    periodoPago: this.periodoPago,
    tasaDesgravamen: this.seguroDesgravamen,
    cuotaInicial: this.cuotaInicial,
    montoPrestamo: this.montoPrestamo,
    cuotaFinal: this.cuotaFinal,
    cuotasAnio: this.cuotasAño,
    cuotaMensual: ViewCronogramaComponent.cuotaMensualGlobal,
    cok:  this.tasaDescuento,
    van: ViewCronogramaComponent.vanGlobal,
    tir: ViewCronogramaComponent.tirGlobal,
    gastoNotarial:this.gatosNotariales,
    gastoRegistral:this.gastosRegistrales,
    comisionEstudio:this.comisionEstudio,
    porte:this.portes,
    gastoAdministracion:this.gastosAdministracion,
    periodoTotal:this.periodoTotal,
    periodoParcial:this.periodoParcial,
    flujoMensual:ViewCronogramaComponent.flujoMensualGlobal,
    tasaSeguroVehicular:this.seguroVehicularAnual,
    seguroVehicular: ViewCronogramaComponent.seguroVehicularGlobal,
    tcea:ViewCronogramaComponent.tceaGlobal 
  };

  this.vehicleCreditService.createVehicleCredit(requestPayload).subscribe(
    (response) => {
      console.log('Producto guardado en la base de datos:', response);
    }
  );*/

  let suma: number = 0;
  //saldoMensual[37]=parseFloat(cero).toFixed(2);
  for (let i = 1; i < amortizacionMensual.length - 1; i++) {
    suma += (amortizacionMensual[i]);

  }

  const aux = (amortizacionMensual[2]) + parseFloat(estadoCuentaMensual[1]) +
    (seguroVehiMensual[1]) + (interesMensual[2])
    + (seguroDesMensual[2]);
  const amortizacionMensualData = amortizacionMensual.map((amortizacion, index) => ({
    amortizacionMensual: amortizacion,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));
  const cuotaMensualData = cuotaMensual.map((cuota, index) => ({
    cuotaMensual: cuota,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));


  const estadoCuentaMensualData = estadoCuentaMensual.map((estado, index) => ({
    estadoCuenta: estado,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));


  const seguroVehicularData = seguroVehiMensual.map((seguro, index) => ({
    seguroVehicular: seguro,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));

  const seguroDesgravamenData = seguroDesMensual.map((seguro, index) => ({
    seguroDesgravamen: seguro,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));

  const interesMensualData = interesMensual.map((interes, index) => ({
    interesMensual: interes,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));
  const saldoMensualData = saldoMensual.map((saldo, index) => ({
    saldoMensual: saldo,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));

  const portesMensualData = portesMensual.map((portes, index) => ({
    portesMensual: portes,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));

  const gastosAdministracionMensualData = gastosAdministracionMensual.map((gastos, index) => ({
    gastosAdministracionMensual: gastos,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
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
    name: '',
    empresa: '',
  }));
  const flutoTotalMensualData = flujoTotalMensual.map((flujo, index) => ({
    flutoTotalMensual: flujo,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));
  // Combina todas las nuevas variables con fechasPagoData
  const combinedData = seguroDesgravamenData.map((seguroDesMensualItem, index) => ({
    ...seguroDesMensualItem,
    ...flutoTotalMensualData[index],
    ...gastosAdministracionMensualData[index],
    ...portesMensualData[index],
    ...interesMensualData[index],
    ...saldoMensualData[index],
    ...seguroVehicularData[index],
    ...amortizacionMensualData[index],
    ...cuotaMensualData[index],
    ...estadoCuentaMensualData[index],
    ...fechasPagoData[index],
  }));

  // Asignar combinedData a dataSource
  this.dataSource.data = combinedData;







  // Asignar combinedData a dataSource
  this.dataSource.data = combinedData;



  console.log('Cuota Total:', cuotaTotal);
  console.log(fechasPago.length);
  console.log(fechasPago);
  console.log(this.data)
  console.log('Cuota Mensual No. 2:', aux);
  console.log('Suma: ', suma);

}












//CON PERIODOS DE GRACIA PARCIAL
getCalculosPeriodoGraciaParcial(): void {

  ViewCronogramaComponent.cuotonGlobal = this.cuotaFinal;

  this.montoPrestamo=(parseFloat(this.montoPrestamo)+parseFloat(this.gastosNotariales)
  +parseFloat(this.gastosRegistrales)+parseFloat(this.comisionEstudio)).toString();

  //=+(1+9%)^(1/12)-1
  const tasaInteresMensual: number = (Math.pow(1 + ((parseFloat(this.tasaEfectivaAnual) / 100)), 1 / 12)) - 1;
  console.log('Tasa Interes Mensual112:', tasaInteresMensual);
  const tasaSeguroDesgraMensual: number = (parseFloat(this.seguroDesgravamen) / 100);


  const tasaSeguroVehiMensual: number = (parseFloat(this.seguroVehicularAnual) / 100) / 12;
  console.log('Tasa Vehicular Mensual112:', tasaSeguroVehiMensual);

  const sumaTasasMensuales: number = tasaInteresMensual + tasaSeguroDesgraMensual;

  //=+(1440180*(C181+C182))/(1-(1+(C181+C182))^-8)
  //cuotaTotal = parseFloat(cuotaTotal.toFixed(2));
  /*
      const cuotaTotal: number = ((parseInt(this.montoPrestamo) *( iTasa+(parseFloat(this.seguroDesgravamen) / 100)))
       / (1 - (Math.pow(1 + iTasa+(parseFloat(this.seguroDesgravamen) / 100), 
       -(parseInt(this.periodoPago))))))+Svm;
      */

  const cero: string = '0';

  //ESTADO DE CUENTA MENSUAL FISICO
  const estadoCuentaMensual: string[] = new Array(parseInt(this.periodoPago) + 2);
  estadoCuentaMensual[0] = parseFloat(cero).toFixed(2);
  const diez: string = '10';

  //SEGURO VEHICULAR MENSUAL
  const seguroVehiMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  seguroVehiMensual[0] = 0;
  const auxSeguroVehi = parseInt(this.valorVehiculo) * tasaSeguroVehiMensual;
  console.log('Auxiliar Seguro Vehicular12122:', auxSeguroVehi);
  //CUOTA MENSUAL
  const cuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  cuotaMensual[0] = 0;

  const portesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  portesMensual[0]=0;

  const gastosAdministracionMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  gastosAdministracionMensual[0]=0;

  for (let i = 1; i < portesMensual.length; i++) {
    gastosAdministracionMensual[i] = parseInt(this.gastosAdministracion);


    portesMensual[i] = parseInt(this.portes);
  }

  if(this.periodoPago==='36'){
    gastosAdministracionMensual[37]=0;

    portesMensual[37]=0;
  }else if (this.periodoPago==='24'){
    gastosAdministracionMensual[25]=0;

    portesMensual[25]=0;
  }





 

  let ceroAux: string = '0.00';
  const ceroAux2 = parseFloat(ceroAux);

  //INTERES MENSUAL    
  const interesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  interesMensual[0] = 0;
  //interesMensual[1] = Im1.toFixed(2);
  interesMensual[1] = (parseFloat(this.montoPrestamo) * tasaInteresMensual);


  //SEGURO DESGRAVAMEN MENSUAL
  const seguroDesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  seguroDesMensual[0] = 0;
  //seguroDesMensual[1] = Sd.toFixed(2);
  seguroDesMensual[1] = (parseFloat(this.montoPrestamo) * tasaSeguroDesgraMensual);

  //AMORTIZACION MENSUAL
  const amortizacionMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  amortizacionMensual[0] = 0;
  //amortizacionMensual[1] = amortizacion.toFixed(2);
  for(let i=0;i<parseInt(this.periodoParcial);i++){
    amortizacionMensual[i+1] = 0;
  }




  //SALDO MENSUAL
  const saldoMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  saldoMensual[0] = parseFloat(this.montoPrestamo);
  saldoMensual[1] = parseFloat(this.montoPrestamo)-amortizacionMensual[1];


  


  for(let i=1;i<parseInt(this.periodoParcial);i++){
    interesMensual[i+1] = (saldoMensual[i] *tasaInteresMensual);

    saldoMensual[i+1] = (saldoMensual[i] - (amortizacionMensual[i+1]));
  }

  let cuotaTotal: number = ((saldoMensual[parseInt(this.periodoParcial)] * (sumaTasasMensuales)) / (1 - (Math.pow(1 + sumaTasasMensuales, -(parseInt(this.periodoPago)-parseInt(this.periodoParcial))))));

  console.log('Cuota Total:', cuotaTotal);
  //4
  if(parseInt(this.periodoParcial)===1){
    seguroDesMensual[1] = (parseFloat(this.montoPrestamo) * tasaSeguroDesgraMensual);

  }else{
    //4
    

    for(let i=1;i<parseInt(this.periodoParcial);i++){
      seguroDesMensual[i+1]=((saldoMensual[i]) * tasaSeguroDesgraMensual);
    }
  }

  

  const auxperiodoParcial = parseInt(this.periodoParcial)+1;

  for (let i = auxperiodoParcial; i < saldoMensual.length; i++) {

    interesMensual[i] = ((saldoMensual[i-1]) * tasaInteresMensual);
    seguroDesMensual[i] = ((saldoMensual[i-1]) * tasaSeguroDesgraMensual);
    //amortizacionMensual[i] = (parseFloat(saldoMensual[i-1])).toFixed(2);

    amortizacionMensual[i] = (cuotaTotal - (interesMensual[i]) - (seguroDesMensual[i]));
    saldoMensual[i] = ((saldoMensual[i-1]) - (amortizacionMensual[i]));


  }

  for (let i = 1; i < parseInt(this.periodoParcial)+1; i++) {
    
    cuotaMensual[i] = seguroDesMensual[i]+interesMensual[i];
  }





  const flujoTotalMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
  flujoTotalMensual[0]=parseInt(this.montoPrestamo);
  for (let i = 1; i < flujoTotalMensual.length; i++) {
    flujoTotalMensual[i] = (cuotaTotal+auxSeguroVehi+parseInt(this.portes)+parseInt(this.gastosAdministracion));
  }
  if(this.periodoPago==='36'){
    flujoTotalMensual[37]=0;

  }else if (this.periodoPago==='24'){
    flujoTotalMensual[25]=0;

  }

  



  for (let i = 1; i < cuotaMensual.length; i++) {
    if (parseInt(this.periodoPago) == 36) {
      if (i == 37) {
        cuotaMensual[i] = parseFloat(this.cuotaFinal);
      } else {
        cuotaMensual[i] = cuotaTotal;
      }
    } else if (parseInt(this.periodoPago) == 24) {
      if (i == 25) {
        cuotaMensual[i] = parseFloat(this.cuotaFinal);
      } else {
        cuotaMensual[i] = cuotaTotal;
      }
    }
    seguroVehiMensual[i] = auxSeguroVehi;
    estadoCuentaMensual[i] = parseFloat(diez).toFixed(2);
  }

  console.log('INteres Total Mensual:', interesMensual);
  console.log('SALDO Total Mensual:', saldoMensual);

  //saldoMensual[1] = (parseFloat(this.montoPrestamo) - (amortizacionMensual[1])+(interesMensual[1]));





  //console.log((parseFloat(saldoMensual[1]) * iTasa).toFixed(2));


  let sumaVAN: number = 0;
  let finance = new Finance();

  //CACULO DE LA VAN
  if (parseInt(this.periodoPago) == 36) {
    const auxcuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 1);
    //auxcuotaMensual[0]=(parseInt(this.montoPrestamo));

    for (let i = 1; i < cuotaMensual.length - 2; i++) {
      auxcuotaMensual[i - 1] = (cuotaMensual[i] * 1);
    }
    auxcuotaMensual[35] = auxcuotaMensual[1];

    auxcuotaMensual[36] = (parseInt(this.cuotaFinal) * 1);
    console.log(auxcuotaMensual);


    const auxTasaDescuento = (Math.pow(1 + (parseFloat(this.tasaDescuento) / 100), (1 / 12))) - 1;
    console.log(auxTasaDescuento);


    for (let i = 0; i < auxcuotaMensual.length; i++) {
      auxcuotaMensual[i] = parseFloat(auxcuotaMensual[i].toFixed(2));
    }

    for (let i = 1; i < parseInt(this.periodoParcial)+1; i++) {
    
      cuotaMensual[i] = seguroDesMensual[i]+interesMensual[i];
      flujoTotalMensual[i] = (cuotaMensual[i]+seguroVehiMensual[i]+portesMensual[i]+gastosAdministracionMensual[i]);
      
      
    }

    flujoTotalMensual[37]=parseInt(this.cuotaFinal);

    console.log('Flujo Mensual asdasdasaSDASD ALDO PASTRANA',flujoTotalMensual);

    const auxflujoMensual = flujoTotalMensual.slice(1);

    /*
    const auxflujoMensual: number[] = new Array(parseInt(this.periodoPago));
    for (let i = 0; i < auxflujoMensual.length; i++) {
      auxflujoMensual[i] = flujoTotalMensual[i];
    }*/

    

    console.log('Flujo Mensual asdasdasaSDASD',auxflujoMensual);

/*
    const auxflujoMensual2: number[] = new Array(parseInt(this.periodoPago));
    for (let i = 0; i < auxflujoMensual2.length; i++) {
      auxflujoMensual2[i] = (flujoTotalMensual[1]*-1);
    }*/

    //const auxVAN: number = finance.NPV(auxTasaDescuento,parseInt(this.montoPrestamo)*1,...auxflujoMensual2);

    for (let i = 0; i < auxflujoMensual.length; i++) {
      sumaVAN += (auxflujoMensual[i] / (Math.pow(1 + auxTasaDescuento, i +1)));
    }
    //sumaVAN += (parseInt(this.cuotaFinal)/(Math.pow(1+auxTasaDescuento,37)));

    sumaVAN *= -1;

    sumaVAN = sumaVAN + (parseInt(this.montoPrestamo));
    console.log(`sumaVAN: `, sumaVAN);

    //sumaVAN=auxVAN;
    ViewCronogramaComponent.vanGlobal = sumaVAN.toFixed(2);

    

    const auxTIR: number = finance.IRR((parseInt(this.montoPrestamo) * -1), ...auxflujoMensual);
    console.log(`sumaTIR: `, auxTIR);
    ViewCronogramaComponent.tirGlobal = auxTIR.toFixed(2);

    for (let i = 1; i < flujoTotalMensual.length; i++) {
      flujoTotalMensual[i] = parseFloat((flujoTotalMensual[i]*-1).toFixed(2));
    }

  } else {
    const auxcuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 1);
    //auxcuotaMensual[0]=(parseInt(this.montoPrestamo));

    for (let i = 1; i < cuotaMensual.length - 2; i++) {
      auxcuotaMensual[i - 1] = (cuotaMensual[i] * 1);
    }
    auxcuotaMensual[23] = auxcuotaMensual[1];

    auxcuotaMensual[24] = (parseInt(this.cuotaFinal) * 1);
    console.log(auxcuotaMensual);
    const auxTasaDescuento = (Math.pow(1 + (parseFloat(this.tasaDescuento) / 100), (1 / 12))) - 1;
    console.log(auxTasaDescuento);


    for (let i = 0; i < auxcuotaMensual.length; i++) {
      auxcuotaMensual[i] = parseFloat(auxcuotaMensual[i].toFixed(2));
    }
    console.log(auxcuotaMensual);


    for (let i = 1; i < parseInt(this.periodoParcial)+1; i++) {
    
      cuotaMensual[i] = seguroDesMensual[i]+interesMensual[i];
      flujoTotalMensual[i] = (cuotaMensual[i]+seguroVehiMensual[i]+portesMensual[i]+gastosAdministracionMensual[i]);
      
      
    }

    flujoTotalMensual[25]=parseInt(this.cuotaFinal);

    console.log('Flujo Mensual asdasdasaSDASD ALDO PASTRANA',flujoTotalMensual);


    const auxflujoMensual = flujoTotalMensual.slice(1);

    console.log('Flujo Mensual asdasdasaSDASD',auxflujoMensual);
/*
    const auxflujoMensual2: number[] = new Array(parseInt(this.periodoPago));
    for (let i = 0; i < auxflujoMensual2.length; i++) {
      auxflujoMensual2[i] = (flujoTotalMensual[1]*-1);
    }*/

    //const auxVAN: number = finance.NPV(auxTasaDescuento,parseInt(this.montoPrestamo)*1,...auxflujoMensual2);

    for (let i = 0; i < auxflujoMensual.length; i++) {
      sumaVAN += (auxflujoMensual[i] / (Math.pow(1 + auxTasaDescuento, i +1)));
    }
    //sumaVAN += (parseInt(this.cuotaFinal)/(Math.pow(1+auxTasaDescuento,37)));

    sumaVAN *= -1;

    sumaVAN = sumaVAN + (parseInt(this.montoPrestamo));
    console.log(`sumaVAN: `, sumaVAN);

    //sumaVAN=auxVAN;
    ViewCronogramaComponent.vanGlobal = sumaVAN.toFixed(2);

    

    const auxTIR: number = finance.IRR((parseInt(this.montoPrestamo) * -1), ...auxflujoMensual);
    console.log(`sumaTIR: `, auxTIR);
    ViewCronogramaComponent.tirGlobal = auxTIR.toFixed(2);

    for (let i = 1; i < flujoTotalMensual.length; i++) {
      flujoTotalMensual[i] = parseFloat((flujoTotalMensual[i]*-1).toFixed(2));
    }


  }

  if(this.periodoPago==='36'){
    seguroVehiMensual[37]=0;
  }else if(this.periodoPago==='24'){
    seguroVehiMensual[25]=0;
  }


  //////////////////////////
  cuotaTotal = parseFloat(cuotaTotal.toFixed(2));

  for (let i = 1; i < cuotaMensual.length; i++) {
    if (parseInt(this.periodoPago) == 36) {
      if (i == 37) {
        cuotaMensual[i] = parseFloat(this.cuotaFinal);
      } else {
        cuotaMensual[i] = cuotaTotal;
      }
    } else if (parseInt(this.periodoPago) == 24) {
      if (i == 25) {
        cuotaMensual[i] = parseFloat(this.cuotaFinal);
      } else {
        cuotaMensual[i] = cuotaTotal;
      }
    }
    seguroVehiMensual[i] = parseFloat(seguroVehiMensual[i].toFixed(2));

  }


  for (let i = 1; i < parseInt(this.periodoParcial)+1; i++) {
    
    cuotaMensual[i] = seguroDesMensual[i]+interesMensual[i];
    flujoTotalMensual[i] = (cuotaMensual[i]+seguroVehiMensual[i]+portesMensual[i]+gastosAdministracionMensual[i]);
    
    
  }

  interesMensual[1] = parseFloat(interesMensual[1].toFixed(2));


  seguroDesMensual[1] = parseFloat(seguroDesMensual[1].toFixed(2));

  amortizacionMensual[1] = parseFloat(amortizacionMensual[1].toFixed(2));




  saldoMensual[1] = parseFloat(saldoMensual[1].toFixed(2));

  for (let i = 1; i < flujoTotalMensual.length; i++) {
    
    flujoTotalMensual[i] = parseFloat(flujoTotalMensual[i].toFixed(2));

  }

  console.log('Flujo Total Mensual:', flujoTotalMensual);
  console.log('Cuota Mensual:', cuotaMensual);
  console.log('Interes Mensual:', interesMensual);
  console.log('Seguro Desgravamen Mensual:', seguroDesMensual);
  console.log('Amortizacion Mensual:', amortizacionMensual);
  console.log('Saldo Mensual:', saldoMensual);


  

  for (let i = 2; i < saldoMensual.length; i++) {

    interesMensual[i] = parseFloat(interesMensual[i].toFixed(2));
    seguroDesMensual[i] = parseFloat(seguroDesMensual[i].toFixed(2));
    amortizacionMensual[i] = parseFloat(amortizacionMensual[i].toFixed(2));
    saldoMensual[i] = parseFloat(saldoMensual[i].toFixed(2));
  }

  for(let i=1;i<parseInt(this.periodoParcial);i++){
    cuotaMensual[i+1]=parseFloat(cuotaMensual[i+1].toFixed(2));
  }
  cuotaMensual[1]=parseFloat(cuotaMensual[1].toFixed(2));




  ViewCronogramaComponent.saldo1Global=(saldoMensual[1]).toString();
  ViewCronogramaComponent.saldo12Global=(saldoMensual[12]).toString();

  console.log('Saldo 1:',  ViewCronogramaComponent.saldo1Global);
  console.log('Saldo 12:',  ViewCronogramaComponent.saldo12Global);
  ViewCronogramaComponent.montoPagadoGlobal=(parseFloat(ViewCronogramaComponent.saldo1Global)-parseFloat(ViewCronogramaComponent.saldo12Global)).toString();
  console.log('Cuota Pagada:',  ViewCronogramaComponent.montoPagadoGlobal);




  ViewCronogramaComponent.cuotaMensualGlobal = cuotaMensual[20].toFixed(2);
  ViewCronogramaComponent.flujoMensualGlobal = (flujoTotalMensual[20]).toFixed(2);



  if (parseInt(this.periodoPago) == 36) {
    interesMensual[37] = 0;
    seguroDesMensual[37] = 0;
    amortizacionMensual[37] = 0;
    saldoMensual[37] = 0;
    cuotaMensual[37] = 0;

  } else {

    interesMensual[25] = 0;
    seguroDesMensual[25] = 0;
    amortizacionMensual[25] = 0;
    saldoMensual[25] = 0;
    cuotaMensual[25] = 0;
  }
  const partesFecha: string[] = this.fechaDesembolso.split('-');
  const dia: number = parseInt(partesFecha[2], 10);  // Extrae el día como un número
  ViewCronogramaComponent.diaPagoGlobal = dia.toString();

  console.log('Fecha Desembolso:', this.fechaDesembolso);
  console.log('Moneda:', this.tipoMoneda);
  console.log('Dia Pago:', ViewCronogramaComponent.diaPagoGlobal);
  console.log('Valor Vehiculo:', this.valorVehiculo);
  console.log('Tasa Efectiva Anual:', this.tasaEfectivaAnual);
  console.log('Periodo Pago:', this.periodoPago);
  console.log('Seguro Desgravamen:', this.seguroDesgravamen);
  console.log('Cuota Inicial:', this.cuotaInicial);
  console.log('Monto Prestamo:', this.montoPrestamo);
  console.log('Cuota Final:', this.cuotaFinal);
  console.log('Cuotas al Año:', this.cuotasAño);
  console.log('Cuota Mensual:', ViewCronogramaComponent.cuotaMensualGlobal);

  console.log('COK:', this.tasaDescuento);
  console.log('VAN:', ViewCronogramaComponent.vanGlobal);
  console.log('TIR:', ViewCronogramaComponent.tirGlobal);
  
  ViewCronogramaComponent.tceaGlobal = ((((Math.pow(1+(parseFloat(ViewCronogramaComponent.tirGlobal)/100),12))-1)*100).toFixed(2)).toString();

  ViewCronogramaComponent.seguroVehicularGlobal = (seguroVehiMensual[5].toString()); 

  //this.quedarseConElAuto();
  /*
  const requestPayload: any = {
    userId:this.authService.getUser()?.id,
    fechaDesembolso: this.fechaDesembolso,
    moneda: this.tipoMoneda,
    diaPago: ViewCronogramaComponent.diaPagoGlobal,
    valorVehiculo: this.valorVehiculo,
    tasaEfectivaAnual: this.tasaEfectivaAnual,
    periodoPago: this.periodoPago,
    tasaDesgravamen: this.seguroDesgravamen,
    cuotaInicial: this.cuotaInicial,
    montoPrestamo: this.montoPrestamo,
    cuotaFinal: this.cuotaFinal,
    cuotasAnio: this.cuotasAño,
    cuotaMensual: ViewCronogramaComponent.cuotaMensualGlobal,
    cok:  this.tasaDescuento,
    van: ViewCronogramaComponent.vanGlobal,
    tir: ViewCronogramaComponent.tirGlobal,
    gastoNotarial:this.gatosNotariales,
    gastoRegistral:this.gastosRegistrales,
    comisionEstudio:this.comisionEstudio,
    porte:this.portes,
    gastoAdministracion:this.gastosAdministracion,
    periodoTotal:this.periodoTotal,
    periodoParcial:this.periodoParcial,
    flujoMensual:ViewCronogramaComponent.flujoMensualGlobal,
    tasaSeguroVehicular:this.seguroVehicularAnual,
    seguroVehicular: (seguroVehiMensual[5].toString()),
    tcea:ViewCronogramaComponent.tceaGlobal
  };

  this.vehicleCreditService.createVehicleCredit(requestPayload).subscribe(
    (response) => {
      console.log('Producto guardado en la base de datos:', response);
    }
  );*/

  let suma: number = 0;
  //saldoMensual[37]=parseFloat(cero).toFixed(2);
  for (let i = 1; i < amortizacionMensual.length - 1; i++) {
    suma += (amortizacionMensual[i]);

  }

  const aux = (amortizacionMensual[2]) + parseFloat(estadoCuentaMensual[1]) +
    (seguroVehiMensual[1]) + (interesMensual[2])
    + (seguroDesMensual[2]);
  const amortizacionMensualData = amortizacionMensual.map((amortizacion, index) => ({
    amortizacionMensual: amortizacion,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));
  const cuotaMensualData = cuotaMensual.map((cuota, index) => ({
    cuotaMensual: cuota,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));


  const estadoCuentaMensualData = estadoCuentaMensual.map((estado, index) => ({
    estadoCuenta: estado,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));


  const seguroVehicularData = seguroVehiMensual.map((seguro, index) => ({
    seguroVehicular: seguro,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));

  const seguroDesgravamenData = seguroDesMensual.map((seguro, index) => ({
    seguroDesgravamen: seguro,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));

  const interesMensualData = interesMensual.map((interes, index) => ({
    interesMensual: interes,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));
  const saldoMensualData = saldoMensual.map((saldo, index) => ({
    saldoMensual: saldo,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));

  const portesMensualData = portesMensual.map((portes, index) => ({
    portesMensual: portes,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));

  const gastosAdministracionMensualData = gastosAdministracionMensual.map((gastos, index) => ({
    gastosAdministracionMensual: gastos,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
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
    name: '',
    empresa: '',
  }));
  const flutoTotalMensualData = flujoTotalMensual.map((flujo, index) => ({
    flutoTotalMensual: flujo,
    fechaPago: '',
    position: index,
    name: '',
    empresa: '',
  }));
  // Combina todas las nuevas variables con fechasPagoData
  const combinedData = seguroDesgravamenData.map((seguroDesMensualItem, index) => ({
    ...seguroDesMensualItem,
    ...flutoTotalMensualData[index],
    ...gastosAdministracionMensualData[index],
    ...portesMensualData[index],
    ...interesMensualData[index],
    ...saldoMensualData[index],
    ...seguroVehicularData[index],
    ...amortizacionMensualData[index],
    ...cuotaMensualData[index],
    ...estadoCuentaMensualData[index],
    ...fechasPagoData[index],
  }));

  // Asignar combinedData a dataSource
  this.dataSource.data = combinedData;







  // Asignar combinedData a dataSource
  this.dataSource.data = combinedData;



  console.log('Cuota Total:', cuotaTotal);
  console.log(fechasPago.length);
  console.log(fechasPago);
  console.log(this.data)
  console.log('Cuota Mensual No. 2:', aux);
  console.log('Suma: ', suma);

}













  //CON PERIODOS DE GRACIA TOTAL
  getCalculosPeriodoGraciaTotal(): void {

    ViewCronogramaComponent.cuotonGlobal = this.cuotaFinal;

    this.montoPrestamo=(parseFloat(this.montoPrestamo)+parseFloat(this.gastosNotariales)
    +parseFloat(this.gastosRegistrales)+parseFloat(this.comisionEstudio)).toString();

    //=+(1+9%)^(1/12)-1
    const tasaInteresMensual: number = (Math.pow(1 + ((parseFloat(this.tasaEfectivaAnual) / 100)), 1 / 12)) - 1;
    console.log('Tasa Interes Mensual112:', tasaInteresMensual);
    const tasaSeguroDesgraMensual: number = (parseFloat(this.seguroDesgravamen) / 100);


    const tasaSeguroVehiMensual: number = (parseFloat(this.seguroVehicularAnual) / 100) / 12;
    console.log('Tasa Vehicular Mensual112:', tasaSeguroVehiMensual);

    const sumaTasasMensuales: number = tasaInteresMensual + tasaSeguroDesgraMensual;

    //=+(1440180*(C181+C182))/(1-(1+(C181+C182))^-8)
    //cuotaTotal = parseFloat(cuotaTotal.toFixed(2));
    /*
        const cuotaTotal: number = ((parseInt(this.montoPrestamo) *( iTasa+(parseFloat(this.seguroDesgravamen) / 100)))
         / (1 - (Math.pow(1 + iTasa+(parseFloat(this.seguroDesgravamen) / 100), 
         -(parseInt(this.periodoPago))))))+Svm;
        */

    const cero: string = '0';

    //ESTADO DE CUENTA MENSUAL FISICO
    const estadoCuentaMensual: string[] = new Array(parseInt(this.periodoPago) + 2);
    estadoCuentaMensual[0] = parseFloat(cero).toFixed(2);
    const diez: string = '10';

    //SEGURO VEHICULAR MENSUAL
    const seguroVehiMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    seguroVehiMensual[0] = 0;
    const auxSeguroVehi = parseInt(this.valorVehiculo) * tasaSeguroVehiMensual;
    console.log('Auxiliar Seguro Vehicular12122:', auxSeguroVehi);
    //CUOTA MENSUAL
    const cuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    cuotaMensual[0] = 0;

    const portesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    portesMensual[0]=0;

    const gastosAdministracionMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    gastosAdministracionMensual[0]=0;

    for (let i = 1; i < portesMensual.length; i++) {
      gastosAdministracionMensual[i] = parseInt(this.gastosAdministracion);


      portesMensual[i] = parseInt(this.portes);
    }

    if(this.periodoPago==='36'){
      gastosAdministracionMensual[37]=0;

      portesMensual[37]=0;
    }else if (this.periodoPago==='24'){
      gastosAdministracionMensual[25]=0;

      portesMensual[25]=0;
    }





   

    let ceroAux: string = '0.00';
    const ceroAux2 = parseFloat(ceroAux);

    //INTERES MENSUAL    
    const interesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    interesMensual[0] = 0;
    //interesMensual[1] = Im1.toFixed(2);
    interesMensual[1] = (parseFloat(this.montoPrestamo) * tasaInteresMensual);


    //SEGURO DESGRAVAMEN MENSUAL
    const seguroDesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    seguroDesMensual[0] = 0;
    //seguroDesMensual[1] = Sd.toFixed(2);
    seguroDesMensual[1] = (parseFloat(this.montoPrestamo) * tasaSeguroDesgraMensual);

    //AMORTIZACION MENSUAL
    const amortizacionMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    amortizacionMensual[0] = 0;
    //amortizacionMensual[1] = amortizacion.toFixed(2);
    for(let i=0;i<parseInt(this.periodoTotal);i++){
      amortizacionMensual[i+1] = 0;
    }




    //SALDO MENSUAL
    const saldoMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    saldoMensual[0] = parseFloat(this.montoPrestamo);
    saldoMensual[1] = parseFloat(this.montoPrestamo)-amortizacionMensual[1]+interesMensual[1];


    


    for(let i=1;i<parseInt(this.periodoTotal);i++){
      interesMensual[i+1] = (saldoMensual[i] *tasaInteresMensual);

      saldoMensual[i+1] = (saldoMensual[i] - (amortizacionMensual[i+1])+(interesMensual[i+1]));
    }

    let cuotaTotal: number = ((saldoMensual[parseInt(this.periodoTotal)] * (sumaTasasMensuales)) / (1 - (Math.pow(1 + sumaTasasMensuales, -(parseInt(this.periodoPago)-parseInt(this.periodoTotal))))));

    console.log('Cuota Total:', cuotaTotal);
    //4
    if(parseInt(this.periodoTotal)===1){
      seguroDesMensual[1] = (parseFloat(this.montoPrestamo) * tasaSeguroDesgraMensual);

    }else{
      //4
      

      for(let i=1;i<parseInt(this.periodoTotal);i++){
        seguroDesMensual[i+1]=((saldoMensual[i]) * tasaSeguroDesgraMensual);
      }
    }

    

    const auxPeriodoTotal = parseInt(this.periodoTotal)+1;

    for (let i = auxPeriodoTotal; i < saldoMensual.length; i++) {

      interesMensual[i] = ((saldoMensual[i-1]) * tasaInteresMensual);
      seguroDesMensual[i] = ((saldoMensual[i-1]) * tasaSeguroDesgraMensual);
      //amortizacionMensual[i] = (parseFloat(saldoMensual[i-1])).toFixed(2);

      amortizacionMensual[i] = (cuotaTotal - (interesMensual[i]) - (seguroDesMensual[i]));
      saldoMensual[i] = ((saldoMensual[i-1]) - (amortizacionMensual[i]));


    }

    for (let i = 1; i < parseInt(this.periodoTotal)+1; i++) {
      
      cuotaMensual[i] = seguroDesMensual[i];
    }





    const flujoTotalMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    flujoTotalMensual[0]=parseInt(this.montoPrestamo);
    for (let i = 1; i < flujoTotalMensual.length; i++) {
      flujoTotalMensual[i] = (cuotaTotal+auxSeguroVehi+parseInt(this.portes)+parseInt(this.gastosAdministracion));
    }
    if(this.periodoPago==='36'){
      flujoTotalMensual[37]=0;

    }else if (this.periodoPago==='24'){
      flujoTotalMensual[25]=0;

    }

    



    for (let i = 1; i < cuotaMensual.length; i++) {
      if (parseInt(this.periodoPago) == 36) {
        if (i == 37) {
          cuotaMensual[i] = parseFloat(this.cuotaFinal);
        } else {
          cuotaMensual[i] = cuotaTotal;
        }
      } else if (parseInt(this.periodoPago) == 24) {
        if (i == 25) {
          cuotaMensual[i] = parseFloat(this.cuotaFinal);
        } else {
          cuotaMensual[i] = cuotaTotal;
        }
      }
      seguroVehiMensual[i] = auxSeguroVehi;
      estadoCuentaMensual[i] = parseFloat(diez).toFixed(2);
    }

    console.log('INteres Total Mensual:', interesMensual);
    console.log('SALDO Total Mensual:', saldoMensual);

    //saldoMensual[1] = (parseFloat(this.montoPrestamo) - (amortizacionMensual[1])+(interesMensual[1]));





    //console.log((parseFloat(saldoMensual[1]) * iTasa).toFixed(2));

  
    let sumaVAN: number = 0;
    let finance = new Finance();

    //CACULO DE LA VAN
    if (parseInt(this.periodoPago) == 36) {
      const auxcuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 1);
      //auxcuotaMensual[0]=(parseInt(this.montoPrestamo));

      for (let i = 1; i < cuotaMensual.length - 2; i++) {
        auxcuotaMensual[i - 1] = (cuotaMensual[i] * 1);
      }
      auxcuotaMensual[35] = auxcuotaMensual[1];

      auxcuotaMensual[36] = (parseInt(this.cuotaFinal) * 1);
      console.log(auxcuotaMensual);


      const auxTasaDescuento = (Math.pow(1 + (parseFloat(this.tasaDescuento) / 100), (1 / 12))) - 1;
      console.log(auxTasaDescuento);


      for (let i = 0; i < auxcuotaMensual.length; i++) {
        auxcuotaMensual[i] = parseFloat(auxcuotaMensual[i].toFixed(2));
      }

      for (let i = 1; i < parseInt(this.periodoTotal)+1; i++) {
      
        cuotaMensual[i] = seguroDesMensual[i];
        flujoTotalMensual[i] = (cuotaMensual[i]+seguroVehiMensual[i]+portesMensual[i]+gastosAdministracionMensual[i]);
        
        
      }

      flujoTotalMensual[37]=parseInt(this.cuotaFinal);

      console.log('Flujo Mensual asdasdasaSDASDALDO PASTRANA',flujoTotalMensual);

      const auxflujoMensual = flujoTotalMensual.slice(1);

      /*
      const auxflujoMensual: number[] = new Array(parseInt(this.periodoPago));
      for (let i = 0; i < auxflujoMensual.length; i++) {
        auxflujoMensual[i] = flujoTotalMensual[i];
      }*/

      

      console.log('Flujo Mensual asdasdasaSDASD',auxflujoMensual);

/*
      const auxflujoMensual2: number[] = new Array(parseInt(this.periodoPago));
      for (let i = 0; i < auxflujoMensual2.length; i++) {
        auxflujoMensual2[i] = (flujoTotalMensual[1]*-1);
      }*/

      //const auxVAN: number = finance.NPV(auxTasaDescuento,parseInt(this.montoPrestamo)*1,...auxflujoMensual2);

      for (let i = 0; i < auxflujoMensual.length; i++) {
        sumaVAN += (auxflujoMensual[i] / (Math.pow(1 + auxTasaDescuento, i +1)));
      }
      //sumaVAN += (parseInt(this.cuotaFinal)/(Math.pow(1+auxTasaDescuento,37)));

      sumaVAN *= -1;

      sumaVAN = sumaVAN + (parseInt(this.montoPrestamo));
      console.log(`sumaVAN: `, sumaVAN);

      //sumaVAN=auxVAN;
      ViewCronogramaComponent.vanGlobal = sumaVAN.toFixed(2);

      

      const auxTIR: number = finance.IRR((parseInt(this.montoPrestamo) * -1), ...auxflujoMensual);
      console.log(`sumaTIR: `, auxTIR);
      ViewCronogramaComponent.tirGlobal = auxTIR.toFixed(2);

      for (let i = 1; i < flujoTotalMensual.length; i++) {
        flujoTotalMensual[i] = parseFloat((flujoTotalMensual[i]*-1).toFixed(2));
      }

    } else {
      const auxcuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 1);
      //auxcuotaMensual[0]=(parseInt(this.montoPrestamo));

      for (let i = 1; i < cuotaMensual.length - 2; i++) {
        auxcuotaMensual[i - 1] = (cuotaMensual[i] * 1);
      }
      auxcuotaMensual[23] = auxcuotaMensual[1];

      auxcuotaMensual[24] = (parseInt(this.cuotaFinal) * 1);
      console.log(auxcuotaMensual);
      const auxTasaDescuento = (Math.pow(1 + (parseFloat(this.tasaDescuento) / 100), (1 / 12))) - 1;
      console.log(auxTasaDescuento);


      for (let i = 0; i < auxcuotaMensual.length; i++) {
        auxcuotaMensual[i] = parseFloat(auxcuotaMensual[i].toFixed(2));
      }
      console.log(auxcuotaMensual);


      for (let i = 1; i < parseInt(this.periodoTotal)+1; i++) {
      
        cuotaMensual[i] = seguroDesMensual[i];
        flujoTotalMensual[i] = (cuotaMensual[i]+seguroVehiMensual[i]+portesMensual[i]+gastosAdministracionMensual[i]);
        
        
      }
      flujoTotalMensual[25]=parseInt(this.cuotaFinal);
      console.log('Flujo Mensual asdasdasaSDASDALDO PASTRANA',flujoTotalMensual);

      const auxflujoMensual = flujoTotalMensual.slice(1);

      console.log('Flujo Mensual asdasdasaSDASD',auxflujoMensual);
/*
      const auxflujoMensual2: number[] = new Array(parseInt(this.periodoPago));
      for (let i = 0; i < auxflujoMensual2.length; i++) {
        auxflujoMensual2[i] = (flujoTotalMensual[1]*-1);
      }*/

      //const auxVAN: number = finance.NPV(auxTasaDescuento,parseInt(this.montoPrestamo)*1,...auxflujoMensual2);

      for (let i = 0; i < auxflujoMensual.length; i++) {
        sumaVAN += (auxflujoMensual[i] / (Math.pow(1 + auxTasaDescuento, i +1)));
      }
      //sumaVAN += (parseInt(this.cuotaFinal)/(Math.pow(1+auxTasaDescuento,37)));

      sumaVAN *= -1;

      sumaVAN = sumaVAN + (parseInt(this.montoPrestamo));
      console.log(`sumaVAN: `, sumaVAN);

      //sumaVAN=auxVAN;
      ViewCronogramaComponent.vanGlobal = sumaVAN.toFixed(2);

      

      const auxTIR: number = finance.IRR((parseInt(this.montoPrestamo) * -1), ...auxflujoMensual);
      console.log(`sumaTIR: `, auxTIR);
      ViewCronogramaComponent.tirGlobal = auxTIR.toFixed(2);

      for (let i = 1; i < flujoTotalMensual.length; i++) {
        flujoTotalMensual[i] = parseFloat((flujoTotalMensual[i]*-1).toFixed(2));
      }


    }

    if(this.periodoPago==='36'){
      seguroVehiMensual[37]=0;
    }else if(this.periodoPago==='24'){
      seguroVehiMensual[25]=0;
    }


    //////////////////////////
    cuotaTotal = parseFloat(cuotaTotal.toFixed(2));

    for (let i = 1; i < cuotaMensual.length; i++) {
      if (parseInt(this.periodoPago) == 36) {
        if (i == 37) {
          cuotaMensual[i] = parseFloat(this.cuotaFinal);
        } else {
          cuotaMensual[i] = cuotaTotal;
        }
      } else if (parseInt(this.periodoPago) == 24) {
        if (i == 25) {
          cuotaMensual[i] = parseFloat(this.cuotaFinal);
        } else {
          cuotaMensual[i] = cuotaTotal;
        }
      }
      seguroVehiMensual[i] = parseFloat(seguroVehiMensual[i].toFixed(2));

    }


    for (let i = 1; i < parseInt(this.periodoTotal)+1; i++) {
      
      cuotaMensual[i] = seguroDesMensual[i];
      flujoTotalMensual[i] = (cuotaMensual[i]+seguroVehiMensual[i]+portesMensual[i]+gastosAdministracionMensual[i]);
      
      
    }

    interesMensual[1] = parseFloat(interesMensual[1].toFixed(2));


    seguroDesMensual[1] = parseFloat(seguroDesMensual[1].toFixed(2));

    amortizacionMensual[1] = parseFloat(amortizacionMensual[1].toFixed(2));




    saldoMensual[1] = parseFloat(saldoMensual[1].toFixed(2));

    for (let i = 1; i < flujoTotalMensual.length; i++) {
      
      flujoTotalMensual[i] = parseFloat(flujoTotalMensual[i].toFixed(2));

    }

    console.log('Flujo Total Mensual:', flujoTotalMensual);
    console.log('Cuota Mensual:', cuotaMensual);
    console.log('Interes Mensual:', interesMensual);
    console.log('Seguro Desgravamen Mensual:', seguroDesMensual);
    console.log('Amortizacion Mensual:', amortizacionMensual);
    console.log('Saldo Mensual:', saldoMensual);


    
  
    for (let i = 2; i < saldoMensual.length; i++) {

      interesMensual[i] = parseFloat(interesMensual[i].toFixed(2));
      seguroDesMensual[i] = parseFloat(seguroDesMensual[i].toFixed(2));
      amortizacionMensual[i] = parseFloat(amortizacionMensual[i].toFixed(2));
      saldoMensual[i] = parseFloat(saldoMensual[i].toFixed(2));
    }

    for(let i=1;i<parseInt(this.periodoTotal);i++){
      cuotaMensual[i+1]=parseFloat(cuotaMensual[i+1].toFixed(2));
    }


    ViewCronogramaComponent.saldo1Global=(saldoMensual[1]).toString();
    ViewCronogramaComponent.saldo12Global=(saldoMensual[12]).toString();

    console.log('Saldo 1:',  ViewCronogramaComponent.saldo1Global);
    console.log('Saldo 12:',  ViewCronogramaComponent.saldo12Global);
    ViewCronogramaComponent.montoPagadoGlobal=(parseFloat(ViewCronogramaComponent.saldo1Global)-parseFloat(ViewCronogramaComponent.saldo12Global)).toString();
    console.log('Cuota Pagada:',  ViewCronogramaComponent.montoPagadoGlobal);



    ViewCronogramaComponent.cuotaMensualGlobal = cuotaMensual[20].toFixed(2);
    ViewCronogramaComponent.flujoMensualGlobal = (flujoTotalMensual[20]).toFixed(2);



    if (parseInt(this.periodoPago) == 36) {
      interesMensual[37] = 0;
      seguroDesMensual[37] = 0;
      amortizacionMensual[37] = 0;
      saldoMensual[37] = 0;
      cuotaMensual[37] = 0;

    } else {

      interesMensual[25] = 0;
      seguroDesMensual[25] = 0;
      amortizacionMensual[25] = 0;
      saldoMensual[25] = 0;
      cuotaMensual[25] = 0;
    }
    const partesFecha: string[] = this.fechaDesembolso.split('-');
    const dia: number = parseInt(partesFecha[2], 10);  // Extrae el día como un número
    ViewCronogramaComponent.diaPagoGlobal = dia.toString();

    console.log('Fecha Desembolso:', this.fechaDesembolso);
    console.log('Moneda:', this.tipoMoneda);
    console.log('Dia Pago:', ViewCronogramaComponent.diaPagoGlobal);
    console.log('Valor Vehiculo:', this.valorVehiculo);
    console.log('Tasa Efectiva Anual:', this.tasaEfectivaAnual);
    console.log('Periodo Pago:', this.periodoPago);
    console.log('Seguro Desgravamen:', this.seguroDesgravamen);
    console.log('Cuota Inicial:', this.cuotaInicial);
    console.log('Monto Prestamo:', this.montoPrestamo);
    console.log('Cuota Final:', this.cuotaFinal);
    console.log('Cuotas al Año:', this.cuotasAño);
    console.log('Cuota Mensual:', ViewCronogramaComponent.cuotaMensualGlobal);

    console.log('COK:', this.tasaDescuento);
    console.log('VAN:', ViewCronogramaComponent.vanGlobal);
    console.log('TIR:', ViewCronogramaComponent.tirGlobal);
    
    ViewCronogramaComponent.tceaGlobal = ((((Math.pow(1+(parseFloat(ViewCronogramaComponent.tirGlobal)/100),12))-1)*100).toFixed(2)).toString();
    ViewCronogramaComponent.seguroVehicularGlobal = (seguroVehiMensual[5].toString()); 
    //this.quedarseConElAuto();
/*
    const requestPayload: any = {
      userId:this.authService.getUser()?.id,
    fechaDesembolso: this.fechaDesembolso,
    moneda: this.tipoMoneda,
    diaPago: ViewCronogramaComponent.diaPagoGlobal,
    valorVehiculo: this.valorVehiculo,
    tasaEfectivaAnual: this.tasaEfectivaAnual,
    periodoPago: this.periodoPago,
    tasaDesgravamen: this.seguroDesgravamen,
    cuotaInicial: this.cuotaInicial,
    montoPrestamo: this.montoPrestamo,
    cuotaFinal: this.cuotaFinal,
    cuotasAnio: this.cuotasAño,
    cuotaMensual: ViewCronogramaComponent.cuotaMensualGlobal,
    cok:  this.tasaDescuento,
    van: ViewCronogramaComponent.vanGlobal,
    tir: ViewCronogramaComponent.tirGlobal,
    gastoNotarial:this.gatosNotariales,
    gastoRegistral:this.gastosRegistrales,
    comisionEstudio:this.comisionEstudio,
    porte:this.portes,
    gastoAdministracion:this.gastosAdministracion,
    periodoTotal:this.periodoTotal,
    periodoParcial:this.periodoParcial,
    flujoMensual:ViewCronogramaComponent.flujoMensualGlobal,
    tasaSeguroVehicular:this.seguroVehicularAnual,
    seguroVehicular: (seguroVehiMensual[5].toString()),
    tcea:ViewCronogramaComponent.tceaGlobal
    };

    this.vehicleCreditService.createVehicleCredit(requestPayload).subscribe(
      (response) => {
        console.log('Producto guardado en la base de datos:', response);
      }
    );*/

    let suma: number = 0;
    //saldoMensual[37]=parseFloat(cero).toFixed(2);
    for (let i = 1; i < amortizacionMensual.length - 1; i++) {
      suma += (amortizacionMensual[i]);

    }

    const aux = (amortizacionMensual[2]) + parseFloat(estadoCuentaMensual[1]) +
      (seguroVehiMensual[1]) + (interesMensual[2])
      + (seguroDesMensual[2]);
    const amortizacionMensualData = amortizacionMensual.map((amortizacion, index) => ({
      amortizacionMensual: amortizacion,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));
    const cuotaMensualData = cuotaMensual.map((cuota, index) => ({
      cuotaMensual: cuota,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));


    const estadoCuentaMensualData = estadoCuentaMensual.map((estado, index) => ({
      estadoCuenta: estado,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));


    const seguroVehicularData = seguroVehiMensual.map((seguro, index) => ({
      seguroVehicular: seguro,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));

    const seguroDesgravamenData = seguroDesMensual.map((seguro, index) => ({
      seguroDesgravamen: seguro,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));

    const interesMensualData = interesMensual.map((interes, index) => ({
      interesMensual: interes,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));
    const saldoMensualData = saldoMensual.map((saldo, index) => ({
      saldoMensual: saldo,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));

    const portesMensualData = portesMensual.map((portes, index) => ({
      portesMensual: portes,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));

    const gastosAdministracionMensualData = gastosAdministracionMensual.map((gastos, index) => ({
      gastosAdministracionMensual: gastos,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
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
      name: '',
      empresa: '',
    }));
    const flutoTotalMensualData = flujoTotalMensual.map((flujo, index) => ({
      flutoTotalMensual: flujo,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));
    // Combina todas las nuevas variables con fechasPagoData
    const combinedData = seguroDesgravamenData.map((seguroDesMensualItem, index) => ({
      ...seguroDesMensualItem,
      ...flutoTotalMensualData[index],
      ...gastosAdministracionMensualData[index],
      ...portesMensualData[index],
      ...interesMensualData[index],
      ...saldoMensualData[index],
      ...seguroVehicularData[index],
      ...amortizacionMensualData[index],
      ...cuotaMensualData[index],
      ...estadoCuentaMensualData[index],
      ...fechasPagoData[index],
    }));

    // Asignar combinedData a dataSource
    this.dataSource.data = combinedData;







    // Asignar combinedData a dataSource
    this.dataSource.data = combinedData;



    console.log('Cuota Total:', cuotaTotal);
    console.log(fechasPago.length);
    console.log(fechasPago);
    console.log(this.data)
    console.log('Cuota Mensual No. 2:', aux);
    console.log('Suma: ', suma);

  }



















  //SIN PERIODOS DE GRACIA

  getCalculos(): void {

    ViewCronogramaComponent.cuotonGlobal = this.cuotaFinal;

    this.montoPrestamo=(parseFloat(this.montoPrestamo)+parseFloat(this.gastosNotariales)
    +parseFloat(this.gastosRegistrales)+parseFloat(this.comisionEstudio)).toString();

    //=+(1+9%)^(1/12)-1
    const tasaInteresMensual: number = (Math.pow(1 + ((parseFloat(this.tasaEfectivaAnual) / 100)), 1 / 12)) - 1;
    console.log('Tasa Interes Mensual112:', tasaInteresMensual);
    const tasaSeguroDesgraMensual: number = (parseFloat(this.seguroDesgravamen) / 100);


    const tasaSeguroVehiMensual: number = (parseFloat(this.seguroVehicularAnual) / 100) / 12;
    console.log('Tasa Vehicular Mensual112:', tasaSeguroVehiMensual);

    const sumaTasasMensuales: number = tasaInteresMensual + tasaSeguroDesgraMensual;

    //=+(1440180*(C181+C182))/(1-(1+(C181+C182))^-8)
    let cuotaTotal: number = ((parseFloat(this.montoPrestamo) * (sumaTasasMensuales)) / (1 - (Math.pow(1 + sumaTasasMensuales, -(parseInt(this.periodoPago))))));
    //cuotaTotal = parseFloat(cuotaTotal.toFixed(2));
    /*
        const cuotaTotal: number = ((parseInt(this.montoPrestamo) *( iTasa+(parseFloat(this.seguroDesgravamen) / 100)))
         / (1 - (Math.pow(1 + iTasa+(parseFloat(this.seguroDesgravamen) / 100), 
         -(parseInt(this.periodoPago))))))+Svm;
        */

    const cero: string = '0';

    //ESTADO DE CUENTA MENSUAL FISICO
    const estadoCuentaMensual: string[] = new Array(parseInt(this.periodoPago) + 2);
    estadoCuentaMensual[0] = parseFloat(cero).toFixed(2);
    const diez: string = '10';

    //SEGURO VEHICULAR MENSUAL
    const seguroVehiMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    seguroVehiMensual[0] = 0;
    const auxSeguroVehi = parseInt(this.valorVehiculo) * tasaSeguroVehiMensual;
    console.log('Auxiliar Seguro Vehicular12122:', auxSeguroVehi);
    //CUOTA MENSUAL
    const cuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    cuotaMensual[0] = 0;

    const portesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    portesMensual[0]=0;

    const gastosAdministracionMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    gastosAdministracionMensual[0]=0;

    for (let i = 1; i < portesMensual.length; i++) {
      gastosAdministracionMensual[i] = parseInt(this.gastosAdministracion);


      portesMensual[i] = parseInt(this.portes);
    }

    if(this.periodoPago==='36'){
      gastosAdministracionMensual[37]=0;

      portesMensual[37]=0;
    }else if (this.periodoPago==='24'){
      gastosAdministracionMensual[25]=0;

      portesMensual[25]=0;
    }


   

    const flujoTotalMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    flujoTotalMensual[0]=parseInt(this.montoPrestamo);
    for (let i = 1; i < flujoTotalMensual.length; i++) {
      flujoTotalMensual[i] = (cuotaTotal+auxSeguroVehi+parseInt(this.portes)+parseInt(this.gastosAdministracion));
    }
    if(this.periodoPago==='36'){
      flujoTotalMensual[37]=0;

    }else if (this.periodoPago==='24'){
      flujoTotalMensual[25]=0;

    }



    for (let i = 1; i < cuotaMensual.length; i++) {
      if (parseInt(this.periodoPago) == 36) {
        if (i == 37) {
          cuotaMensual[i] = parseFloat(this.cuotaFinal);
        } else {
          cuotaMensual[i] = cuotaTotal;
        }
      } else if (parseInt(this.periodoPago) == 24) {
        if (i == 25) {
          cuotaMensual[i] = parseFloat(this.cuotaFinal);
        } else {
          cuotaMensual[i] = cuotaTotal;
        }
      }
      seguroVehiMensual[i] = auxSeguroVehi;
      estadoCuentaMensual[i] = parseFloat(diez).toFixed(2);
    }

    let ceroAux: string = '0.00';
    const ceroAux2 = parseFloat(ceroAux);

    //INTERES MENSUAL    
    const interesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    interesMensual[0] = 0;
    //interesMensual[1] = Im1.toFixed(2);
    interesMensual[1] = (parseFloat(this.montoPrestamo) * tasaInteresMensual);


    //SEGURO DESGRAVAMEN MENSUAL
    const seguroDesMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    seguroDesMensual[0] = 0;
    //seguroDesMensual[1] = Sd.toFixed(2);
    seguroDesMensual[1] = (parseFloat(this.montoPrestamo) * tasaSeguroDesgraMensual);

    //AMORTIZACION MENSUAL
    const amortizacionMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    amortizacionMensual[0] = 0;
    //amortizacionMensual[1] = amortizacion.toFixed(2);
    amortizacionMensual[1] = (cuotaTotal - (interesMensual[1]) - (seguroDesMensual[1]));




    //SALDO MENSUAL
    const saldoMensual: number[] = new Array(parseInt(this.periodoPago) + 2);
    saldoMensual[0] = parseFloat(this.montoPrestamo);

    saldoMensual[1] = (parseFloat(this.montoPrestamo) - (amortizacionMensual[1]));





    //console.log((parseFloat(saldoMensual[1]) * iTasa).toFixed(2));

    for (let i = 2; i < saldoMensual.length; i++) {

      interesMensual[i] = ((saldoMensual[i - 1]) * tasaInteresMensual);
      seguroDesMensual[i] = ((saldoMensual[i - 1]) * tasaSeguroDesgraMensual);
      //amortizacionMensual[i] = (parseFloat(saldoMensual[i-1])).toFixed(2);

      amortizacionMensual[i] = (cuotaTotal - (interesMensual[i]) - (seguroDesMensual[i]));
      saldoMensual[i] = ((saldoMensual[i - 1]) - (amortizacionMensual[i]));


    }
    let sumaVAN: number = 0;
    let finance = new Finance();

    //CACULO DE LA VAN
    if (parseInt(this.periodoPago) == 36) {
      const auxcuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 1);
      //auxcuotaMensual[0]=(parseInt(this.montoPrestamo));

      for (let i = 1; i < cuotaMensual.length - 2; i++) {
        auxcuotaMensual[i - 1] = (cuotaMensual[i] * 1);
      }
      auxcuotaMensual[35] = auxcuotaMensual[1];

      auxcuotaMensual[36] = (parseInt(this.cuotaFinal) * 1);
      console.log(auxcuotaMensual);
      const auxTasaDescuento = (Math.pow(1 + (parseFloat(this.tasaDescuento) / 100), (1 / 12))) - 1;
      console.log(auxTasaDescuento);


      for (let i = 0; i < auxcuotaMensual.length; i++) {
        auxcuotaMensual[i] = parseFloat(auxcuotaMensual[i].toFixed(2));
      }

      const auxflujoMensual: number[] = new Array(parseInt(this.periodoPago));
      for (let i = 0; i < auxflujoMensual.length; i++) {
        auxflujoMensual[i] = flujoTotalMensual[1];
      }

      flujoTotalMensual[37]=parseInt(this.cuotaFinal);
      console.log('Flujo Mensual asdasdasaSDASD',flujoTotalMensual);

      const auxNuevoArrayFlujo = flujoTotalMensual.slice(1);


/*
      const auxflujoMensual2: number[] = new Array(parseInt(this.periodoPago));
      for (let i = 0; i < auxflujoMensual2.length; i++) {
        auxflujoMensual2[i] = (flujoTotalMensual[1]*-1);
      }*/

      //const auxVAN: number = finance.NPV(auxTasaDescuento,parseInt(this.montoPrestamo)*1,...auxflujoMensual2);

      for (let i = 0; i < auxNuevoArrayFlujo.length; i++) {
        sumaVAN += (auxNuevoArrayFlujo[i] / (Math.pow(1 + auxTasaDescuento, i +1)));
      }
      //sumaVAN += (parseInt(this.cuotaFinal)/(Math.pow(1+auxTasaDescuento,37)));

      sumaVAN *= -1;

      sumaVAN = sumaVAN + (parseInt(this.montoPrestamo));
      console.log(`sumaVAN: `, sumaVAN);

      //sumaVAN=auxVAN;
      ViewCronogramaComponent.vanGlobal = sumaVAN.toFixed(2);

      

      const auxTIR: number = finance.IRR((parseInt(this.montoPrestamo) * -1), ...auxNuevoArrayFlujo);
      console.log(`sumaTIR: `, auxTIR);
      ViewCronogramaComponent.tirGlobal = auxTIR.toFixed(2);

      for (let i = 1; i < flujoTotalMensual.length; i++) {
        flujoTotalMensual[i] = parseFloat((flujoTotalMensual[i]*-1).toFixed(2));
      }

    } else {
      const auxcuotaMensual: number[] = new Array(parseInt(this.periodoPago) + 1);
      //auxcuotaMensual[0]=(parseInt(this.montoPrestamo));

      for (let i = 1; i < cuotaMensual.length - 2; i++) {
        auxcuotaMensual[i - 1] = (cuotaMensual[i] * 1);
      }
      auxcuotaMensual[23] = auxcuotaMensual[1];

      auxcuotaMensual[24] = (parseInt(this.cuotaFinal) * 1);
      console.log(auxcuotaMensual);
      const auxTasaDescuento = (Math.pow(1 + (parseFloat(this.tasaDescuento) / 100), (1 / 12))) - 1;
      console.log(auxTasaDescuento);


      for (let i = 0; i < auxcuotaMensual.length; i++) {
        auxcuotaMensual[i] = parseFloat(auxcuotaMensual[i].toFixed(2));
      }
      console.log(auxcuotaMensual);




      const auxflujoMensual: number[] = new Array(parseInt(this.periodoPago));
      for (let i = 0; i < auxflujoMensual.length; i++) {
        auxflujoMensual[i] = flujoTotalMensual[1];
      }
/*
      const auxflujoMensual2: number[] = new Array(parseInt(this.periodoPago));
      for (let i = 0; i < auxflujoMensual2.length; i++) {
        auxflujoMensual2[i] = (flujoTotalMensual[1]*-1);
      }*/
      flujoTotalMensual[25]=parseInt(this.cuotaFinal);
      console.log('Flujo Mensual asdasdasaSDASD',flujoTotalMensual);

      const auxNuevoArrayFlujo = flujoTotalMensual.slice(1);
      //const auxVAN: number = finance.NPV(auxTasaDescuento,parseInt(this.montoPrestamo)*1,...auxflujoMensual2);

      for (let i = 0; i < auxNuevoArrayFlujo.length; i++) {
        sumaVAN += (auxNuevoArrayFlujo[i] / (Math.pow(1 + auxTasaDescuento, i +1)));
      }
      //sumaVAN += (parseInt(this.cuotaFinal)/(Math.pow(1+auxTasaDescuento,37)));

      sumaVAN *= -1;

      sumaVAN = sumaVAN + (parseInt(this.montoPrestamo));
      console.log(`sumaVAN: `, sumaVAN);

      //sumaVAN=auxVAN;
      ViewCronogramaComponent.vanGlobal = sumaVAN.toFixed(2);

      

      const auxTIR: number = finance.IRR((parseInt(this.montoPrestamo) * -1), ...auxNuevoArrayFlujo);
      console.log(`sumaTIR: `, auxTIR);
      ViewCronogramaComponent.tirGlobal = auxTIR.toFixed(2);

      for (let i = 1; i < flujoTotalMensual.length; i++) {
        flujoTotalMensual[i] = parseFloat((flujoTotalMensual[i]*-1).toFixed(2));
      }


    }

    if(this.periodoPago==='36'){
      seguroVehiMensual[37]=0;
    }else if(this.periodoPago==='24'){
      seguroVehiMensual[25]=0;
    }


    //////////////////////////
    cuotaTotal = parseFloat(cuotaTotal.toFixed(2));

    for (let i = 1; i < cuotaMensual.length; i++) {
      if (parseInt(this.periodoPago) == 36) {
        if (i == 37) {
          cuotaMensual[i] = parseFloat(this.cuotaFinal);
        } else {
          cuotaMensual[i] = cuotaTotal;
        }
      } else if (parseInt(this.periodoPago) == 24) {
        if (i == 25) {
          cuotaMensual[i] = parseFloat(this.cuotaFinal);
        } else {
          cuotaMensual[i] = cuotaTotal;
        }
      }
      seguroVehiMensual[i] = parseFloat(seguroVehiMensual[i].toFixed(2));

    }


    interesMensual[1] = parseFloat(interesMensual[1].toFixed(2));


    seguroDesMensual[1] = parseFloat(seguroDesMensual[1].toFixed(2));

    amortizacionMensual[1] = parseFloat(amortizacionMensual[1].toFixed(2));




    saldoMensual[1] = parseFloat(saldoMensual[1].toFixed(2));

    for (let i = 1; i < flujoTotalMensual.length; i++) {
      
      flujoTotalMensual[i] = parseFloat(flujoTotalMensual[i].toFixed(2));

    }


    for (let i = 2; i < saldoMensual.length; i++) {

      interesMensual[i] = parseFloat(interesMensual[i].toFixed(2));
      seguroDesMensual[i] = parseFloat(seguroDesMensual[i].toFixed(2));
      amortizacionMensual[i] = parseFloat(amortizacionMensual[i].toFixed(2));
      saldoMensual[i] = parseFloat(saldoMensual[i].toFixed(2));
    }


    ViewCronogramaComponent.saldo1Global=(saldoMensual[1]).toString();
    ViewCronogramaComponent.saldo12Global=(saldoMensual[12]).toString();

    console.log('Saldo 1:',  ViewCronogramaComponent.saldo1Global);
    console.log('Saldo 12:',  ViewCronogramaComponent.saldo12Global);
    ViewCronogramaComponent.montoPagadoGlobal=(parseFloat(ViewCronogramaComponent.saldo1Global)-parseFloat(ViewCronogramaComponent.saldo12Global)).toString();
    console.log('Cuota Pagada:',  ViewCronogramaComponent.montoPagadoGlobal);





    ViewCronogramaComponent.cuotaMensualGlobal = cuotaMensual[20].toFixed(2);
    ViewCronogramaComponent.flujoMensualGlobal = (flujoTotalMensual[20]).toFixed(2);


    if (parseInt(this.periodoPago) == 36) {
      interesMensual[37] = 0;
      seguroDesMensual[37] = 0;
      amortizacionMensual[37] = 0;
      saldoMensual[37] = 0;
      cuotaMensual[37] = 0;

    } else {

      interesMensual[25] = 0;
      seguroDesMensual[25] = 0;
      amortizacionMensual[25] = 0;
      saldoMensual[25] = 0;
      cuotaMensual[25] = 0;
    }

    const partesFecha: string[] = this.fechaDesembolso.split('-');
    const dia: number = parseInt(partesFecha[2], 10);  // Extrae el día como un número
    ViewCronogramaComponent.diaPagoGlobal = dia.toString();

    console.log('Fecha Desembolso:', this.fechaDesembolso);
    console.log('Moneda:', this.tipoMoneda);
    console.log('Dia Pago:', ViewCronogramaComponent.diaPagoGlobal);
    console.log('Valor Vehiculo:', this.valorVehiculo);
    console.log('Tasa Efectiva Anual:', this.tasaEfectivaAnual);
    console.log('Periodo Pago:', this.periodoPago);
    console.log('Seguro Desgravamen:', this.seguroDesgravamen);
    console.log('Cuota Inicial:', this.cuotaInicial);
    console.log('Monto Prestamo:', this.montoPrestamo);
    console.log('Cuota Final:', this.cuotaFinal);
    console.log('Cuotas al Año:', this.cuotasAño);
    console.log('Cuota Mensual:', ViewCronogramaComponent.cuotaMensualGlobal);

    console.log('COK:', this.tasaDescuento);
    console.log('VAN:', ViewCronogramaComponent.vanGlobal);
    console.log('TIR:', ViewCronogramaComponent.tirGlobal);
    
    ViewCronogramaComponent.tceaGlobal = ((((Math.pow(1+(parseFloat(ViewCronogramaComponent.tirGlobal)/100),12))-1)*100).toFixed(2)).toString();
    ViewCronogramaComponent.seguroVehicularGlobal = (seguroVehiMensual[5].toString()); 
    //this.quedarseConElAuto();
/*
    const requestPayload: any = {
      userId:this.authService.getUser()?.id,
    fechaDesembolso: this.fechaDesembolso,
    moneda: this.tipoMoneda,
    diaPago: ViewCronogramaComponent.diaPagoGlobal,
    valorVehiculo: this.valorVehiculo,
    tasaEfectivaAnual: this.tasaEfectivaAnual,
    periodoPago: this.periodoPago,
    tasaDesgravamen: this.seguroDesgravamen,
    cuotaInicial: this.cuotaInicial,
    montoPrestamo: this.montoPrestamo,
    cuotaFinal: this.cuotaFinal,
    cuotasAnio: this.cuotasAño,
    cuotaMensual: ViewCronogramaComponent.cuotaMensualGlobal,
    cok:  this.tasaDescuento,
    van: ViewCronogramaComponent.vanGlobal,
    tir: ViewCronogramaComponent.tirGlobal,
    gastoNotarial:this.gatosNotariales,
    gastoRegistral:this.gastosRegistrales,
    comisionEstudio:this.comisionEstudio,
    porte:this.portes,
    gastoAdministracion:this.gastosAdministracion,
    periodoTotal:this.periodoTotal,
    periodoParcial:this.periodoParcial,
    flujoMensual:ViewCronogramaComponent.flujoMensualGlobal,
    tasaSeguroVehicular:this.seguroVehicularAnual,
    seguroVehicular: (seguroVehiMensual[5].toString()),
    tcea:ViewCronogramaComponent.tceaGlobal
    };

    this.vehicleCreditService.createVehicleCredit(requestPayload).subscribe(
      (response) => {
        console.log('Producto guardado en la base de datos:', response);
      }
    );*/

    let suma: number = 0;
    //saldoMensual[37]=parseFloat(cero).toFixed(2);
    for (let i = 1; i < amortizacionMensual.length - 1; i++) {
      suma += (amortizacionMensual[i]);

    }

    const aux = (amortizacionMensual[2]) + parseFloat(estadoCuentaMensual[1]) +
      (seguroVehiMensual[1]) + (interesMensual[2])
      + (seguroDesMensual[2]);
    const amortizacionMensualData = amortizacionMensual.map((amortizacion, index) => ({
      amortizacionMensual: amortizacion,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));
    const cuotaMensualData = cuotaMensual.map((cuota, index) => ({
      cuotaMensual: cuota,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));


    const estadoCuentaMensualData = estadoCuentaMensual.map((estado, index) => ({
      estadoCuenta: estado,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));


    const seguroVehicularData = seguroVehiMensual.map((seguro, index) => ({
      seguroVehicular: seguro,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));

    const seguroDesgravamenData = seguroDesMensual.map((seguro, index) => ({
      seguroDesgravamen: seguro,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));

    const interesMensualData = interesMensual.map((interes, index) => ({
      interesMensual: interes,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));
    const saldoMensualData = saldoMensual.map((saldo, index) => ({
      saldoMensual: saldo,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));

    const portesMensualData = portesMensual.map((portes, index) => ({
      portesMensual: portes,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));

    const gastosAdministracionMensualData = gastosAdministracionMensual.map((gastos, index) => ({
      gastosAdministracionMensual: gastos,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
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
      name: '',
      empresa: '',
    }));
    const flutoTotalMensualData = flujoTotalMensual.map((flujo, index) => ({
      flutoTotalMensual: flujo,
      fechaPago: '',
      position: index,
      name: '',
      empresa: '',
    }));
    // Combina todas las nuevas variables con fechasPagoData
    const combinedData = seguroDesgravamenData.map((seguroDesMensualItem, index) => ({
      ...seguroDesMensualItem,
      ...flutoTotalMensualData[index],
      ...gastosAdministracionMensualData[index],
      ...portesMensualData[index],
      ...interesMensualData[index],
      ...saldoMensualData[index],
      ...seguroVehicularData[index],
      ...amortizacionMensualData[index],
      ...cuotaMensualData[index],
      ...estadoCuentaMensualData[index],
      ...fechasPagoData[index],
    }));

    // Asignar combinedData a dataSource
    this.dataSource.data = combinedData;







    // Asignar combinedData a dataSource
    this.dataSource.data = combinedData;



    console.log('Cuota Total:', cuotaTotal);
    console.log(fechasPago.length);
    console.log(fechasPago);
    console.log(this.data)
    console.log('Cuota Mensual No. 2:', aux);
    console.log('Suma: ', suma);

  }


}
