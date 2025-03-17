import { Component, Input } from '@angular/core';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import { SalonService } from 'src/app/services/salons/salon.service';
import Swal from 'sweetalert2';
import { DetailReservationComponent } from '../detail-reservation/detail-reservation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent {

  @Input() reservations: any[] = [];
  shops: any[] = []; // Liste des boutiques
  salons: any[] = []; // Liste des salons
  filteredReservations: any[] = [];
  selectedShopId: number | null = null;
  selectedSalonId: number | null = null;
  selectedReservation: any; // Propriété pour stocker la réservation sélectionnée

  constructor(
    public dialog: MatDialog,
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
          this.filteredReservations = data; // Initialisation des données filtrées
        },
        (error) => {
          console.error('Erreur lors du chargement des réservations:', error);
        }
      );
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filteredReservations = this.reservations.filter(reservation => 
      reservation.date.toLowerCase().includes(filterValue) ||
      reservation.time.toLowerCase().includes(filterValue) ||
      reservation.client.name.toLowerCase().includes(filterValue) ||
      reservation.client.prenom.toLowerCase().includes(filterValue) ||
      reservation.client.phone.toLowerCase().includes(filterValue) ||
      (reservation.status === 'confirmed' ? 'confirmé' : 'en attente').toLowerCase().includes(filterValue)
    );
  }

  updateReservationStatus(reservation: any, status: string): void {
    console.log('Mettre à jour le statut de la réservation:', reservation.id, status);
    this.reservationService.updateReservationStatus(reservation.id, status).subscribe({
      next: (updatedReservation) => {
        reservation.status = status;
        if (status === 'confirmed') {
          Swal.fire('Succès', 'Le statut de la réservation a été mis à jour. Et le client recevera un email pour lui notifier de la confirmation de son rendez vous ', 'success');
        }
        else {
          Swal.fire('Succès', 'Le statut de la réservation a été mis à jour.', 'success');
        }
      },
      error: (err) => {
        Swal.fire('Erreur', 'Impossible de mettre à jour le statut de la réservation.', 'error');
      }
    });
  }

  openDetailDialog(reservation: any): void {
    this.dialog.open(DetailReservationComponent, {
      width: '600px',
      data: { id: reservation.id }
    });
  }

}
