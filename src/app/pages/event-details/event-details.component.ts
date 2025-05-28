import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { ReservationService } from '../../services/reservation.service';

declare var bootstrap: any;

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent implements OnInit {
  event: any;
  reservationMessage: string = '';
  reservationSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    public auth: AuthService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(+id).subscribe({
        next: (res) => (this.event = res),
        error: () => {
          this.reservationSuccess = false;
          this.reservationMessage = 'Error al cargar el evento';
          this.showModal();
        },
      });
    }
  }

  reservar(): void {
    if (!this.auth.isAuthenticated()) {
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
        this.reservationMessage =
          typeof err.error === 'string'
            ? err.error
            : err.error?.message || 'Error al realizar la reserva.';
        this.showModal();
      },
    });
  }

  showModal(): void {
    const modalElement = document.getElementById('reservationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
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
