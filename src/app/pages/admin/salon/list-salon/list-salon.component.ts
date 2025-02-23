import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { SalonService } from 'src/app/services/salons/salon.service';
import Swal from 'sweetalert2';
import { CreateSalonComponent } from '../create-salon/create-salon.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateSalonComponent } from '../update-salon/update-salon.component';

@Component({
  selector: 'app-list-salon',
  templateUrl: './list-salon.component.html',
  styleUrls: ['./list-salon.component.scss']
})
export class ListSalonComponent implements OnInit {

  salons: any[] = [];
  shops: any[] = [];
  selectedShopId: number | null = null;

  constructor(
    private salonService: SalonService,
    private shopService: ShopService,
    private dialog: MatDialog // Ajouter le service de dialog
  ) {}

  ngOnInit(): void {
    this.loadShops();
  }

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

  loadSalons(): void {
    if (this.selectedShopId) {
      this.salonService.getSalons(this.selectedShopId).subscribe(
        (response) => {
          this.salons = response;
        },
        (error) => {
          console.error('Erreur lors de la récupération des salons:', error);
        }
      );
    }
  }

  deleteSalon(salonId: number): void {
    if (this.selectedShopId) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Cette action est irréversible !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer !'
      }).then((result) => {
        if (result.isConfirmed) {
          this.salonService.deleteSalon(this.selectedShopId!, salonId).subscribe(
            () => {
              Swal.fire('Supprimé!', 'Le salon a été supprimé.', 'success');
              this.loadSalons();
            },
            (error) => {
              Swal.fire('Erreur!', 'Échec de la suppression du salon.', 'error');
              console.error(error);
            }
          );
        }
      });
    }
  }

  editSalon(salon: any): void {

    const dialogRef = this.dialog.open(UpdateSalonComponent, {
      width: '600px',
      data: salon
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSalons();
      }
    });
  }

}
