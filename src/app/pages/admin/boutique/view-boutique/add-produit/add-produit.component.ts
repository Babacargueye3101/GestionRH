import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required],
      variants: this.fb.array([])
    });
  }

  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  ngOnInit(): void {
    if (this.data && this.data.shopId) {
      this.shopId = this.data.shopId;
    } else {
      console.error('Aucun Shop ID trouvé !');
    }
    this.loadCategories();
    this.addVariant(); // Ajoute une variante par défaut
  }

  addVariant(): void {
    this.variants.push(this.fb.group({
      name: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
    }));
  }

  removeVariant(index: number): void {
    this.variants.removeAt(index);
  }

  save() {
    if (this.productForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
      return;
    }

    if (this.isSubmitting) {
      return; // Prevent double submission
    }

    this.spinner.show();
    this.isSubmitting = true;
    this.errorMessage = '';
  
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price.toString());
    formData.append('stock', this.productForm.value.stock.toString());
    formData.append('category_id', this.productForm.value.category_id);
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Ajout des variantes
    this.productForm.value.variants.forEach((variant: any, index: number) => {
      formData.append(`variants[${index}][name]`, variant.name);
      formData.append(`variants[${index}][stock]`, variant.stock.toString());
    });

    this.productService.createProduct(this.shopId, formData).subscribe({
      next: (product) => {
        console.log('Produit créé avec succès:', product);
        // Close the dialog with the created product
        this.dialogRef.close({ success: true, product: product });
      },
      error: (err) => {
        console.error('Erreur lors de la création du produit:', err);
        this.errorMessage = "Erreur lors de la création du produit: " + (err.error?.message || err.message || 'Erreur inconnue');
        this.spinner.hide();
        this.isSubmitting = false;
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

}
