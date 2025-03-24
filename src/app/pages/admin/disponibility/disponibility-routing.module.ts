import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisponibilityComponent } from './disponibility.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {path: '', component: DisponibilityComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisponibilityRoutingModule { }
