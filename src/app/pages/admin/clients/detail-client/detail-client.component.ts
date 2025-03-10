import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/clients/client.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent {
  reservations: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<DetailClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.clientService.getClientReservations(this.data.id).subscribe({
      next: (reservations) => {
        this.reservations = reservations;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réservations:', err);
      }
    });
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }
}