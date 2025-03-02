import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-personnel',
  templateUrl: './detail-personnel.component.html',
  styleUrls: ['./detail-personnel.component.scss']
})
export class DetailPersonnelComponent {

  constructor(
    public dialogRef: MatDialogRef<DetailPersonnelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
