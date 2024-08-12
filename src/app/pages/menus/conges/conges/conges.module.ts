import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CongesRoutingModule } from './conges-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CongesRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
  ]
})
export class CongesModule { }
