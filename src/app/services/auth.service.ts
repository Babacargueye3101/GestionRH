import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, {
      email,
      password
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  register(email: string, password: string, passwordConfirmation: string, nom: string, compagnyId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, {
      email,
      password,
      password_confirmation: passwordConfirmation,
      name: nom,
      compagny_id: compagnyId
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/auth/logout`);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private getToken(): string | null {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).token : null;
  }
}