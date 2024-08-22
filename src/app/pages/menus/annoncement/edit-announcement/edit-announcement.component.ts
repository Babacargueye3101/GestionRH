import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from 'src/app/services/announcement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.scss']
})
export class EditAnnouncementComponent {
  announcementForm!: FormGroup;
  announcementTypes: string[] = ['Type 1', 'Type 2', 'Type 3']; // Remplacez par les types d'annonces réels

  constructor(
    public dialogRef: MatDialogRef<EditAnnouncementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private announcementService: AnnouncementService
  ) {
    this.createForm();
    this.loadAnnouncementData();
  }

  createForm(): void {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      announcement_type: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
  }

  loadAnnouncementData(): void {
    if (this.data) {
      this.announcementForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {
      const formData = {
        ...this.announcementForm.value,
        id: this.data.id
      };

      this.announcementService.updateAnnouncement(formData)
        .subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Succès',
              text: 'Annonce modifiée avec succès.',
              icon: 'success',
              showConfirmButton: true,
            }).then(() => {
              this.dialogRef.close(this.announcementForm.value);
            });
          },
          error: (error) => {
            console.error('Error updating announcement:', error);
            Swal.fire({
              title: 'Erreur',
              text: 'Une erreur s\'est produite lors de la modification de l\'annonce.',
              icon: 'error',
              showConfirmButton: true,
            });
          }
        });
    }
  }
}
