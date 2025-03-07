import { Component, OnInit } from '@angular/core';
import { CreatePersonnelComponent } from '../personnels/create-personnel/create-personnel.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { SalonService } from 'src/app/services/salons/salon.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit{
  shops: any[] = []; // Liste des boutiques
  salons: any[] = []; // Liste des salons
  reservations: any[] = []; // Liste des réservations

  selectedShopId: number | null = null;
  selectedSalonId: number | null = null;

  constructor(
    private dialog: MatDialog,
    private shopService: ShopService,
    private salonService: SalonService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.loadShops();
  }

  // Charger les boutiques
  loadShops() {
    this.shopService.getShops().subscribe(
      (shops) => {
        this.shops = shops;
      },
      (error) => {
        console.error('Erreur lors du chargement des boutiques', error);
      }
    );
  }

  // Lorsqu'une boutique est sélectionnée
  onShopChange(event: Event) {
    const shopId = Number((event.target as HTMLSelectElement).value);
    if (!isNaN(shopId)) {
      this.selectedShopId = shopId;
      this.selectedSalonId = null; // Réinitialiser le salon sélectionné
      this.reservations = []; // Réinitialiser la liste des réservations
      this.loadSalons();
    }
  }

  // Charger les salons d'une boutique
  loadSalons() {
    if (this.selectedShopId) {
      this.salonService.getSalons(this.selectedShopId).subscribe(
        (salons) => {
          this.salons = salons;
        },
        (error) => {
          console.error('Erreur lors du chargement des salons', error);
        }
      );
    }
  }

  // Lorsqu'un salon est sélectionné
  onSalonChange(event: Event) {
    const salonId = Number((event.target as HTMLSelectElement).value);
    if (!isNaN(salonId)) {
      this.selectedSalonId = salonId;
      this.loadReservations();
    }
  }

  // Charger les réservations d'un salon
  loadReservations() {
    if (this.selectedShopId && this.selectedSalonId) {
      this.reservationService.getReservations(this.selectedShopId, this.selectedSalonId)
        .subscribe(
          (reservations) => {
            this.reservations = reservations || [];
          },
          (error) => {
            console.error('Erreur lors du chargement des réservations', error);
          }
        );
    }
  }



  openCreateReservationModal() {
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Vente créée avec succès', result);
      }
    });
  }

}
