import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbonnementsComponent } from './abonnements.component';

const routes: Routes = [
  {path: '', component: AbonnementsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbonnementsRoutingModule { }
