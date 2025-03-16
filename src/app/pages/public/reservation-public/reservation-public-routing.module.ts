import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationPublicComponent } from './reservation-public.component';
import { ShopDetailModalComponent } from './shop-detail-modal/shop-detail-modal.component';

const routes: Routes = [
  {path: '', component: ReservationPublicComponent},
  { path: 'shops/:shopId/salons', component: ShopDetailModalComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationPublicRoutingModule { }
