import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployementsRoutingModule } from './employements-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployementsComponent } from '../employements.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    EmployementsComponent
  ],
  imports: [
    CommonModule,
    EmployementsRoutingModule,
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
    MatPaginatorModule
  ]
})
export class EmployementsModule { }
