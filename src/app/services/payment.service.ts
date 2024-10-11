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


  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }


  getAllpayment(page: number = 1, perPage: number = 10, compagny_id: number, user_id: any): Observable<any> {
    const params = {
      page: page.toString(),
      per_page: perPage.toString(),
      compagny_id: compagny_id,
      email: user_id.email,
      role: user_id.role
    };
    return this.http.get<Payment[]>(this.apiUrl, { headers: this.getHeaders(), params })
  }

  getAllpaymentWithoutPage(compagny_id: number): Observable<any> {
    const params = {
      compagny_id: compagny_id
    };
    return this.http.get<Payment[]>(this.apiUrl+"/"+compagny_id+"/getAllPayment", { headers: this.getHeaders(), params })
  }

  creatPayment(payment: any): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment, { headers: this.getHeaders() });
  }

  downloadCSV(compagnyId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}?compagny_id=${compagnyId}`+"&format=csv", {
      responseType: 'blob',
      observe: 'response', headers: this.getHeaders()
    }).pipe(
      map((response: HttpResponse<Blob>) => response.body),
      filter((blob): blob is Blob => blob !== null) // Filtrer les valeurs nulles
    );
  }

  downloadPaymentsPdf(companyId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}.pdf?compagny_id=${companyId}`, { responseType: 'blob', headers: this.getHeaders() });
  }

  downloadSignlePaymentsPdf(companyId: number, employeeId: number, id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}.pdf?compagny_id=${companyId}&employee_id=${employeeId}&id=${id}`, { responseType: 'blob', headers: this.getHeaders() });
  }

  downloadSinglePaymentPdf(compagnyId: number, paymentId: number): Observable<Blob> {
    const url = `${this.apiUrl}/${paymentId}.pdf?compagny_id=${compagnyId}`;
    return this.http.get(url, { responseType: 'blob', headers: this.getHeaders() });
  }

}
