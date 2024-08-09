import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaiesComponent } from '../../paies/paies.component';
import { ParametresComponent } from '../parametres.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', component: ParametresComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresRoutingModule { }
