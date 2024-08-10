import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pdfcontratview',
  templateUrl: './pdfcontratview.component.html',
  styleUrls: ['./pdfcontratview.component.scss']
})
export class PdfcontratviewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }
}
