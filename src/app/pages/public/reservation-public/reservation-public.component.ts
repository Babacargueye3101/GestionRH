import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-public',
  templateUrl: './reservation-public.component.html',
  styleUrls: ['./reservation-public.component.scss']
})
export class ReservationPublicComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  compagny = { name: 'Votre Compagnie' };
  currentYear = new Date().getFullYear();
  cartItemCount = 0;

}
