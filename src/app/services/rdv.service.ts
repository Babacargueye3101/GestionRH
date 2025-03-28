import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RdvService {


  private apiUrl = environment.apiUrlRdv;


  constructor(private http: HttpClient) { }

  // Méthode pour créer un rendez-vous
  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, { appointment }, { headers: this.getHeaders() });
  }

  // Méthode pour obtenir tous les rendez-vous
  getAppointments(startIndex=0, pageSize=10 ,compagny_id: number,user: any): Observable<Appointment[]> {
    const params = {
      page: startIndex.toString(),
      per_page: pageSize.toString(),
      compagny_id: compagny_id,
      email: user.email,
      role: user.role
    };
    return this.http.get<Appointment[]>(this.apiUrl, { headers: this.getHeaders(), params });
  }

  // Méthode pour obtenir un rendez-vous par ID
  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Méthode pour mettre à jour un rendez-vous
  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.apiUrl}/${id}`, { appointment }, { headers: this.getHeaders() });
  }

  // Méthode pour supprimer un rendez-vous
  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }


  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}



