import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private apiUrl = `${environment.apiUrl}/api/shops`;

  constructor(private http: HttpClient) { }

  // Obtenir les ventes d'une boutique
  getVentes(shopId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${shopId}/sales`, { headers: this.getHeaders() });
  }

  // Créer une nouvelle vente
  createVente(shopId: number, venteData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${shopId}/sales`, venteData, { headers: this.getHeaders() });
  }

  deleteVente(id: number, shop_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${shop_id}/sales/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Mettre à jour une vente existante
  updateVente(shopId: number, saleId: number, venteData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${shopId}/sales/${saleId}`, venteData, { headers: this.getHeaders() });
  }

  getVenteDetails(venteId: number, shopId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${shopId}/sales/${venteId}`, { headers: this.getHeaders() });
  }

  downloadInvoice(venteId: number, shopId: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/${shopId}/sales/${venteId}/download_invoice`, {
      responseType: 'blob' as 'json', // Force le type de réponse en blob
      headers: this.getHeaders(),
    });
  }

  // Fonction pour obtenir les headers avec le token Bearer
  private getHeaders(): HttpHeaders {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
