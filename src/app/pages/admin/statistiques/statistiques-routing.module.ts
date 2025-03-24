import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatistiquesComponent } from './statistiques.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {path: '', component: StatistiquesComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatistiquesRoutingModule { }
