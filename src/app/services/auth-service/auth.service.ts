import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseURL = environment["baseURL"]
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = "currentUser";
  private currentOrderKey = "currentOrder";

  //constructor(private http:HttpClient) { }

  constructor(private router: Router) { }

  setUser(user: any) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getUser() {
    const userJson = localStorage.getItem(this.currentUserKey);
    if(userJson){
      return JSON.parse(userJson);
    }
    return null;
  }


  logout() {
    localStorage.removeItem(this.currentUserKey); // Eliminar el usuario del localStorage
    localStorage.removeItem(this.currentOrderKey); // Eliminar el pedido del localStorage
    // Otros pasos necesarios para el logout, como redireccionar o limpiar datos adicionales
    this.router.navigate(['/login']);
  }

  /*
  register(signupDTO:any):Observable<any>{
    return this.http.post(baseURL+"/sign-up",signupDTO);
  }

  login(authenticationRequest:any):Observable<any>{
    return this.http.post(baseURL+"/authenticate",authenticationRequest);
  }
  */

}
