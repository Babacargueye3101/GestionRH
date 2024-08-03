import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaiesComponent } from '../paies.component';

const routes: Routes = [
  { path: '', component: PaiesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaiesRoutingModule { }
