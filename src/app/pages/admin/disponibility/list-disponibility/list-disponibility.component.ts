import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisponibilityService } from 'src/app/services/disponibility/disponibility.service';
import { UpdateDisponibilityComponent } from '../update-disponibility/update-disponibility.component';
import Swal from 'sweetalert2';
import { ViewDisponibilityComponent } from '../view-disponibility/view-disponibility.component';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { SalonService } from 'src/app/services/salons/salon.service';

@Component({
  selector: 'app-list-disponibility',
  templateUrl: './list-disponibility.component.html',
  styleUrls: ['./list-disponibility.component.scss']
})
export class ListDisponibilityComponent implements OnInit{
  shops: any[] = [];
  salons: any[] = [];
  @Input() availabilities: any[] = [];

  selectedShopId?: number;
  selectedSalonId?: number;

  displayedColumns: string[] = ['salon', 'date', 'actions'];

  constructor(
    private disponibilityService: DisponibilityService,
    private shopService: ShopService,
    private salonService: SalonService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadShops();
  }

  loadShops() {
    this.shopService.getShops().subscribe(
      (data) => {
        this.shops = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des shops', error);
      }
    );
  }

  onShopChange() {
    if (this.selectedShopId) {
      this.salonService.getSalons(this.selectedShopId).subscribe(
        (data) => {
          this.salons = data;
          this.availabilities = []; // Réinitialiser les disponibilités
          this.selectedSalonId = undefined;
        },
        (error) => {
          console.error('Erreur lors du chargement des salons', error);
        }
      );
    }
  }

  onSalonChange() {
    if (this.selectedShopId && this.selectedSalonId) {
      this.disponibilityService
        .getAvailabilitiesByShopAndSalon(this.selectedShopId, this.selectedSalonId)
        .subscribe(
          (data) => {
            this.availabilities = data;
          },
          (error) => {
            console.error('Erreur lors du chargement des disponibilités', error);
          }
        );
    }
  }

  viewDetails(availability: any) {
    this.dialog.open(ViewDisponibilityComponent, {
      width: '500px',
      data: { availability }
    });
  }

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
            this.onSalonChange(); // Recharger les disponibilités
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
