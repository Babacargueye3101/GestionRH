import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdfcontratview',
  templateUrl: './pdfcontratview.component.html',
  styleUrls: ['./pdfcontratview.component.scss']
})
export class PdfcontratviewComponent {
  url!: SafeResourceUrl;;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {

    const url_parse = data.url;
    this.url=this.sanitizer.bypassSecurityTrustResourceUrl(url_parse)
  }
}
