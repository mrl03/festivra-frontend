import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = {
    email: '',
    password: '',
  };

  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  submit() {
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
        this.error = err.error?.message || 'Invalid email or password.';
      },
    });
  }
}
