import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Méthode pour créer une réservation
  createReservation(reservationData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/reservations", reservationData, { headers: this.getHeaders() });
  }

  getReservations(shopId: number, salonId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/shops/${shopId}/salons/${salonId}/reservations`, { headers: this.getHeaders() });
  }


  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
