import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalonService } from 'src/app/services/salons/salon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-salon',
  templateUrl: './update-salon.component.html',
  styleUrls: ['./update-salon.component.scss']
})
export class UpdateSalonComponent {

  salonForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private salonService: SalonService,
    private dialogRef: MatDialogRef<UpdateSalonComponent>,
    @Inject(MAT_DIALOG_DATA) public salon: any
  ) {
    this.salonForm = this.fb.group({
      name: [this.salon.name, [Validators.required, Validators.minLength(3)]],
      address: [this.salon.address, Validators.required],
      phone: [this.salon.phone, [Validators.required, Validators.pattern('^\\+221\\s?\\d{2}\\s?\\d{3}\\s?\\d{2}\\s?\\d{2}$')]],
      description: [this.salon.description, [Validators.required, Validators.maxLength(200)]]
    });
  }

  onSubmit(): void {
    if (this.salonForm.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs correctement', 'error');
      return;
    }

    const updatedSalon = this.salonForm.value;
    // Passer le shopId avec le salonId
    this.salonService.updateSalon(this.salon.shop_id, this.salon.id, updatedSalon).subscribe(
      (response) => {
        Swal.fire('Succès', 'Salon mis à jour avec succès', 'success');
        this.dialogRef.close(response); // Fermer le dialogue et retourner la réponse
      },
      (error) => {
        Swal.fire('Erreur', 'Une erreur est survenue', 'error');
        console.error(error);
      }
    );
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
