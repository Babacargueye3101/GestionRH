import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbonnementRoutingModule } from './abonnement-routing.module';
import { SouscriptionAbonnementComponent } from './souscription-abonnement/souscription-abonnement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    SouscriptionAbonnementComponent
  ],
  imports: [
    CommonModule,
    AbonnementRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AbonnementModule { }
