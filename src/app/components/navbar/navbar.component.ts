import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.collapseNavbar();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  collapseNavbar(): void {
    const navbar = this.navbarCollapse?.nativeElement;
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }
}
