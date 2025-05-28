import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './agent-panel.component.html',
})
export class AgentPanelComponent implements OnInit {
  form: any = {};
  events: any[] = [];

  constructor(
    private http: HttpClient,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEventsForAgent().subscribe((res: any) => {
      this.events = [...res];
    });
  }

  submit(): void {
    const eventData = { ...this.form };

    if (eventData.id) {
      this.eventService
        .updateEventAsAgent(eventData.id, eventData)
        .subscribe(() => {
          this.loadEvents();
          this.form = {};
        });
    } else {
      this.eventService.createEventAsAgent(eventData).subscribe(() => {
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
      this.eventService.deleteEventAsAgent(id).subscribe(() => {
        this.loadEvents();
      });
    }
  }
}
