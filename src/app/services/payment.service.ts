import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';
import { environment } from 'src/environments/environment';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  apiUrl= environment.apiPayment;


  getAllpayment(page: number = 1, perPage: number = 10, compagny_id: number, user_id: any): Observable<any> {
    const params = {
      page: page.toString(),
      per_page: perPage.toString(),
      compagny_id: compagny_id
    };
    return this.http.get<Payment[]>(this.apiUrl, { headers: this.getHeaders(), params })
  }

  getAllpaymentWithoutPage(compagny_id: number): Observable<any> {
    const params = {
      compagny_id: compagny_id
    };
    return this.http.get<Payment[]>(this.apiUrl, { headers: this.getHeaders(), params })
  }

  creatPayment(payment: any): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment, { headers: this.getHeaders() });
  }

  downloadCSV(compagnyId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}?compagny_id=${compagnyId}`+"&format=csv", {
      responseType: 'blob',
      observe: 'response' // Pour obtenir les headers
    }).pipe(
      map((response: HttpResponse<Blob>) => response.body),
      filter((blob): blob is Blob => blob !== null) // Filtrer les valeurs nulles
    );
  }

  downloadPaymentsPdf(companyId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}.pdf?compagny_id=${companyId}`, { responseType: 'blob' });
  }

  downloadSignlePaymentsPdf(companyId: number, employeeId: number, id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}.pdf?compagny_id=${companyId}&employee_id=${employeeId}&id=${id}`, { responseType: 'blob' });
  }





  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}
