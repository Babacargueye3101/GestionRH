import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentesRoutingModule } from './ventes-routing.module';
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
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { CreateVenteComponent } from './create-vente/create-vente.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { ListVentesComponent } from './list-ventes/list-ventes.component';
import { VenteDetailsDialogComponent } from './vente-details-dialog/vente-details-dialog.component';
import { PaymentMethodeComponent } from './payment-methode/payment-methode.component';
import { CanalComponent } from './canal/canal.component';




@NgModule({
  declarations: [
    CreateVenteComponent,
    ListVentesComponent,
    VenteDetailsDialogComponent,
    PaymentMethodeComponent,
    CanalComponent
  ],
  exports: [
    ListVentesComponent
  ],
  imports: [
    CommonModule,
    VentesRoutingModule,
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
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatListModule
  ]
})
export class VentesModule { }
