import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-detail-compagny',
  templateUrl: './detail-compagny.component.html',
  styleUrls: ['./detail-compagny.component.scss']
})
export class DetailCompagnyComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DetailCompagnyComponent>,
    private dialog: MatDialog
  ) {

  }

  onClose(): void {
    this.dialogRef.close();
  }

}
