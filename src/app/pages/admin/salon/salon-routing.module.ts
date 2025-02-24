import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalonComponent } from './salon.component';
import { AuthGuard } from 'src/app/auth.guard';
import { ViewSalonComponent } from './view-salon/view-salon.component';

const routes: Routes = [
  { path: '', component: SalonComponent,canActivate: [AuthGuard] },
  { path: 'shop/:shop_id/detail-salon/:id', component: ViewSalonComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalonRoutingModule { }
