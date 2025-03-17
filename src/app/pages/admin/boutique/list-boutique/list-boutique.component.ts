import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/boutique/shop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-boutique',
  templateUrl: './list-boutique.component.html',
  styleUrls: ['./list-boutique.component.scss']
})
export class ListBoutiqueComponent implements OnInit{
  shops: Shop[] = [];
  searchText: string = '';
  filteredShops: Shop[] = [];

  constructor(private shopService: ShopService, private router: Router) {}

  ngOnInit(): void {
    this.loadShops();
  }

  loadShops() {
    this.shopService.getShops().subscribe(shops => {
      this.shops = shops;
      this.filteredShops = shops; // Initialisation
    });
  }

  viewShop(shop: Shop) {
    this.router.navigate(['/admin/boutique/detail-boutique', shop.id]);
  }


  editShop(shop: Shop): void {

    Swal.fire({
      title: 'Modifier la boutique',
      html: `
        <input id="shopName" class="swal2-input" value="${shop.name}" placeholder="Nom">
        <input id="shopLocation" class="swal2-input" value="${shop.location}" placeholder="Localisation">
      `,
      showCancelButton: true,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      },
      background: '#f4f4f4',
      preConfirm: () => {
        const shopName = (document.getElementById('shopName') as HTMLInputElement).value;
        const shopLocation = (document.getElementById('shopLocation') as HTMLInputElement).value;

        if (!shopName || !shopLocation) {
          Swal.showValidationMessage('Tous les champs sont obligatoires');
        }

        return { name: shopName, location: shopLocation };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedShop = { ...shop, ...result.value };

        this.shopService.updateShop(updatedShop.id, updatedShop).subscribe({
          next: () => {
            Swal.fire('Succès', 'Boutique modifiée avec succès', 'success');
            this.loadShops();
          },
          error: (err) => {
            Swal.fire('Erreur', 'Impossible de modifier la boutique', 'error');
            console.error(err);
          }
        });
      }
    });
  }

  deleteShop(shopId: number) {
    Swal.fire({
      title: 'Supprimer ?',
      text: 'Voulez-vous vraiment supprimer cette boutique ?',
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
        this.shopService.deleteShop(shopId).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'La boutique a été supprimée.', 'success');
            this.loadShops();
          },
          error: (err) => Swal.fire('Erreur!', 'Impossible de supprimer la boutique.', 'error')
        });
      }
    });
  }

  filterShops() {
    const search = this.searchText.toLowerCase().trim();
    this.filteredShops = this.shops.filter(shop =>
      shop.name.toLowerCase().includes(search) || 
      shop.location.toLowerCase().includes(search)
    );
  }

}
