import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ClientService } from 'src/app/services/clients/client.service';
import { DetailClientComponent } from '../detail-client/detail-client.component';
import { UpdateClientComponent } from '../update-client/update-client.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent {

  @Input() clients: any[] = [];

  displayedColumns: string[] = ['nom', 'prenom', 'email', 'phone', 'actions'];

  constructor(public dialog: MatDialog, private clientService: ClientService) {}

  // Ouvrir le dialogue de détail du client
  openDetailDialog(client: any) {
    this.dialog.open(DetailClientComponent, {
      width: '600px',
      data: client
    });
  }

  // Ouvrir le dialogue d'édition du client
  openEditDialog(client: any) {
    const dialogRef = this.dialog.open(UpdateClientComponent, {
      width: '600px',
      data: client
    });
    dialogRef.componentInstance.clientUpdated.subscribe(() => {
      this.loadClients(); // Recharger la liste des clients après la mise à jour
    });
    dialogRef.afterClosed().subscribe(updatedClient => {
      if (updatedClient) {
        const index = this.clients.findIndex(c => c.id === updatedClient.id);
        if (index > -1) {
          this.clients[index] = updatedClient; // Mettre à jour la liste avec le client modifié
        }
      }
    });
  }

  // Supprimer un client avec SweetAlert2
  deleteClient(client: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Vous êtes sur le point de supprimer ${client.surname} ${client.name}. Cette action est irréversible.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Supprimer le client de la liste
        this.clients = this.clients.filter(c => c.id !== client.id);

        this.clientService.deleteClient(client.id).subscribe((response) => {
          Swal.fire(
            'Supprimé!',
            `${client.surname} ${client.name} a été supprimé.`,
            'success'
          );
        }, (error) => {
          Swal.fire(
            'La suppression',
            `${client.surname} ${client.name} a échoué`,
            'error'
          );
        });
      }
    });
  }

  // Charger la liste des clients
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
}