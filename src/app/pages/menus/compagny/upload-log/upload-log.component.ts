import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
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

      this.http.post(`${environment.apiCompagnies}/${this.data.id}/upload_logo`, formData, {headers: this.getHeaders()})
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

  private getHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
