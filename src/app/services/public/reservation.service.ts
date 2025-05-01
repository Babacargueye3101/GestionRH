import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = environment.apiUrl+"/api";

  constructor(private http: HttpClient) { }


  getAllShops(){
    return this.http.get<any>(this.apiUrl+'/public/all_shops');
  }

  getAllSalonByShop(id: number){
    return this.http.get<any>(`${this.apiUrl}/public/shops/${id}/salons`);
  }

  getAvailabilities(shopId: number, salonId: number) {
    return this.http.get<any>(`${this.apiUrl}/shops/${shopId}/salons/${salonId}/availabilities`);
  }

  createReservation(reservationData: any) {
    return this.http.post<any>(`${this.apiUrl}/reservations`, reservationData)
  }
}
