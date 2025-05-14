import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl = `${environment.apiUrl}/api/public`;

  constructor(private http: HttpClient) { }



  createCommande(payload: any) {
    return this.http.post(this.apiUrl+"/create_order", payload)
  }
}
