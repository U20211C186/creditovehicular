import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-session',
  templateUrl: './login-session.component.html',
  styleUrls: ['./login-session.component.css']
})
export class LoginSessionComponent {

  hide = true;
  validateForm!:FormGroup;

  constructor (
    private userService: UserService, 
    private router: Router, 
    private authService: AuthService, 
    
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.validateForm=this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  login() {
    const emailValue = this.validateForm.get('email')?.value;
    const passwordValue = this.validateForm.get('password')?.value;
  
    if (!this.validateForm.get('email')?.value || !this.validateForm.get('password')?.value) {
      // Al menos uno de los campos es inválido, mostrar mensajes de error
      this.validateForm.get('email')?.markAsTouched();
      this.validateForm.get('password')?.markAsTouched();
      return;
    }

    this.userService.getUserByEmailAndPassword(emailValue, passwordValue).subscribe(
      (user: any) => {
        if (user) {
          this.authService.setUser(user);
          this.authService.getUser();
          this.router.navigate(['/financieras']);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      error => {
        console.log("Ocurrió un error al obtener los usuarios");
        console.log(error);
      }
    );
  }
}