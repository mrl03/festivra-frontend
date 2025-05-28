import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ReservationService } from '../services/reservation.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: any;
  reservations: any[] = [];

  constructor(
    private authService: AuthService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.user = this.authService.decodeToken();
    }

    this.reservationService.getMyReservations().subscribe({
      next: (res) => (this.reservations = res),
      error: () => alert('Error al cargar reservas'),
    });
  }

  download(id: number) {
    this.reservationService.downloadTicket(id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reserva.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
