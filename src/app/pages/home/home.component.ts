import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Importar esto
import { EventService } from '../../services/event.service';
import { EventCardComponent } from '../../components/event-card/event-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, EventCardComponent], // <-- Agregar FormsModule aquí
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  filtros = {
    location: '',
    date: '',
  };

  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.eventService.getEvents(this.filtros).subscribe((res: any[]) => {
      this.events = res;
    });
  }

  aplicarFiltros(): void {
    this.cargarEventos();
  }
}
