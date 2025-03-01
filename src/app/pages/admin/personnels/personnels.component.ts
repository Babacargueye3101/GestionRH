import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePersonnelComponent } from './create-personnel/create-personnel.component';

@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.scss']
})
export class PersonnelsComponent {

  constructor(private dialog: MatDialog) {}
  openCreatePersonnelModal() {
    const dialogRef = this.dialog.open(CreatePersonnelComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Vente créée avec succès', result);
      }
    });
  }

}
