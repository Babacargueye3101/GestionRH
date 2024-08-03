import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'employements', loadChildren: () => import('./employements/employements.module').then(m => m.EmployementsModule) },
  { path: 'candidatures', loadChildren: () => import('./candidatures/candidatures.module').then(m => m.CandidaturesModule) },
  { path: 'paies', loadChildren: () => import('./paies/paies.module').then(m => m.PaiesModule) },
  { path: 'formation', loadChildren: () => import('./formation/formation.module').then(m => m.FormationModule) },
  { path: 'performance', loadChildren: () => import('./performance/performance.module').then(m => m.PerformanceModule) },
  { path: 'documents', loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule) },
  { path: 'conges', loadChildren: () => import('./conges/conges.module').then(m => m.CongesModule) },
  { path: 'rapports', loadChildren: () => import('./rapports/rapports.module').then(m => m.RapportsModule) },
  { path: 'parametres', loadChildren: () => import('./parametres/parametres.module').then(m => m.ParametresModule) },
  { path: 'profil', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule) },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
