import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  private apiUrl = `${environment.apiUrl}/api/shops`;

  constructor(private http: HttpClient) { }

  createSalon(shopId: number, salon: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${shopId}/salons`, { salon }, { headers: this.getHeaders() });
  }

  getSalons(shopId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${shopId}/salons`, { headers: this.getHeaders() });
  }

  updateSalon(shopId: number, salonId: number, salonData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${shopId}/salons/${salonId}`, salonData, { headers: this.getHeaders() });
  }

  deleteSalon(shopId: number, salonId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${shopId}/salons/${salonId}`, { headers: this.getHeaders() });
  }



  createService(shopId: number, salonId: number, serviceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${shopId}/salons/${salonId}/services`, serviceData, { headers: this.getHeaders() });
  }

  getSalonServices(shopId: number, salonId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${shopId}/salons/${salonId}/services`, { headers: this.getHeaders() });
  }

  deleteService(shopId: number, salonId: number, serviceId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${shopId}/salons/${salonId}/services/${serviceId}`, { headers: this.getHeaders() });
  }

  // Mettre à jour un service dans un salon
  updateService(shopId: number, salonId: number, serviceId: number, serviceData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${shopId}/salons/${salonId}/services/${serviceId}`, serviceData, { headers: this.getHeaders() });
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
