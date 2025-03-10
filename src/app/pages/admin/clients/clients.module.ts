import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    CreateClientComponent,
    DetailClientComponent,
    ListClientComponent,
    UpdateClientComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
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
    MatToolbarModule
  ],
  exports: [ListClientComponent]
})
export class ClientsModule { }
