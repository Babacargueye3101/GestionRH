import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit{
  reservationForm: FormGroup;
  availabilitySlots: any[] = [];  // Liste des créneaux de disponibilité

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private dialogRef: MatDialogRef<CreateReservationComponent> // Injecter le dialogRef pour fermer le modal
  ) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      availability_id: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchAvailabilitySlots();
  }

  fetchAvailabilitySlots() {
    // Simuler des créneaux de disponibilité
    this.availabilitySlots = [
      { id: 1, time: '10:00 - 12:00' },
      { id: 2, time: '12:15 - 14:15' },
      { id: 3, time: '14:30 - 16:30' }
    ];
  }

  onSubmit() {
    if (this.reservationForm.invalid) {
      return;
    }

    const reservationData = {
      client: {
        name: this.reservationForm.value.name,
        surname: this.reservationForm.value.surname,
        email: this.reservationForm.value.email,
        phone: this.reservationForm.value.phone
      },
      availability_id: this.reservationForm.value.availability_id,
      time: this.reservationForm.value.time
    };

    this.reservationService.createReservation(reservationData).subscribe(
      (response) => {
        Swal.fire('Succès', 'Réservation créée avec succès', 'success');
        this.dialogRef.close();  // Fermer le modal
        this.router.navigate(['/reservations']);  // Rediriger vers la liste des réservations
      },
      (error) => {
        Swal.fire('Erreur', 'Impossible de créer la réservation', 'error');
      }
    );
  }

  onCancel() {
    this.dialogRef.close();  // Ferme le modal sans effectuer d'action
  }
}
