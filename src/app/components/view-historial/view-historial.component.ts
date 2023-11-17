import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VehicleCreditService } from 'src/app/services/vehicle.credit.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-historial',
  templateUrl: './view-historial.component.html',
  styleUrls: ['./view-historial.component.css']
})
export class ViewHistorialComponent {
  
  historyData: any;
  data: any[] = [];
  //displayedColumns: string[] = ['nombre','diaPago', 'moneda', 
  //'van', 'tir', 'cuoton',  'cuota'];
  displayedColumns: string[] = ['position','nombre','diaPago', 'moneda', 'van', 'tir','tcea','cuoton','cuotaMensual','flujoMensual'];
  
  dataSource = new MatTableDataSource<any>(this.data);
  clickedRows = new Set<any>()

  constructor(
    private vehicleCreditService: VehicleCreditService,
    private authService: AuthService,
    private router: Router) {
    
    this.historyData = {};
  
  }




  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator
  vehiclesCredits: any[] = [];

  ngOnInit(): void {
    //this.getHistory();
    this.getCalculos();

    this.dataSource.paginator = this.paginator;
  }

  limpiar() {
    const user = this.authService.getUser().id;
    this.vehicleCreditService.deleteVehiclesCredits(user)
      .subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          console.log('Registro eliminado correctamente');
          // Realiza cualquier acción adicional que necesites después de eliminar el registro.
          
        },
        (error) => {
          console.error('Error al eliminar el registro', error);
          // Maneja el error si es necesario.
        }
      );
}



  getCalculos(): void {

    this.vehicleCreditService.getVehiclesCreditsByUser().subscribe(
      (data: any) => {
        this.vehiclesCredits = data.map((element:any, index:any) => ({ ...element, position: index + 1 }));
        console.log(this.vehiclesCredits);

      },
      (error) => {
        console.log(error);
      }
    );



  }
  
}
