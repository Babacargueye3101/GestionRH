import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalonRoutingModule } from './salon-routing.module';
import { BoutiqueRoutingModule } from '../boutique/boutique-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CreateSalonComponent } from './create-salon/create-salon.component';
import { UpdateSalonComponent } from './update-salon/update-salon.component';
import { ViewSalonComponent } from './view-salon/view-salon.component';
import { ListSalonServiceComponent } from './list-salon-service/list-salon-service.component';
import { CreateServiceSalonComponent } from './create-service-salon/create-service-salon.component';
import { UpdateServiceComponent } from './update-service/update-service.component';


@NgModule({
  declarations: [
    CreateSalonComponent,
    UpdateSalonComponent,
    ViewSalonComponent,
    ListSalonServiceComponent,
    CreateServiceSalonComponent,
    UpdateServiceComponent
  ],
  imports: [
    CommonModule,
    SalonRoutingModule,
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
  ]
})
export class SalonModule { }
