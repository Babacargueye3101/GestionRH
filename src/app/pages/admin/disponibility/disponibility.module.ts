import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { DisponibilityRoutingModule } from './disponibility-routing.module';
import { CreateDisponibilityComponent } from './create-disponibility/create-disponibility.component';
import { ListDisponibilityComponent } from './list-disponibility/list-disponibility.component';
import { UpdateDisponibilityComponent } from './update-disponibility/update-disponibility.component';
import {  MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ViewDisponibilityComponent } from './view-disponibility/view-disponibility.component';
import { CreateHoraireComponent } from './create-horaire/create-horaire.component';


@NgModule({
  declarations: [
    CreateDisponibilityComponent,
    ListDisponibilityComponent,
    UpdateDisponibilityComponent,
    ViewDisponibilityComponent,
    CreateHoraireComponent
  ],
  imports: [
    CommonModule,
    DisponibilityRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [ListDisponibilityComponent]
})
export class DisponibilityModule { }
