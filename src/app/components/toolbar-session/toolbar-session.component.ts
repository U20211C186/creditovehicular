import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-session',
  templateUrl: './toolbar-session.component.html',
  styleUrls: ['./toolbar-session.component.css']
})
export class ToolbarSessionComponent implements OnInit {
  //searchText: string = '';
  isMenuOpen: boolean = false; // Propiedad para controlar la apertura y cierre del menú
  isScreenSmall: boolean = false; // Propiedad para verificar si la pantalla es pequeña

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isScreenSmall = window.innerWidth <= 960;
  }
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Cambia el estado del menú al hacer clic en el botón de menú
  }

  clickFinancieras(): void {
    this.router.navigate(['/financieras']);

    /*const user = this.authService.getUser();
    const pay_id = this.authService.getOrder()?.payId;

    if(user?.lastName) {
      this.router.navigate(['/financieras']);
    } else if (user?.ruc) {
      this.router.navigate(['/close/session']);
    }*/
  }

  clickCreditoVehicular(): void {
    this.router.navigate(['/credito/vehicular']);

    /*const user = this.authService.getUser();

    if(user?.lastName) {
      this.router.navigate(['/close/session']);
    } else if (user?.ruc) {
      this.router.navigate(['/close/session']);
    }*/
  }

  clickPerfil(): void {
    const user = this.authService.getUser();
    if(user?.lastName) {
      this.router.navigate(['/close/session']);
    } else if (user?.ruc) {
      this.router.navigate(['/close/session']);
    }
  }

  clickHistorial(): void {
    this.router.navigate(['/view/historial']);

    /*
    const user = this.authService.getUser();

    if(user?.lastName) {
      this.router.navigate(['/close/session']);
    } else if (user?.ruc) {
      this.router.navigate(['/close/session']);
    }*/
  }

  clickShoppingCart(): void {
    const user = this.authService.getUser();

    if(user?.lastName) {
      this.router.navigate(['/close/session']);
    } else if (user?.ruc) {
      this.router.navigate(['/close/session']);
    }
  }

  clickCerrarSesion(): void {
    this.router.navigate(['/close/session']);


    /*
    const user = this.authService.getUser();

    if(user?.lastName) {
      this.router.navigate(['/close/session']);
    } else if (user?.ruc) {
      this.router.navigate(['/close/session']);
    }*/
  }

  clickPaginaInicio(): void {
    //this.authService.logout();
    this.router.navigate(['/financieras']);
    
  }
}