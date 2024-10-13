import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {


  constructor(private documentService: DocumentService, private dialogRef: MatDialogRef<AddDocumentComponent>){}

  document = {
    title: '',
    description: ''
  };
  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  createDocument() {
    const formData = new FormData();

    var folder_id= localStorage.getItem('folder_id');
    formData.append('document[title]', this.document.title);
    formData.append('document[description]', this.document.description);
    if (folder_id){
      formData.append('document[folder_id]', folder_id);
    }
    if (this.selectedFile) {
      formData.append('document[file]', this.selectedFile);
    }

    this.documentService.createDocument(formData).subscribe(
      (response) => {
        console.log('Document créé avec succès!', response);
        this.dialogRef.close(response);
        location.reload();
      },
      (error) => {
        console.error('Erreur lors de la création du document', error);
      }
    );
  }
}
