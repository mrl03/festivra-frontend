import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = {
    email: '',
    password: '',
  };

  error: string | null = null;
  formErrors = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  validateForm(): boolean {
    let isValid = true;
    this.formErrors = {
      email: '',
      password: ''
    };

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
    }

    return isValid;
  }

  submit() {
    if (!this.validateForm()) return;

    this.authService.login(this.form).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        const decoded = this.authService.decodeToken();

        if (decoded?.roles?.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/panel']);
        } else if (decoded?.roles?.includes('ROLE_AGENT')) {
          this.router.navigate(['/agent/panel']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.error = 'Correo electrónico o contraseña incorrectos';
        } else if (err.status === 0) {
          this.error = 'No se pudo conectar con el servidor. Por favor, intente más tarde';
        } else {
          this.error = 'Ha ocurrido un error. Por favor, intente más tarde';
        }
      },
    });
  }
}
