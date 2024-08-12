import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadLogComponent } from '../upload-log/upload-log.component';
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

  viewCompany(compagny: any): void {
    this.dialog.open(UploadLogComponent, {
      data: compagny,
      width: '300px'
    });
  }
}
