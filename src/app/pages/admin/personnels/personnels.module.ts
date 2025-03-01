import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelsRoutingModule } from './personnels-routing.module';
import { CreatePersonnelComponent } from './create-personnel/create-personnel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    CreatePersonnelComponent
  ],
  imports: [
    CommonModule,
    PersonnelsRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class PersonnelsModule { }
