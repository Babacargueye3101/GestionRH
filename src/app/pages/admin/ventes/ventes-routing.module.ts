import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentesComponent } from './ventes.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', component: VentesComponent,canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentesRoutingModule { }
