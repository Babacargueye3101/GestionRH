import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/api/shops`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;


    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  private getHeader() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;


    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProducts(shopId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/${shopId}/products`, { headers: this.getHeaders() });
  }

  getProductsByShop(shopId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/shops/${shopId}/products`, {
      headers: this.getHeaders()
    });
  }

  createProduct(shopId: number, formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/${shopId}/products`, formData, { headers: this.getHeader() });
  }

  updateProduct(shopId: number, productId: number, formData: FormData): Observable<Product> {

    return this.http.put<Product>(`${this.baseUrl}/${shopId}/products/${productId}`, formData, { headers: this.getHeader() });
  }

  deleteProduct(shopId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${shopId}/products/${productId}`, { headers: this.getHeaders() });
  }


  // Categorie Fonction

  getCategories(shopId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/${shopId}/categories`, { headers });
  }

  createCategory(shopId: number, category: { name: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${shopId}/categories`, { category: category }, { headers: this.getHeaders() });
  }

  updateCategory(shopId: number, categoryId: number, category: { name: string }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${shopId}/categories/${categoryId}`, { category: category }, { headers: this.getHeaders() });
  }

}
