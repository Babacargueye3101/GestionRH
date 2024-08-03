import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/sign_in`, { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  register(email: string, password: string, passwordConfirmation: string, nom: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, { user: { email, password, password_confirmation: passwordConfirmation, name: nom } }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }


  logout(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/sign_out`);
  }
}
