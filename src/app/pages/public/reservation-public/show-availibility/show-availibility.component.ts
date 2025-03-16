import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/public/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-availibility',
  templateUrl: './show-availibility.component.html',
  styleUrls: ['./show-availibility.component.scss'],
})
export class ShowAvailibilityComponent implements OnInit {
  reservationForm!: FormGroup;
  availability: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShowAvailibilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservationServicePublic: ReservationService
  ) {
    this.availability = data;
  }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      client: this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
      }),
      availability_id: this.data.id,
      time: ['', Validators.required],
    });
    this.getAllAvailibilityBySalon();
  }

  getAllAvailibilityBySalon() {
    this.reservationServicePublic
      .getAvailabilities(this.data.shop_id, this.data.id)
      .subscribe(
        (response) => {
          console.log('Disponibilités chargées :', response);
          this.availability = response[0]; // Assurez-vous de bien récupérer le premier élément
        },
        (error) => {
          console.log('Erreur lors du chargement des disponibilités :', error);
        }
      );
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const payload = this.reservationForm.value;
      this.reservationServicePublic.createReservation(payload).subscribe(
        (response) => {
          Swal.fire({
            title: 'Création de Réservation',
            text: 'Réservation planifiée avec succès',
            icon: 'success',
          }).then(() => {
            this.dialogRef.close(response);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la création de la réservation. Veuillez réessayer.',
            icon: 'error',
          });
        }
      );
    }
  }
}
