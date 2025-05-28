import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/admin/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteUser(userId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${userId}`, {
      responseType: 'text',
    });
  }
  promoteToAgent(userId: number): Observable<string> {
    return this.http.put(
      `${this.apiUrl}/${userId}/role?role=AGENT`,
      {},
      {
        responseType: 'text',
      }
    );
  }
}
