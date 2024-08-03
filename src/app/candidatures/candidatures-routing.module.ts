import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidaturesComponent } from '../pages/menus/candidatures/candidatures.component';

const routes: Routes = [
  { path: '', component: CandidaturesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidaturesRoutingModule { }