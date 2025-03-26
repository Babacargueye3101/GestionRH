import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/public/reservation.service';
import { ShopDetailModalComponent } from './shop-detail-modal/shop-detail-modal.component';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-reservation-public',
  templateUrl: './reservation-public.component.html',
  styleUrls: ['./reservation-public.component.scss']
})
export class ReservationPublicComponent implements OnInit{
  shopList: any;
  allsalons: any;

  constructor(private resvationPublicService : ReservationService, private dialog: MatDialog, private router: Router){}

  compagny = { name: 'Dabishpro' };
  currentYear = new Date().getFullYear();
  cartItemCount = 0;


  ngOnInit(): void {
    this.getAllShopPublic();
  }

  openShopDetails(shop: any): void {
    this.dialog.open(ShopDetailModalComponent, {
      data: shop,
      width: '900px'
    });
  }

  getAllShopPublic(){
    this.resvationPublicService.getAllShops().subscribe((response) => {
       this.shopList = response
       console.log(this.shopList);
    }, (error) => {
       console.log(error);
    });
  }

  detailshopRedirect(shop: any){
    this.router.navigate([`/public/reservations/shops/${shop.id}/salons`]);
  }
}
