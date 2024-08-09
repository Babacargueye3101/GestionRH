import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployementsComponent } from '../employements.component';
import { AuthGuard } from 'src/app/auth.guard';


const routes: Routes = [
  { path: '', component: EmployementsComponent ,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployementsRoutingModule { }
