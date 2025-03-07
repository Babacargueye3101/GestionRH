import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodeService {

  private apiUrl = 'http://localhost:3000/api/payment_methodes'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les méthodes de paiement
  getPaymentMethodes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Ajouter une nouvelle méthode de paiement
  createPaymentMethode(paymentMethodeData: { payment_methode: { name: string } }): Observable<any> {
    return this.http.post<any>(this.apiUrl, paymentMethodeData, { headers: this.getHeaders() });
  }

  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
