import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/user/reservations';

  constructor(private http: HttpClient) {}

  reserve(eventId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}`, {});
  }

  getMyReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAllReservations(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/admin/reservations');
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/admin/reservations/${id}`);
  }

  downloadTicket(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/download`, {
      responseType: 'blob',
    });
  }
}
