import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public router: Router) {}

  isAdminOrAgent(): boolean {
    return (
      this.router.url.includes('/admin') || this.router.url.includes('/agent')
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  year: number = new Date().getFullYear();
}
