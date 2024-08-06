import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompagnyService {

  private apiUrl = 'http://localhost:3000/api/companies';

  constructor(private http: HttpClient) { }


  createCompany(companyData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, { compagny: companyData }, { headers: headers });
  }

  getAllCompagny(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(this.apiUrl, { headers: headers });
  }
}
