import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateServiceSalonComponent } from '../create-service-salon/create-service-salon.component';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-salon',
  templateUrl: './view-salon.component.html',
  styleUrls: ['./view-salon.component.scss']
})
export class ViewSalonComponent implements OnInit{

  salonId!: number;
  shopId!: number;
  constructor(private dialog: MatDialog, private route: ActivatedRoute){}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.salonId = +params['id'];
      this.shopId = +params['shop_id']
    });

  }

  createService(): void {
    const dialogRef = this.dialog.open(CreateServiceSalonComponent, {
      width: '600px',
      data: { salonId: this.salonId , shopId: this.shopId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

}
