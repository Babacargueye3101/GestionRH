import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/boutique/shop.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-boutique',
  templateUrl: './create-boutique.component.html',
  styleUrls: ['./create-boutique.component.scss']
})
export class CreateBoutiqueComponent {

  shopName: string = '';
  shopLocation: string = ''; // Ajout du champ location si nécessaire

  constructor(
    private dialogRef: MatDialogRef<CreateBoutiqueComponent>,
    private shopService: ShopService  // Injecter le service Shop
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  saveShop() {
    const newShop: Shop = {
      id: 0,
      name: this.shopName,
      location: this.shopLocation
    };

    this.shopService.createShop(newShop).subscribe({
      next: (shop) => {
        Swal.fire({
          title: 'Succès!',
          text: 'Boutique créée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.dialogRef.close(shop);
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors de la création.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Erreur lors de la création de la boutique:', err);
      }
    });
  }
}