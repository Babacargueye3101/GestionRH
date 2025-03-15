import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationPublicComponent } from './reservation-public.component';

const routes: Routes = [
  {path: '', component: ReservationPublicComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationPublicRoutingModule { }
