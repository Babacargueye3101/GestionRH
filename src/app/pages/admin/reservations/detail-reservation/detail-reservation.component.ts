import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/reservations/reservation.service';

@Component({
  selector: 'app-detail-reservation',
  templateUrl: './detail-reservation.component.html',
  styleUrls: ['./detail-reservation.component.scss']
})
export class DetailReservationComponent implements OnInit {
  reservation: any;

  constructor(
    public dialogRef: MatDialogRef<DetailReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.loadReservationDetails();
  }

  loadReservationDetails(): void {
    this.reservationService.getReservationById(this.data.id).subscribe({
      next: (reservation) => {
        console.log('Détails de la réservation:', reservation);
        this.reservation = reservation;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails de la réservation:', err);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}