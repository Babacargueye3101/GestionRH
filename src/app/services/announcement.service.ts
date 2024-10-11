import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Announcement {
  id?: number;
  title: string;
  description: string;
  date: Date;
  announcementType: string;
  startDate: Date;
  endDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrlAnnonce = environment.apiUrlAnnonce;

  constructor(private http: HttpClient) { }


  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  createAnnouncement(announcement: Announcement): Observable<Announcement> {




    return this.http.post<Announcement>(this.apiUrlAnnonce, announcement, { headers: this.getHeaders() });
  }


  getAnnouncements(page: number = 1, perPage: number = 10, user: any){

    const params = {
      page: page.toString(),
      per_page: perPage.toString(),
      compagny_id: user.compagny_id,
      role: user.role
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any[]>(this.apiUrlAnnonce, { headers: this.getHeaders(), params });
  }

  updateAnnouncement(announcement: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiUrlAnnonce+'/'+announcement.id, { announcement: announcement }, { headers: this.getHeaders() });
  }

  downloadAnnouncementPdf(announcementId: number): Observable<Blob> {
    return this.http.get(this.apiUrlAnnonce + '/' + announcementId + '.pdf', {
      responseType: 'blob', headers: this.getHeaders()
    });
  }



}
