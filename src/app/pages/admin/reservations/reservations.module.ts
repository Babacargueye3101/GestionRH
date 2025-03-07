import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ListReservationComponent } from './list-reservation/list-reservation.component';


@NgModule({
  declarations: [
    CreateReservationComponent,
    ListReservationComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    FormsModule
  ],
  exports: [ListReservationComponent]
})
export class ReservationsModule { }
