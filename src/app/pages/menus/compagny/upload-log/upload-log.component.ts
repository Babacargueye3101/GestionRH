import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-upload-log',
  templateUrl: './upload-log.component.html',
  styleUrls: ['./upload-log.component.scss']
})
export class UploadLogComponent {

  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<UploadLogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadLogo(): void {
    this.spinnerService.show();
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('logo_compagny', this.selectedFile);

      this.http.post(`http://localhost:3000/api/companies/${this.data.id}/upload_logo`, formData)
        .subscribe(response => {
          console.log('Document uploaded successfully', response);
          this.dialogRef.close(true);
          this.spinnerService.hide();
          Swal.fire('Uplod logo', 'Logo changé avec Success!', 'success');

        }, error => {
          console.error('Error uploading document', error);
          this.dialogRef.close(false);
        });
    } else {
      console.error('No file selected');
    }
  }
}
