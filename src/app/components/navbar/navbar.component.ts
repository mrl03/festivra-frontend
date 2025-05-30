import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  menuOpen = false;

  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.hideNavbar();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleNavbar(): void {
    if (!this.navbarCollapse) return;

    const collapseEl = this.navbarCollapse.nativeElement;
    const bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });

    if (this.menuOpen) {
      bsCollapse.hide();
    } else {
      bsCollapse.show();
    }

    this.menuOpen = !this.menuOpen;
  }

  hideNavbar(): void {
    if (this.navbarCollapse?.nativeElement) {
      const bsCollapse = new bootstrap.Collapse(this.navbarCollapse.nativeElement, {
        toggle: false,
      });
      bsCollapse.hide();
      this.menuOpen = false;
    }
  }
}