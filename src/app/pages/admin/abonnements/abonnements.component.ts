import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbonnementService } from '../../../services/abonnement.service';
import { ViewClientsDialogComponent } from './view-clients-dialog/view-clients-dialog.component';
import { AddEditSubscriptionTypeDialogComponent } from './add-edit-subscription-type-dialog/add-edit-subscription-type-dialog.component';
import { AddSubscriptionDialogComponent } from './add-subscription-dialog/add-subscription-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abonnements',
  templateUrl: './abonnements.component.html',
  styleUrls: ['./abonnements.component.scss']
})
export class AbonnementsComponent implements OnInit {
  subscriptionTypes: any[] = [];

  displayedColumns: string[] = ['name', 'price', 'description', 'status', 'letter', 'actions'];

  constructor(private abonnementService: AbonnementService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadSubscriptionTypes();
  }

  loadSubscriptionTypes(): void {
    this.abonnementService.getSubscriptionTypes().subscribe((data: any) => {
      this.subscriptionTypes = data;
    });
  }



  openAddSubscriptionTypeDialog(): void {
    const dialogRef = this.dialog.open(AddEditSubscriptionTypeDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSubscriptionTypes();
      }
    });
  }

  openEditSubscriptionTypeDialog(type: any): void {
    const dialogRef = this.dialog.open(AddEditSubscriptionTypeDialogComponent, {
      width: '400px',
      data: type
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSubscriptionTypes();
      }
    });
  }

  // deleteSubscriptionType(id: number): void {
  //   this.abonnementService.deleteSubscriptionType(id).subscribe(() => {
  //     this.loadSubscriptionTypes();
  //   });
  // }

  deleteAbonnement_type(id: number) {
    Swal.fire({
      title: 'Supprimer ?',
      text: 'Voulez-vous vraiment supprimer cette Type ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.abonnementService.deleteSubscriptionType(id).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'La boutique a été supprimée.', 'success');
            this.loadSubscriptionTypes();
          },
          error: (err) => Swal.fire('Erreur!', 'Impossible de supprimer la boutique.', 'error')
        });
      }
    });
  }

  viewClients(subscriptionTypeId: number): void {
    const dialogRef = this.dialog.open(ViewClientsDialogComponent, {
      width: '600px',
      data: { subscriptionTypeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSubscriptionTypes();
      }
    });
  }

  openAddSubscriptionDialog(): void {
    const dialogRef = this.dialog.open(AddSubscriptionDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSubscriptionTypes();
      }
    });
  }
}