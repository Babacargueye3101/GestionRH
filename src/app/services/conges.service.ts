import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conge } from '../models/conge.model';

@Injectable({
  providedIn: 'root'
})
export class CongesService {
  private apiUrl = environment.apiConges


  constructor(private http: HttpClient) { }


  createConge(conge: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, { leave: conge }, { headers: headers });
  }


  getCongesList(page: number = 1, perPage: number = 10){

    const params = {
      page: page.toString(),
      per_page: perPage.toString(),
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<Conge[]>(this.apiUrl, { headers: headers, params });
  }


}
