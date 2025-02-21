import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueRoutingModule } from './boutique-routing.module';
import { CreateBoutiqueComponent } from './create-boutique/create-boutique.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListBoutiqueComponent } from './list-boutique/list-boutique.component';
import { ViewBoutiqueComponent } from './view-boutique/view-boutique.component';
import { AddProduitComponent } from './view-boutique/add-produit/add-produit.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AddCategoryComponent } from './view-boutique/add-category/add-category.component';

@NgModule({
  declarations: [
    CreateBoutiqueComponent,
    ListBoutiqueComponent,
    ViewBoutiqueComponent,
    AddProduitComponent,
    AddCategoryComponent,
  ],
  imports: [
    CommonModule,
    BoutiqueRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    NgxSpinnerModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule
  ],
  exports: [ListBoutiqueComponent]
})
export class BoutiqueModule { }
