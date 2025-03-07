import { Component, Input } from '@angular/core';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import { SalonService } from 'src/app/services/salons/salon.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent {

  @Input() reservations: any[] = [];
  shops: any[] = []; // Liste des boutiques
  salons: any[] = []; // Liste des salons

  selectedShopId: number | null = null;
  selectedSalonId: number | null = null;

  constructor(
    private reservationService: ReservationService,
    private shopService: ShopService,
    private salonService: SalonService
  ) {}

  ngOnInit(): void {
    this.loadShops(); // Charger les boutiques au démarrage
  }

  // Charger les boutiques
  loadShops() {
    this.shopService.getShops().subscribe((shops) => {
      this.shops = shops;
    });
  }

  // Charger les salons après la sélection d'une boutique
  onShopChange() {
    this.salons = [];
    this.reservations = []; // Réinitialiser les réservations
    this.selectedSalonId = null;
    if (this.selectedShopId) {
      this.salonService.getSalons(this.selectedShopId).subscribe((salons) => {
        this.salons = salons;
      });
    }
  }

  // Charger les réservations après la sélection d'un salon
  onSalonChange() {
    this.reservations = []; // Réinitialiser les réservations
    if (this.selectedShopId && this.selectedSalonId) {
      this.loadReservations();
    }
  }

  // Charger les réservations
  loadReservations() {
    if (this.selectedShopId && this.selectedSalonId) {
      this.reservationService.getReservations(this.selectedShopId, this.selectedSalonId).subscribe(
        (data) => {
          this.reservations = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des réservations:', error);
        }
      );
    }
  }

}
