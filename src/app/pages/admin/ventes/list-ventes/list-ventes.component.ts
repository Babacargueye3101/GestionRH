import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { SalonService } from 'src/app/services/salons/salon.service';
import { VenteService } from 'src/app/services/ventes/vente.service';
import { VenteDetailsDialogComponent } from '../vente-details-dialog/vente-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-ventes',
  templateUrl: './list-ventes.component.html',
  styleUrls: ['./list-ventes.component.scss']
})
export class ListVentesComponent {

  ventes: any[] = [];
  shops: any[] = [];
  salons: any[] = [];

  selectedShopId!: number;
  selectedSalonId?: number;

  displayedColumns: string[] = [
    'buyer_name',
    'buyer_surname',
    'channel',
    'total_price',
    'paid_amount',
    'remaining_amount',
    'payment_method',
    'delivered',
    'sale_date',
    'actions'
  ];

  constructor(
    private ventesService: VenteService,
    private salonService: SalonService,
    private http: HttpClient,
    private shopService: ShopService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadShops();
  }

  // Charger les boutiques depuis l'API
  loadShops(): void {
    this.shopService.getShops().subscribe(
      (response) => {
        this.shops = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des boutiques:', error);
      }
    );
  }

  // Charger les salons d'une boutique sélectionnée
  loadSalons(): void {
    if (this.selectedShopId) {
      this.salonService.getSalons(this.selectedShopId).subscribe(data => {
        this.salons = data;
        this.selectedSalonId = undefined; // Réinitialiser le salon sélectionné
        this.ventes = []; // Réinitialiser les ventes
      });
    }
  }

  // Charger les ventes du salon sélectionné
  loadVentes(): void {
    if (this.selectedSalonId) {
      this.ventesService.getVentes(this.selectedSalonId).subscribe(data => {
        this.ventes = data;
        console.log("/////////");
        console.log(this.ventes);
        console.log("/////////");



      });
    }
  }

  // Supprimer une vente
  deleteVente(id: number, shop_id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventesService.deleteVente(id, shop_id).subscribe({
          next: () => {
            Swal.fire('Supprimé !', 'La vente a été supprimée avec succès.', 'success');
            this.ventes = this.ventes.filter(vente => vente.id !== id);
          },
          error: (err) => {
            console.error('Erreur de suppression :', err);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
          }
        });
      }
    });
  }
  openVenteDetails(venteId: number,shopId: number): void {
    this.ventesService.getVenteDetails(venteId, shopId).subscribe(response => {
      this.dialog.open(VenteDetailsDialogComponent, {
        width: '600px',
        data: response.sale
      });
    });
  }
}
