import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
   private apiUrl = `${environment.apiUrl}/api/public/products/pending`;

   constructor(private http: HttpClient) {}

    private getHeaders() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const token = currentUser.token;

      console.log(token);

      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
    }


    getNotifications(): Observable<any> {
        return this.http.get(this.apiUrl, { headers: this.getHeaders() });
      }

}
