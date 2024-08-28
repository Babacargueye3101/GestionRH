import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RdvComponent } from '../rdv.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', component: RdvComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RdvRoutingModule { }
