import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CanalService {

  private apiUrl = 'https://gestionrhback-production.up.railway.app/api/channels'; // URL de ton API

  constructor(private http: HttpClient) {}

  // Récupérer tous les channels
  getChannels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Ajouter un nouveau channel
  addChannel(channelData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { channel: channelData }, { headers: this.getHeaders() });
  }

  // Afficher une alerte après ajout
  showSuccessAlert(): void {
    Swal.fire('Succès', 'Channel ajouté avec succès !', 'success');
  }

  showErrorAlert(): void {
    Swal.fire('Erreur', 'Impossible d\'ajouter le channel.', 'error');
  }


  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
