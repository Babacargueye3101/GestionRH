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

    const url_parse = 'http://localhost:3000/system/employees/contract_documents/000/000/068/original/convert.pdf?1723217618';
    this.url=this.sanitizer.bypassSecurityTrustResourceUrl(url_parse)
  }
}
