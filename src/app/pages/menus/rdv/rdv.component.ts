import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRdvComponent } from './create-rdv/create-rdv.component';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.scss']
})
export class RdvComponent {

  constructor(public dialog: MatDialog){}





  openCreateAppointmentDialog() {
    const dialogRef = this.dialog.open(CreateRdvComponent, {
      width: '600px',
      height: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result from the dialog if needed
    });
  }


}
