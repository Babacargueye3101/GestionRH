import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { VenteService } from 'src/app/services/ventes/vente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-vente',
  templateUrl: './create-vente.component.html',
  styleUrls: ['./create-vente.component.scss']
})
export class CreateVenteComponent implements OnInit {

  venteForm: FormGroup;
  listShop: Shop[] = [];
  shopId!: number;
  listProducts: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private venteService: VenteService,
    private dialogRef: MatDialogRef<CreateVenteComponent>,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.venteForm = this.fb.group({
      shop_id: [null, Validators.required],
      buyer_name: ['', Validators.required],
      buyer_surname: ['', Validators.required],
      channel: ['', Validators.required],
      total_price: ['', Validators.required],
      paid_amount: ['', Validators.required],
      remaining_amount: ['', Validators.required],
      payment_method: ['', Validators.required],
      delivered: [false],
      sale_date: ['', Validators.required],
      products: [[]]
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.shopId = Number(params.get('shopId'));
      console.log(`Shop ID: ${this.shopId}`);
    });
    this.shopService.getShops().subscribe(
      (response) => {
        this.listShop = response;
      },
      (error) => {
        console.error("Erreur de récupération des boutiques :", error);
      }
    );

    this.venteForm.get('shop_id')?.valueChanges.subscribe(() => {
      this.onShopChange();
    });
  }

  onShopChange() {
    const shopId = this.venteForm.get('shop_id')?.value;

    if (shopId) {
      this.productService.getProductsByShop(shopId).subscribe(
        (response) => {
          this.listProducts = response;
        },
        (error) => {
          console.error("Erreur de récupération des produits :", error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.venteForm.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs', 'error');
      return;
    }

    const shopId = 2; // À rendre dynamique selon le contexte
    const venteData = this.venteForm.value;

    this.venteService.createVente(shopId, venteData).subscribe(
      (response) => {
        Swal.fire('Succès', 'Vente créée avec succès', 'success');
        this.dialogRef.close(response);
      },
      (error) => {
        Swal.fire('Erreur', 'Une erreur est survenue', 'error');
        console.error(error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
