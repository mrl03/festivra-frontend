import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanelComponent implements OnInit {
  form: any = {};
  events: any[] = [];
  users: any[] = [];
  reservations: any[] = [];

  constructor(
    private http: HttpClient,
    private eventService: EventService,
    private userService: UserService,
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadUsers();
    this.loadReservations();
  }

  loadEvents(): void {
    this.eventService.getAllAdminEvents().subscribe((res: any) => {
      this.events = [...res];
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  submit(): void {
    const eventData = { ...this.form };

    if (eventData.id) {
      this.eventService.updateEvent(eventData.id, eventData).subscribe(() => {
        this.loadEvents();
        this.form = {};
      });
    } else {
      this.eventService.createEvent(eventData).subscribe(() => {
        this.loadEvents();
        this.form = {};
      });
    }
  }

  editEvent(event: any): void {
    this.form = { ...event };
  }

  cancelEdit(): void {
    this.form = {};
  }

  deleteEvent(id: number): void {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.loadEvents();
      });
    }
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: (res) => {
        console.log('Usuario eliminado con éxito:', res);
        this.loadUsers();
        this.loadReservations();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      },
    });
  }

  getUserRoles(user: any): string {
    return user.roles.map((r: any) => r.name).join(', ');
  }

  isAgent(user: any): boolean {
    return user.roles.some((r: any) => r.name === 'ROLE_AGENT');
  }


  isAdmin(user: any): boolean {
    return user.roles.some((r: any) => r.name === 'ROLE_ADMIN');
  }

  promoteToAgent(userId: number) {
    this.userService.promoteToAgent(userId).subscribe({
      next: () => {
        alert('Usuario promovido a agente');
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error al promover:', err);
        alert('Error al promover el usuario');
      },
    });
  }
  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe((res: any) => {
      this.reservations = [...res];
    });
  }

  deleteReservation(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta reserva?')) {
      this.reservationService.deleteReservation(id).subscribe(() => {
        this.loadReservations();
      });
    }
  }
}
