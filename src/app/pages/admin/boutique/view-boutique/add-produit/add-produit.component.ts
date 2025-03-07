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
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
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


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  save() {
    if (this.productForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
      return;
    }

    this.spinner.show();

    this.isSubmitting = true;
  
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price.toString());
    formData.append('stock', this.productForm.value.stock.toString());
    formData.append('category_id', this.productForm.value.category_id);
  
    // ✅ Vérifier si un fichier a été sélectionné avant de l'ajouter
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.createProduct(this.shopId, formData).subscribe({
      next: (product) => {
        console.log('Produit créé avec succès:', product);
        this.productForm.reset();
        this.errorMessage = '';
        this.dialogRef.close(product);
      },
      error: (err) => {
        console.error('Erreur lors de la création du produit:', err);
        this.errorMessage = "Erreur lors de la création du produit.";
      },
      complete: () => {
        this.spinner.hide();
        this.isSubmitting = false;
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
