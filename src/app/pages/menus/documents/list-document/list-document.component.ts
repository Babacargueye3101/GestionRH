import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentComponent } from '../add-document/add-document.component';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.scss']
})
export class ListDocumentComponent implements OnInit {

  documentId: string | null = null;
  documents: any []=[];


  searchTerm: string = '';
  searchDate: string = '';

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private documentService: DocumentService){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.documentId = params.get('id');
      const id = params.get('id');
      if (id !== null) {
        console.log('Document ID:', this.documentId);
        this.documentId = id;
        localStorage.setItem('folder_id', this.documentId)
        this.documentService.getDocument(Number(this.documentId)).subscribe((res) =>{
          this.documents= res
          console.log(this.documents);

        }, (error) => {
          console.log(error);
        });
      } else {
        console.error('Document ID is null');
      }

    });
  }

  openCreateDocumentModal(): void {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      width: '400px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le modal a été fermé');

    });
  }


  convertFileSize(sizeInBytes: number): string {
    const units = ['o', 'Ko', 'Mo', 'Go', 'To'];
    let index = 0;
    let size = sizeInBytes;

    while (size >= 1024 && index < units.length - 1) {
      size /= 1024;
      index++;
    }

    return `${size.toFixed(2)} ${units[index]}`;
  }


  filteredDocuments() {
    return this.documents.filter(document => {
      const titleMatches = document.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const dateMatches = this.searchDate ? document.created_at.startsWith(this.searchDate) : true;
      return titleMatches && dateMatches;
    });
  }

  // Optionnel : Si vous souhaitez effectuer une action lors du changement de date
  filterByDate() {
    this.filteredDocuments();
  }
}
