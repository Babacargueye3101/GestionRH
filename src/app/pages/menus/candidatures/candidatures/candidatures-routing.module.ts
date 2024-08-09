import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidaturesComponent } from '../candidatures.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', component: CandidaturesComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidaturesRoutingModule { }
