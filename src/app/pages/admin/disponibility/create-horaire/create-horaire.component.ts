import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DisponibilityService } from 'src/app/services/disponibility/disponibility.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-horaire',
  templateUrl: './create-horaire.component.html',
  styleUrls: ['./create-horaire.component.scss']
})
export class CreateHoraireComponent {



    timeSlotForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<CreateHoraireComponent>,
      private disponiilityService: DisponibilityService
    ) {
      this.timeSlotForm = this.fb.group({
        start_time: ['', Validators.required],
        end_time: ['', Validators.required],
      });
    }

    onSubmit(): void {
      if (this.timeSlotForm.valid) {
        const timeSlot = this.timeSlotForm.value;
        this.disponiilityService.createHoraire(timeSlot).subscribe((response) =>{
          Swal.fire('Horaire', 'Horaire crée avec success', 'info');

        }, (error) => {
          Swal.fire('Erreur', 'La création de l\'horaire a échoué', 'error');
        });
        this.dialogRef.close(this.timeSlotForm.value);
      }
    }

    onCancel(): void {
      this.dialogRef.close();
    }
}
