import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaiesComponent } from '../../paies/paies.component';
import { ParametresComponent } from '../parametres.component';

const routes: Routes = [
  { path: '', component: ParametresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresRoutingModule { }
