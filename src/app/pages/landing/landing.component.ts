import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data.slice(0, 4); // mostrar solo 4 eventos
      },
      error: () => {
        alert('Error al cargar eventos');
      },
    });
  }

  verDetalles(id: number) {
    this.router.navigate(['/events', id]);
  }

  verMas() {
    this.router.navigate(['/events']);
  }
}
