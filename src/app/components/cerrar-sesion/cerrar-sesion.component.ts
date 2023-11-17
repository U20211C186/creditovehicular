import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent {
   cartSession: any[] = [];
   productsSession: any[] = [];
   userData!: any;

   constructor(
      private location: Location,
      private router:Router, 
      private authService: AuthService, 
     
   ) {}

   ngOnInit(): void {
      this.userData = this.authService.getUser();
   }

   toolbarDisabled: boolean = true;
   
   public logout() {
      this.authService.logout();
      this.router.navigate(['/']);

   }
 
   cancelar() {
      this.location.back();
   }
}
