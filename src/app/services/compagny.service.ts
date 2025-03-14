import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompagnyService {

  private apiUrl = environment.apiCompagnies

  constructor(private http: HttpClient) { }


  createCompany(companyData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, { compagny: companyData }, { headers: this.getHeaders() });
  }

  updateCompagny(id:number, companyData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/${id}`, { compagny: companyData }, { headers: this.getHeaders() });
  }

  getAllCompagny(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  getCompagnyById(id:any){
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }


  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
