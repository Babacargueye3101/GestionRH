import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSalonComponent } from './create-salon/create-salon.component';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss'],
})
export class SalonComponent {
  constructor(private dialog: MatDialog) {}

  createSalon(): void {
    const dialogRef = this.dialog.open(CreateSalonComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Salon créé avec succès :', result);
      }
    });
  }
}
