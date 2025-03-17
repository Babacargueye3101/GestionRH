import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = `${environment.apiUrl}/stats`;


  constructor(private http: HttpClient) {}

  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getSalesByChannel(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales_by_channel`, { headers: this.getHeaders() });
  }

  getSalesTrends(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales_trends`, { headers: this.getHeaders() });
  }

  getTopSalesAndLoyalCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top_sales_and_loyal_customers`, { headers: this.getHeaders() });
  }

  getPaymentUsageStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/payment_usage_stats`, { headers: this.getHeaders() });
  }

  getSalesByEmployee(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales_by_employee`, { headers: this.getHeaders() });
  }

  getAllPersonnel(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all_personnel`, { headers: this.getHeaders() });
  }

  SummaryStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/summary_stats`, { headers: this.getHeaders() });
  }
}