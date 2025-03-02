import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = `${environment.apiUrl}/reservations`;

  constructor(private http: HttpClient) {}

  // Méthode pour créer une réservation
  createReservation(reservationData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservationData);
  }
}
