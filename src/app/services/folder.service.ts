import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Folder {
  id: number;
  name: string;
  compagny_id: number;
  // autres champs si nécessaire
}

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private apiUrl = environment.apiUrlFolder;

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les headers avec le token d'authentification
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`, // Exemple de token
      'Content-Type': 'application/json'
    });
  }

  // Extrait le token d'authentification (ajuste cette méthode selon ta logique)
  private getAuthToken(): string {
    return localStorage.getItem('auth_token') || ''; // Exemple : récupération du token depuis localStorage
  }

  // Récupérer tous les dossiers
  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Récupérer un dossier par ID
  getFolder(id: number): Observable<Folder> {
    return this.http.get<Folder>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Créer un nouveau dossier
  createFolder(folderData: Partial<Folder>): Observable<Folder> {
    return this.http.post<Folder>(this.apiUrl, folderData, { headers: this.getHeaders() });
  }

  // Mettre à jour un dossier existant
  updateFolder(id: number, folderData: Partial<Folder>): Observable<Folder> {
    return this.http.put<Folder>(`${this.apiUrl}/${id}`, folderData, { headers: this.getHeaders() });
  }

  // Supprimer un dossier
  deleteFolder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
