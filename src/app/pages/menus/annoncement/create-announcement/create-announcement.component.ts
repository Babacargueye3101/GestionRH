import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from 'src/app/services/announcement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.scss']
})
export class CreateAnnouncementComponent {


  announcementForm!: FormGroup;
  announcementTypes: string[] = [
    'Directeur Général (CEO)',
    'Directeur des Ressources Humaines (DRH)',
    'Directeur de la Communication',
    'Responsable des Opérations',
    'Manager de Département',
    'Assistant de Direction',
    'Chef de Projet',
    'Responsable RH',
    'Chef d’Équipe',
    'Responsable Communication Interne'
  ];

  constructor(
    public dialogRef: MatDialogRef<CreateAnnouncementComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private announcementService: AnnouncementService
  ) {
    this.createForm();
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {

      const user = localStorage.getItem('currentUser');
      var currentUser;
      if (user) {
        currentUser = JSON.parse(user);
      }

      const formData = {
        ...this.announcementForm.value,
        user_id: currentUser.id,
        compagny_id: currentUser.compagny_id
      };
      console.log(formData);


      this.announcementService.createAnnouncement(formData)
        .subscribe({
          next: (response) => {
            this.dialogRef.close(this.announcementForm.value);
            Swal.fire({
              title: 'Succès',
              text: 'Annonce créé avec succès.',
              icon: 'success',
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          },
          error: (error) => {
            console.error('Error creating announcement:', error);
            // Handle error, e.g., show an error message
          }
        });
    }
  }
}
