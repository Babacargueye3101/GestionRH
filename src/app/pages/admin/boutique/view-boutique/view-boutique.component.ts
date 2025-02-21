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
      icon: 'info'
    });
  }

  editProduct(product: Product): void {
    Swal.fire({
      title: 'Modifier le produit',
      html: `
        <input id="productName" class="swal2-input" value="${product.name}">
        <input id="productDescription" class="swal2-input" value="${product.description}">
        <input id="productPrice" class="swal2-input" type="number" value="${product.price}">
        <input id="productStock" class="swal2-input" type="number" value="${product.stock}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Modifier',
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
        this.productService.updateProduct(this.shopId, product.id!, updatedProduct).subscribe(() => {
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
      width: '400px',
      data: { shopId: this.shopId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire('Succès', 'Produit créé avec succès', 'success');
        this.loadProducts();
        // this.productService.createProduct(this.shopId, result).subscribe(() => {
        //   Swal.fire('Succès', 'Produit créé avec succès', 'success');
        //   this.loadProducts();
        // });
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
