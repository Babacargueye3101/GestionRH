import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/services/public/reservation.service';
import { ShowAvailibilityComponent } from '../show-availibility/show-availibility.component';

@Component({
  selector: 'app-shop-detail-modal',
  templateUrl: './shop-detail-modal.component.html',
  styleUrls: ['./shop-detail-modal.component.scss']
})
export class ShopDetailModalComponent implements OnInit {
  shop: any;
  salons: any[] = [];


  compagny = { name: 'Dabishpro' };
  currentYear = new Date().getFullYear();
  cartItemCount = 0;

  constructor(private route: ActivatedRoute, private reservationService: ReservationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const shopId = this.route.snapshot.paramMap.get('shopId');
    if (shopId) {
      this.loadShopDetails(+shopId);
    }
  }

  loadShopDetails(shopId: number): void {
    this.reservationService.getAllSalonByShop(shopId).subscribe((response) => {
      this.salons = response;
      console.log("/////////");
      console.log(this.salons);
      console.log("/////////");
    }, (error) => {
      console.log(error);
    });
  }
  showAvailibility(salon: any): void {
    this.dialog.open(ShowAvailibilityComponent, {
      data: salon,
      width: '600px'
    });
  }
}
