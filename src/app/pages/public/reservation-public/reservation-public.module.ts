import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationPublicRoutingModule } from './reservation-public-routing.module';
import { ShopDetailModalComponent } from './shop-detail-modal/shop-detail-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReservationPublicComponent } from './reservation-public.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ShowAvailibilityComponent } from './show-availibility/show-availibility.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    ShopDetailModalComponent,
    ShowAvailibilityComponent
  ],
  imports: [
    CommonModule,
    ReservationPublicRoutingModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule
  ]
})
export class ReservationPublicModule { }
