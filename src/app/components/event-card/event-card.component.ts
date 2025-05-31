import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ReservationService } from '../../services/reservation.service';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

declare var bootstrap: any;

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './event-card.component.html',
})
export class EventCardComponent {
  @Input() event: any;

  reservationMessage: string = '';
  reservationSuccess: boolean = false;

  constructor(
    public auth: AuthService,
    private reservationService: ReservationService,
    public router: Router
  ) {}

  // Previene la navegación cuando se hace clic en el botón de reservar
  reserveEvent(eventClick: MouseEvent): void {
    eventClick.stopPropagation();

    if (!this.auth.isAuthenticated()) {
      localStorage.setItem('redirectUrl', this.router.url);
      this.router.navigate(['/login']);
      return;
    }

    this.reservationService.reserve(this.event.id).subscribe({
      next: () => {
        this.reservationSuccess = true;
        this.reservationMessage = 'Reserva realizada correctamente.';
        this.showModal();
      },
      error: (err: any) => {
        this.reservationSuccess = false;
        this.reservationMessage = err.error || 'Error al reservar.';
        this.showModal();
      },
    });
  }

  showModal(): void {
    const modalEl = document.getElementById('reservationModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  goToReservations(): void {
    const modalEl = document.getElementById('reservationModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }

    this.router.navigate(['/my-reservations']);
  }
}
