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
import { ListPersonnelComponent } from './list-personnel/list-personnel.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DetailPersonnelComponent } from './detail-personnel/detail-personnel.component';
import { UpdatePersonnelComponent } from './update-personnel/update-personnel.component';


@NgModule({
  declarations: [
    CreatePersonnelComponent,
    ListPersonnelComponent,
    DetailPersonnelComponent,
    UpdatePersonnelComponent
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
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [ListPersonnelComponent]
})
export class PersonnelsModule { }
