import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisponibilityService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getAvailabilities(): Observable<any[]> {
    const url = `${this.apiUrl}/availabilities`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }


  getAvailabilitiesByShopAndSalon(shopId: number, salonId: number): Observable<any[]> {
    const url = `${this.apiUrl}/shops/${shopId}/salons/${salonId}/availabilities`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }

  createAvailability(salonId: number, availabilityData: any): Observable<any> {
    const url = `${this.apiUrl}/salons/${salonId}/availabilities`;
    return this.http.post(url, availabilityData,{ headers: this.getHeaders() });
  }

  // ✅ Mettre à jour une disponibilité
  updateAvailability(id: number, availabilityData: any): Observable<any> {
    const url = `${this.apiUrl}/availabilities/${id}`;
    return this.http.put(url, availabilityData, { headers: this.getHeaders() });
  }

  // ✅ Supprimer une disponibilité
  deleteAvailability(id: number): Observable<any> {
    const url = `${this.apiUrl}/availabilities/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }


  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;

    console.log(token);

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

}
