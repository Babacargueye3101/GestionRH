import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = environment.apiUrl+"/api";

  constructor(private http: HttpClient) {}

  // Récupérer tous les Products
  getAllProduct(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl+"/public/all_products");
  }

  // Récupérer un Product par category
  getProductByCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/public/category/${id}/products`);
  }

  getAllCategory(){
    return this.http.get(this.apiUrl+"/public/all_categories");
  }
}
