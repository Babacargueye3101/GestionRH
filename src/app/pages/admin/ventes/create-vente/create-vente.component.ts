import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  listProducts: Product[] = [];
  selectedProducts: any[] = [];
  selectedProduct: Product | null = null;
  productQuantity: number = 1;
  productPrice: number = 0;
  remainingAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private venteService: VenteService,
    private dialogRef: MatDialogRef<CreateVenteComponent>,
    private shopService: ShopService,
    private productService: ProductService
  ) {
    this.venteForm = this.fb.group({
      shop_id: [null, Validators.required],
      buyer_name: ['', Validators.required],
      buyer_surname: ['', Validators.required],
      channel: ['', Validators.required],
      total_price: [{ value: '', disabled: true }, Validators.required],
      paid_amount: ['', Validators.required],
      remaining_amount: [{ value: '', disabled: true }],
      payment_method: ['', Validators.required],
      delivered: [false],
      sale_date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.shopService.getShops().subscribe(
      (response) => this.listShop = response,
      (error) => console.error("Erreur de récupération des boutiques :", error)
    );

    this.venteForm.get('shop_id')?.valueChanges.subscribe(() => this.onShopChange());
  }

  onShopChange() {
    const shopId = this.venteForm.get('shop_id')?.value;
    if (shopId) {
      this.productService.getProductsByShop(shopId).subscribe(
        (response) => this.listProducts = response,
        (error) => console.error("Erreur de récupération des produits :", error)
      );
    }
  }

  onProductSelect(event: any) {
    if (!event.value) return;

    this.selectedProduct = event.value;

    // Vérification pour éviter l'accès à null
    if (this.selectedProduct) {
      this.productPrice = this.selectedProduct.price;
    }
  }

  addProduct() {
    if (!this.selectedProduct || this.venteForm.get('productQuantity')?.invalid) {
      Swal.fire('Erreur', 'Veuillez sélectionner un produit et une quantité valide', 'error');
      return;
    }

    this.selectedProducts.push({
      id: this.selectedProduct.id,
      name: this.selectedProduct.name,
      quantity: this.venteForm.get('productQuantity')?.value,
      price: this.productPrice
    });

    this.clearSelectedProduct();
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
  }

  clearSelectedProduct() {
    this.selectedProduct = null;
    this.venteForm.patchValue({ productQuantity: 1 });
    this.productPrice = 0;
  }

  calculateTotal() {
    return this.selectedProducts.reduce((total, p) => total + (p.quantity * p.price), 0);
  }

  calculateRemaining() {
    this.remainingAmount = this.calculateTotal() - this.venteForm.get('paid_amount')?.value;
  }

  onSubmit() {
    if (this.venteForm.invalid || this.selectedProducts.length === 0) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs et ajouter au moins un produit', 'error');
      return;
    }

    const venteData = {
      sale: this.venteForm.value,
      products: this.selectedProducts
    };

    this.venteService.createVente(venteData.sale.shop_id, venteData).subscribe(() => {
      Swal.fire('Succès', 'Vente créée avec succès', 'success');
      this.dialogRef.close();
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
