import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbonnementsRoutingModule } from './abonnements-routing.module';
import { ViewClientsDialogComponent } from './view-clients-dialog/view-clients-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddEditSubscriptionTypeDialogComponent } from './add-edit-subscription-type-dialog/add-edit-subscription-type-dialog.component';
import { AddSubscriptionDialogComponent } from './add-subscription-dialog/add-subscription-dialog.component';


@NgModule({
  declarations: [
    ViewClientsDialogComponent,
    AddEditSubscriptionTypeDialogComponent,
    AddSubscriptionDialogComponent
  ],
  imports: [
    CommonModule,
    AbonnementsRoutingModule,
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
export class AbonnementsModule { }
