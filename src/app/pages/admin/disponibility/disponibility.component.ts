import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDisponibilityComponent } from './create-disponibility/create-disponibility.component';
import { DisponibilityService } from 'src/app/services/disponibility/disponibility.service';
import { CreateHoraireComponent } from '../disponibility/create-horaire/create-horaire.component';

@Component({
  selector: 'app-disponibility',
  templateUrl: './disponibility.component.html',
  styleUrls: ['./disponibility.component.scss']
})
export class DisponibilityComponent{
  availabilities: any[] = [];

  constructor(private dialog: MatDialog, private disponibilityService: DisponibilityService){}


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

    openCreateHoraireModal() {
      const dialogRef = this.dialog.open(CreateHoraireComponent, {
        width: '600px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Horaire créée avec succès', result);
        }
      });
    }

}
