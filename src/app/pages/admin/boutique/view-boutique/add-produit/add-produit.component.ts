import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { response } from 'express';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/services/product-service/product.service';


@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit{
  productForm: FormGroup;
  errorMessage: string = '';
  shopId!: number;

  isSubmitting: boolean = false;

  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // ✅ Injecter les données du modal
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // ✅ Récupération du shopId passé en paramètre
    if (this.data && this.data.shopId) {
      this.shopId = this.data.shopId;
    } else {
      console.error('Aucun Shop ID trouvé !');
    }
    this.loadCategories();
  }

  save() {
    if (this.productForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
      return;
    }

    this.spinner.show();
    const newProduct = this.productForm.value;

    // Désactiver le bouton pour empêcher le double envoi
    this.isSubmitting = true;

    this.productService.createProduct(this.shopId, newProduct).subscribe({
      next: (product) => {
        this.productForm.reset();
        this.errorMessage = '';
        this.dialogRef.close(product); // ✅ Fermer le modal après succès
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de la création du produit.";
        console.error(err);
      },
      complete: () => {
        this.spinner.hide();
        this.isSubmitting = false; // Réactiver après le complet
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  loadCategories() {
    this.spinner.show();
    this.productService.getCategories(this.shopId).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des catégories :", err);
      },
      complete: () => this.spinner.hide()
    });
  }

}
