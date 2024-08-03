import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployementsComponent } from '../employements.component';


const routes: Routes = [
  { path: '', component: EmployementsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployementsRoutingModule { }
