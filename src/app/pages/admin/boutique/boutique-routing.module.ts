import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueComponent } from './boutique.component';
import { AuthGuard } from 'src/app/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { ViewBoutiqueComponent } from './view-boutique/view-boutique.component';

const routes: Routes = [
  { path: '', component: BoutiqueComponent,canActivate: [AuthGuard] },
  { path: 'detail-boutique/:id', component: ViewBoutiqueComponent,canActivate: [AuthGuard] },
  { path: 'shops/:shopId/products', component: ViewBoutiqueComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoutiqueRoutingModule { }
