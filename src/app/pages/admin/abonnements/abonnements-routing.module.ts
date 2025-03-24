import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbonnementsComponent } from './abonnements.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {path: '', component: AbonnementsComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbonnementsRoutingModule { }
