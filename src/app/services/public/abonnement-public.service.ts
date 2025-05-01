import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbonnementPublicService {

  private apiUrl = environment.apiUrl+'/api';

  constructor(private http: HttpClient) { }

  getAlllAbonnement(){
    return this.http.get<any>(this.apiUrl+'/subscription_types');
  }


  createAbonnement(id: number, abonnement: any){
    return this.http.post(`${this.apiUrl}/subscription_types/${id}/subsrciption_by_client`, { client: abonnement})
  }
}
