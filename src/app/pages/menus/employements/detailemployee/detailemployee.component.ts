import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PdfcontratviewComponent } from '../pdfcontratview/pdfcontratview.component';

@Component({
  selector: 'app-detailemployee',
  templateUrl: './detailemployee.component.html',
  styleUrls: ['./detailemployee.component.scss']
})
export class DetailemployeeComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DetailemployeeComponent>,
    private dialog: MatDialog
  ) {

  }

  onClose(): void {
    this.dialogRef.close();
  }

  viewDocument() {
    // this.dialog.open(PdfcontratviewComponent, {
    //   data: { url: this.data.url },
    //   width: '90%',
    //   height: '90%'
    // })
  }
}
