import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product-service/product.service';
import Swal from 'sweetalert2';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-view-boutique',
  templateUrl: './view-boutique.component.html',
  styleUrls: ['./view-boutique.component.scss']
})
export class ViewBoutiqueComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'price', 'stock', 'actions'];
  products = new MatTableDataSource<Product>([]);
  shopId!: number;
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.shopId = +params['id'];
      this.loadProducts();
    });
  }

  loadCategories(): void {
    this.productService.getCategories(this.shopId).subscribe({
      next: (products) => this.products.data = products,
      error: (err) => console.error('Erreur lors du chargement des produits:', err)
    });
  }

  loadProducts(): void {
    this.productService.getProducts(this.shopId).subscribe({
      next: (products) => this.products.data = products,
      error: (err) => console.error('Erreur lors du chargement des produits:', err)
    });
  }

  viewProduct(product: Product): void {
    Swal.fire({
      title: product.name,
      text: `Description: ${product.description}\nPrix: ${product.price} CFA\nStock: ${product.stock}`,
      imageUrl: product.image_url,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });
  }

  editProduct(product: Product): void {
    let selectedFile: File | null = null;
    Swal.fire({
      title: 'Modifier le produit',
      html: `
        <input id="productName" class="swal2-input" value="${product.name}">
        <input id="productDescription" class="swal2-input" value="${product.description}">
        <input id="productPrice" class="swal2-input" type="number" value="${product.price}">
        <input id="productStock" class="swal2-input" type="number" value="${product.stock}">
        <input id="productImage" class="swal2-file" type="file" accept="image/*">
      `,
      showCancelButton: true,
      confirmButtonText: 'Modifier',
      didOpen: () => {
        const fileInput = document.getElementById('productImage') as HTMLInputElement;
        fileInput.addEventListener('change', (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target.files && target.files.length > 0) {
            selectedFile = target.files[0];
          }
        });
      },
      preConfirm: () => {
        const name = (document.getElementById('productName') as HTMLInputElement).value;
        const description = (document.getElementById('productDescription') as HTMLInputElement).value;
        const price = +(document.getElementById('productPrice') as HTMLInputElement).value;
        const stock = +(document.getElementById('productStock') as HTMLInputElement).value;

        if (!name || !description || !price || !stock) {
          Swal.showValidationMessage('Tous les champs sont obligatoires');
          return false;
        }

        return { name, description, price, stock };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProduct = { ...product, ...result.value };
        // Création de FormData pour gérer l’image
        const formData = new FormData();
        formData.append('name', updatedProduct.name);
        formData.append('description', updatedProduct.description);
        formData.append('price', updatedProduct.price.toString());
        formData.append('stock', updatedProduct.stock.toString());
        if (selectedFile) {
          formData.append('image', selectedFile);
        }
        this.productService.updateProduct(this.shopId, product.id!, formData).subscribe(() => {
          Swal.fire('Succès', 'Produit mis à jour avec succès', 'success');
          this.loadProducts();
        });
      }
    });
  }

  deleteProduct(productId: number): void {
    Swal.fire({
      title: 'Supprimer ce produit ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(this.shopId, productId).subscribe(() => {
          Swal.fire('Supprimé!', 'Produit supprimé avec succès.', 'success');
          this.loadProducts();
        });
      }
    });
  }

  createProduit(): void {
    const dialogRef = this.dialog.open(AddProduitComponent, {
      width: '800px',
      data: { shopId: this.shopId },
      disableClose: true // Prevent closing by clicking outside
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        // Update the local data first for immediate feedback
        if (result.product) {
          const currentData = this.products.data;
          this.products.data = [result.product, ...currentData];
        }
        
        // Show success message
        Swal.fire({
          title: 'Succès!',
          text: 'Produit créé avec succès',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });

        // Refresh the full list to ensure synchronization
        this.loadProducts();
      }
    });
  }

  createCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px',
      data: { shopId: this.shopId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire('Succès', 'Catégorie créée avec succès', 'success');
        this.loadProducts();
      }
    });
  }
}
