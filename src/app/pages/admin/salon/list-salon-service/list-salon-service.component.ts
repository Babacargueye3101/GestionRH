import { Component, Input, OnInit } from '@angular/core';
import { SalonService } from 'src/app/services/salons/salon.service';
import Swal from 'sweetalert2';
import { UpdateServiceComponent } from '../update-service/update-service.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-salon-service',
  templateUrl: './list-salon-service.component.html',
  styleUrls: ['./list-salon-service.component.scss'],
})
export class ListSalonServiceComponent implements OnInit {
  @Input() shopId!: number;
  @Input() salonId!: number;
  services: any[] = [];

  displayedColumns: string[] = ['name', 'price', 'actions'];

  constructor(private salonService: SalonService, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.shopId && this.salonId) {
      this.getSalonServices();
    }
  }

  getSalonServices(): void {
    this.salonService.getSalonServices(this.shopId, this.salonId).subscribe(
      (services) => {
        this.services = services;
      },
      (error) => {
        console.error('Erreur lors de la récupération des services:', error);
      }
    );
  }


  // Modifier un service
  editService(service: any): void {
    Swal.fire({
      title: 'Modifier le service',
      html: `
        <input id="serviceName" class="swal2-input" value="${service.name}">
        <input id="servicePrice" class="swal2-input" type="number" value="${service.price}">
        <input id="serviceDescription" class="swal2-input" type="text" value="${service.description}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Modifier',
      preConfirm: () => {
        const name = (document.getElementById('serviceName') as HTMLInputElement).value;
        const price = +(document.getElementById('servicePrice') as HTMLInputElement).value;
        const description = (document.getElementById('serviceDescription') as HTMLTextAreaElement).value;
        if (!name || !price || !description) {
          Swal.showValidationMessage('Tous les champs sont obligatoires');
          return false;
        }
        return { name, price , description};
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedService = { ...service, ...result.value };
        this.salonService.updateService(this.shopId, this.salonId, service.id, updatedService).subscribe(
          () => {
            Swal.fire('Succès', 'Service mis à jour avec succès', 'success');
            this.getSalonServices();
          },
          (error) => {
            Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour du service', error);
          }
        );
      }
    });
  }

  // Supprimer un service
  deleteService(serviceId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas récupérer ce service une fois supprimé.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.salonService
          .deleteService(this.shopId, this.salonId, serviceId)
          .subscribe(
            () => {
              Swal.fire('Supprimé!', 'Le service a été supprimé.', 'success');
              this.getSalonServices(); // Recharger les services après suppression
            },
            (error) => {
              Swal.fire(
                'Erreur!',
                'Une erreur est survenue lors de la suppression du service.',
                'error'
              );
            }
          );
      }
    });
  }
}
