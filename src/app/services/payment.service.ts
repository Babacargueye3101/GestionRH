import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  apiUrl= environment.apiPayment;


  getAllpayment(page: number = 1, perPage: number = 10, compagny_id: number): Observable<any> {
    const params = {
      page: page.toString(),
      per_page: perPage.toString(),
      compagny_id: compagny_id
    };
    return this.http.get<Payment[]>(this.apiUrl, { headers: this.getHeaders(), params })
  }

  creatPayment(payment: any): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment, { headers: this.getHeaders() });
  }




  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}
