import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form = {
    fullName: '',
    email: '',
    password: '',
  };

  error: string | null = null;
  formErrors = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  validateForm(): boolean {
    let isValid = true;
    this.formErrors = {
      fullName: '',
      email: '',
      password: ''
    };

    if (!this.form.fullName) {
      this.formErrors.fullName = 'El nombre completo es requerido';
      isValid = false;
    }

    if (!this.form.email) {
      this.formErrors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
      this.formErrors.email = 'Por favor, ingrese un correo electrónico válido';
      isValid = false;
    }

    if (!this.form.password) {
      this.formErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (this.form.password.length < 6) {
      this.formErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    return isValid;
  }

  submit() {
    if (!this.validateForm()) return;

    this.authService.register(this.form).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        const redirectUrl = localStorage.getItem('redirectUrl') || '/';
        this.router.navigate([redirectUrl]);
        localStorage.removeItem('redirectUrl');
      },
      error: (err: any) => {
        if (err.error?.error === 'Email already in use.') {
          this.error = 'Este correo electrónico ya está registrado';
        } else if (err.status === 0) {
          this.error = 'No se pudo conectar con el servidor. Por favor, intente más tarde';
        } else {
          this.error = 'Ha ocurrido un error durante el registro. Por favor, intente más tarde';
        }
      },
    });
  }
}
