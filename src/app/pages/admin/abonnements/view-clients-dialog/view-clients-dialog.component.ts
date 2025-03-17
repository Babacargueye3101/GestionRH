import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbonnementService } from 'src/app/services/abonnement.service';


@Component({
  selector: 'app-view-clients-dialog',
  templateUrl: './view-clients-dialog.component.html',
  styleUrls: ['./view-clients-dialog.component.scss']
})
export class ViewClientsDialogComponent implements OnInit {
  clients: any[] = [];
  filteredClients: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'subscription_type', 'subscription_card_number', 'subscription_active'];

  constructor(
    private abonnementService: AbonnementService,
    public dialogRef: MatDialogRef<ViewClientsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.abonnementService.getClientsBySubscriptionType(this.data.subscriptionTypeId).subscribe((data: any) => {
      this.clients = data;
      this.filteredClients = this.clients; // Initialisation des données filtrées
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filteredClients = this.clients.filter(client => 
      client.name.toLowerCase().includes(filterValue) ||
      client.email.toLowerCase().includes(filterValue) ||
      client.subscription_type.toLowerCase().includes(filterValue) ||
      client.subscription_card_number.toLowerCase().includes(filterValue)
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}