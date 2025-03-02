import { Component } from '@angular/core';
import { CreatePersonnelComponent } from '../personnels/create-personnel/create-personnel.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent {

  constructor(private dialog: MatDialog) {}

  openCreateReservationModal() {
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Vente créée avec succès', result);
      }
    });
  }

}
