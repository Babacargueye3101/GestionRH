import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product-service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  categoryName: string = '';  // Nom de la catégorie
  shopId: number;
  categoryId?: number; // ID de la catégorie pour mise à jour
  isEditMode: boolean = false; // Mode édition ou création

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {
    this.shopId = data.shopId;

    // Vérifie si une catégorie est fournie (mode édition)
    if (data.category) {
      this.isEditMode = true;
      this.categoryId = data.category.id;
      this.categoryName = data.category.name;
    }
  }

  // Soumission du formulaire (création ou mise à jour)
  onSubmit(): void {
    if (!this.categoryName.trim()) {
      Swal.fire('Erreur', 'Le nom de la catégorie est requis', 'error');
      return;
    }

    const categoryData = { name: this.categoryName };

    this.productService.createCategory(this.shopId, categoryData).subscribe(
      (response) => {
        Swal.fire('Succès', 'Catégorie créée avec succès', 'success');
        this.dialogRef.close(response);
      },
      (error) => {
        Swal.fire('Erreur', 'Une erreur est survenue lors de la création', 'error');
        console.error(error);
      }
    );
  }

  // Annulation
  onCancel(): void {
    this.dialogRef.close();
  }
}
