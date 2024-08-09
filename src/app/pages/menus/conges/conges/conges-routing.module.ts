import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongesComponent } from '../conges.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', component: CongesComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CongesRoutingModule { }
