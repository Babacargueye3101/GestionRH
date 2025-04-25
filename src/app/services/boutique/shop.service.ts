import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shop } from 'src/app/models/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private apiUrl = `${environment.apiUrl}/api/shops`;

  constructor(private http: HttpClient) { }

  // Méthode pour créer une boutique
  createShop(shop: Shop): Observable<Shop> {
    return this.http.post<Shop>(this.apiUrl, { shop: shop }, { headers: this.getHeaders() });
  }

  // Méthode pour obtenir toutes les boutiques
  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Méthode pour obtenir une boutique par son ID
  getShopById(id: number): Observable<Shop> {
    return this.http.get<Shop>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Méthode pour mettre à jour une boutique
  updateShop(id: number, shop: Shop): Observable<Shop> {
    return this.http.patch<Shop>(`${this.apiUrl}/${id}`, { shop }, { headers: this.getHeaders() });
  }

  // Méthode pour supprimer une boutique
  deleteShop(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Méthode pour obtenir les en-têtes avec le token JWT
  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}