import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = environment.apiUser;

  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des utilisateurs.
   */
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, {headers: this.getHeaders()});
  }

  /**
   * Met à jour le rôle d'un utilisateur.
   * @param userId L'identifiant de l'utilisateur
   * @param role Le rôle à mettre à jour
   * @param value La nouvelle valeur du rôle (true ou false)
   */
  updateRole(userId: number, role: string, value: boolean): Observable<any> {
    const url = `${this.baseUrl}/${userId}/update_role`;
    return this.http.patch(url, { user: { [role]: value } },  {headers: this.getHeaders()});
  }
}
