import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisponibilityService } from 'src/app/services/disponibility/disponibility.service';
import { UpdateDisponibilityComponent } from '../update-disponibility/update-disponibility.component';
import Swal from 'sweetalert2';
import { ViewDisponibilityComponent } from '../view-disponibility/view-disponibility.component';

@Component({
  selector: 'app-list-disponibility',
  templateUrl: './list-disponibility.component.html',
  styleUrls: ['./list-disponibility.component.scss']
})
export class ListDisponibilityComponent implements OnInit{

  @Input() availabilities: any[] = [];
  displayedColumns: string[] = ['salon', 'date', 'time_slots', 'actions'];

  constructor(
    private disponibilityService: DisponibilityService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAvailabilities();
  }

  loadAvailabilities() {
    this.disponibilityService.getAvailabilities().subscribe(
      (data) => {
        this.availabilities = data;
      },
      (error) => {
        console.error("Erreur lors du chargement des disponibilités", error);
      }
    );
  }

  viewDetails(availability: any) {
    const dialogRef = this.dialog.open(ViewDisponibilityComponent, {
      width: '500px',
      data: { availability }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Aucun changement nécessaire après la fermeture du modal, mais tu peux rafraîchir les données si nécessaire
    });
  }

  // editAvailability(availability: any) {
  //   const dialogRef = this.dialog.open(UpdateDisponibilityComponent, {
  //     width: '500px',
  //     data: { availability }
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.loadAvailabilities();
  //     }
  //   });
  // }

  deleteAvailability(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.disponibilityService.deleteAvailability(id).subscribe(
          () => {
            Swal.fire('Supprimé!', 'La disponibilité a été supprimée.', 'success');
            this.loadAvailabilities();
          },
          (error) => {
            console.error('Erreur lors de la suppression', error);
            Swal.fire('Erreur', 'Impossible de supprimer la disponibilité', 'error');
          }
        );
      }
    });
  }
}
