import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueComponent } from './boutique.component';
import { AuthGuard } from 'src/app/auth.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BoutiqueComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoutiqueRoutingModule { }
