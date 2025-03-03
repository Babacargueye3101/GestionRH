import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalonService } from 'src/app/services/salons/salon.service';

@Component({
  selector: 'app-view-disponibility',
  templateUrl: './view-disponibility.component.html',
  styleUrls: ['./view-disponibility.component.scss']
})
export class ViewDisponibilityComponent implements OnInit{

  salon: any;
  constructor(
    public dialogRef: MatDialogRef<ViewDisponibilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private salonService: SalonService
  ) {}
  ngOnInit(): void {
    // this.salonService.getSalons(this.data.availability.salon_id).subscribe((response) => {
    //    this.salon= response;
    // })
    // console.log("///////");
    // console.log(this.salon);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
