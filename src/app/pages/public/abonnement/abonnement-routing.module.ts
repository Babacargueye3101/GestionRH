import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbonnementComponent } from './abonnement.component';

const routes: Routes = [
  {path:  '', component: AbonnementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbonnementRoutingModule { }
