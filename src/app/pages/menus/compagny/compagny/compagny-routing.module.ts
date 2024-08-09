import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompagnyComponent } from '../compagny.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', component: CompagnyComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompagnyRoutingModule { }
