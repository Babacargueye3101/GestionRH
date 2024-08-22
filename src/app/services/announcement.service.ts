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

  createAnnouncement(announcement: Announcement): Observable<Announcement> {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Announcement>(this.apiUrlAnnonce, announcement, { headers });
  }


  getAnnouncements(page: number = 1, perPage: number = 10){

    const params = {
      page: page.toString(),
      per_page: perPage.toString()
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any[]>(this.apiUrlAnnonce, { headers: headers, params });
  }

}
