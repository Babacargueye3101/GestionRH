import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RapportsComponent } from '../rapports.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', component: RapportsComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapportsRoutingModule { }
