import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form = {
    fullName: '',
    email: '',
    password: '',
  };

  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.authService.register(this.form).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.error = err.error?.error || 'Error inesperado';
      },
    });
  }
}
