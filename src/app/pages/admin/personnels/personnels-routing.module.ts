import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelsComponent } from './personnels.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', component: PersonnelsComponent ,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelsRoutingModule { }
