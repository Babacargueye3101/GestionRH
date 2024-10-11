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

  private baseUrl = 'https://waapi.app/api/v1/instances';


  constructor(private http: HttpClient) { }


  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }


  createConge(conge: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { leave: conge }, { headers: this.getHeaders() });
  }


  getCongesList(page: number = 1, perPage: number = 10, user: any=null){

    const params = {
      page: page.toString(),
      per_page: perPage.toString(),
      user_role: user?.role,
      email_user: user?.email
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<Conge[]>(this.apiUrl, { headers: this.getHeaders(), params });
  }

  changeStatusConge(id: number, status: string, comment: string){
    var conge_params= { id: id , status: status, comment: comment}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/${id}/changeStatus`, { leave: conge_params }, { headers: this.getHeaders() });
  }

  deleteConge(id: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  sendMessageToUser(instanceId: string, phoneNumber: string, message: string): Observable<any> {
    const url = `${this.baseUrl}/${instanceId}/client/action/send-message`;  // URL complète avec l'ID de l'instance
    const headers = new HttpHeaders({
      'Authorization': `Bearer i2IUuiqFNSklnXhe5HgwtKL7iE1eTaoe29vpUM6A298d539a`, // Remplacez par votre clé API
      'Content-Type': 'application/json'
    });

    const body = {
      chatId: phoneNumber+"@c.us",  // Numéro de téléphone de l'utilisateur
      message: message     // Contenu du message
    };

    return this.http.post(url, body, { headers });
  }



}
