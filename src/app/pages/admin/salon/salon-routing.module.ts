import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalonComponent } from './salon.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', component: SalonComponent,canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalonRoutingModule { }
