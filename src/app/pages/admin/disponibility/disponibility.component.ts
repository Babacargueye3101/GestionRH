import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDisponibilityComponent } from './create-disponibility/create-disponibility.component';
import { DisponibilityService } from 'src/app/services/disponibility/disponibility.service';

@Component({
  selector: 'app-disponibility',
  templateUrl: './disponibility.component.html',
  styleUrls: ['./disponibility.component.scss']
})
export class DisponibilityComponent implements OnInit {
  availabilities: any[] = [];

  constructor(private dialog: MatDialog, private disponibilityService: DisponibilityService){}

  ngOnInit(): void {
    this.getAvailabilities();
  }

  getAvailabilities() {
    this.disponibilityService.getAvailabilities().subscribe((data) => {
      this.availabilities = data;
    });
  }


  openCreateDisponibilitylModal() {
    const dialogRef = this.dialog.open(CreateDisponibilityComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Vente créée avec succès', result);
      }
    });
  }

}
