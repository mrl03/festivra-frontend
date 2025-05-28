import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../services/reservation.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="container mt-5">
      <h2>Mis reservas</h2>
      <div class="list-group mt-3">
        <div
          class="list-group-item list-group-item-action"
          *ngFor="let r of reservations"
        >
          <h5>{{ r.event.name }}</h5>
          <p><strong>Fecha:</strong> {{ r.event.date }}</p>
          <p><strong>Ubicación:</strong> {{ r.event.location }}</p>
          <button class="btn btn-sm btn-secondary" (click)="download(r.id)">
            Descargar ticket
          </button>
        </div>
      </div>
    </div>
  `,
})
export class MyReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getMyReservations().subscribe({
      next: (res: any) => (this.reservations = res),
      error: (err: any) => alert('Error al cargar reservas'),
    });
  }

  download(id: number) {
    this.reservationService.downloadTicket(id).subscribe((blob: any) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reserva.pdf';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}
