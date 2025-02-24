import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/shops`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;


    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getProducts(shopId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/${shopId}/products`, { headers: this.getHeaders() });
  }

  getProductsByShop(shopId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/shops/${shopId}/products`, {
      headers: this.getHeaders()
    });
  }

  createProduct(shopId: number, product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/${shopId}/products`, { product: product }, { headers: this.getHeaders() });
  }

  updateProduct(shopId: number, productId: number, product: Product): Observable<Product> {

    return this.http.put<Product>(`${this.baseUrl}/${shopId}/products/${productId}`, { product }, { headers: this.getHeaders() });
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
