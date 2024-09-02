import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-uploaddocument',
  templateUrl: './uploaddocument.component.html',
  styleUrls: ['./uploaddocument.component.scss']
})
export class UploaddocumentComponent {

  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<UploaddocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadDocument(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('contract_document', this.selectedFile);

      this.http.post(`${environment.apiEmployee}/${this.data.employee.id}/upload_document`, formData)
        .subscribe(response => {
          console.log('Document uploaded successfully', response);
          this.dialogRef.close(true);
        }, error => {
          console.error('Error uploading document', error);
          this.dialogRef.close(false);
        });
    } else {
      console.error('No file selected');
    }
  }
}
