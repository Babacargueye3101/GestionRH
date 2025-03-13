import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getSubscriptionTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/subscription_types`, { headers: this.getHeaders() });
  }

  getSubscriptions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/subscriptions`, { headers: this.getHeaders() });
  }

  getClientsBySubscriptionType(subscriptionTypeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/subscription_types/${subscriptionTypeId}/clients`, { headers: this.getHeaders() });
  }

  addSubscriptionType(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/subscription_types`, payload, { headers: this.getHeaders() });
  }

  updateSubscriptionType(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/subscription_types/${id}`, payload, { headers: this.getHeaders() });
  }

  deleteSubscriptionType(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/subscription_types/${id}`, { headers: this.getHeaders() });
  }

  addSubscription(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/subscriptions`, payload, { headers: this.getHeaders() });
  }
}