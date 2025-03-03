import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisponibilityComponent } from './disponibility.component';

const routes: Routes = [
  {path: '', component: DisponibilityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisponibilityRoutingModule { }
