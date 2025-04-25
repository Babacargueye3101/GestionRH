import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private apiUrl = `${environment.apiUrl}/api/personnels`;

  constructor(private http: HttpClient) { }

  createPersonnel(payload: any): Observable<any> {
    console.log('Payload:', payload);
    return this.http.post<any>(`${this.apiUrl}`, payload, { headers: this.getHeaders() });
  }

  getPersonnels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }


  getPersonnelById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}` ,{ headers: this.getHeaders() });
  }

  // Méthode pour mettre à jour un personnel
  updatePersonnel(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload,{ headers: this.getHeaders() });
  }

  // Méthode pour supprimer un personnel
  deletePersonnel(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`,{ headers: this.getHeaders() });
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
