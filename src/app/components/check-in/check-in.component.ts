import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent {

  constructor(private userService: UserService,
     private authService: AuthService, 
    
     private router: Router) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);


  onSubmit() {
    const emailValue = this.email.value;
    const nameValue = this.name.value;
    const lastNameValue = this.lastName.value;
    const passwordValue = this.password.value;
    const confirmPasswordValue = this.confirmPassword.value;
    
    // Validar que todos los campos estén llenos antes de continuar
    if (emailValue && nameValue && lastNameValue && passwordValue && confirmPasswordValue) {
      const user: any = {
        email: emailValue,
        lastName: lastNameValue,
        name: nameValue,
        password: passwordValue,
        repeatPassword: confirmPasswordValue,
      };

      this.userService.createUser(user).subscribe(
        (res) => {
          this.authService.setUser(res);
          this.authService.getUser();

          // Después de un registro exitoso, navega a la vista "products"
          this.router.navigate(['/financieras']);
        },
        (error) => {
          // Manejar errores si el registro falla
          console.error('Error al registrar el usuario', error);
        }
      );
    } else {
      // Muestra un mensaje de error o realiza alguna acción cuando los campos no están llenos
      console.log('Por favor, complete todos los campos.');
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'No es un correo electrónico válido' : '';
  }

  save() {
    this.onSubmit();
  }
}