import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private publicUrl = 'http://localhost:8080/public/events';
  private adminUrl = 'http://localhost:8080/admin/events';
  private agentUrl = 'http://localhost:8080/agent/events';

  constructor(private http: HttpClient) {}

  getEvents(filters?: { location?: string; date?: string }): Observable<any[]> {
    let params = new HttpParams();
    if (filters?.location) params = params.set('location', filters.location);
    if (filters?.date) params = params.set('date', filters.date);

    return this.http.get<any[]>(this.publicUrl, { params });
  }
  getAllAdminEvents(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/admin/events');
  }
  getEventById(id: number): Observable<any> {
    return this.http.get(`${this.publicUrl}/${id}`);
  }

  // ADMIN: Create a new event
  createEvent(eventData: any): Observable<any> {
    return this.http.post(this.adminUrl, eventData);
  }

  // ADMIN: Update an event
  updateEvent(id: number, eventData: any): Observable<any> {
    return this.http.put(`${this.adminUrl}/${id}`, eventData);
  }

  // ADMIN: Delete an event
  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.adminUrl}/${id}`);
  }

  getEventsForAgent(): Observable<Event[]> {
    return this.http.get<any[]>('http://localhost:8080/agent/events');
  }

  createEventAsAgent(event: any): Observable<any> {
    return this.http.post(this.agentUrl, event);
  }

  updateEventAsAgent(id: number, event: any): Observable<any> {
    return this.http.put(`${this.agentUrl}/${id}`, event);
  }

  deleteEventAsAgent(id: number): Observable<any> {
    return this.http.delete(`${this.agentUrl}/${id}`);
  }
}
