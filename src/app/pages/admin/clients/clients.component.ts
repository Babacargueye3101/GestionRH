import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientComponent } from './create-client/create-client.component';
import { ClientService } from 'src/app/services/clients/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: any[] = [];

  constructor(private dialog: MatDialog, private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        console.log('Clients:', data);
        this.clients = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des clients:', err);
      }
    });
  }

  openCreateClientModal() {
    const dialogRef = this.dialog.open(CreateClientComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Client créé avec succès', result);
        this.loadClients(); // Recharger la liste des clients après la création
      }
    });
  }
}