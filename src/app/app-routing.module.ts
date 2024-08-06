import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./pages/menus/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'employements', loadChildren: () => import('./pages/menus/employements/employements/employements.module').then(m => m.EmployementsModule) },
  { path: 'candidatures', loadChildren: () => import('./pages/menus/candidatures/candidatures/candidatures.module').then(m => m.CandidaturesModule) },
  { path: 'paies', loadChildren: () => import('./pages/menus/paies/paies/paies.module').then(m => m.PaiesModule) },
  { path: 'formation', loadChildren: () => import('./pages/menus/formation/formation/formation.module').then(m => m.FormationModule) },
  { path: 'performance', loadChildren: () => import('./pages/menus/performance/performance/performance.module').then(m => m.PerformanceModule) },
  { path: 'documents', loadChildren: () => import('./pages/menus/documents/documents/documents.module').then(m => m.DocumentsModule) },
  { path: 'conges', loadChildren: () => import('./pages/menus/conges/conges/conges.module').then(m => m.CongesModule) },
  { path: 'rapports', loadChildren: () => import('./pages/menus/rapports/rapports/rapports.module').then(m => m.RapportsModule) },
  { path: 'parametres', loadChildren: () => import('./pages/menus/parametres/parametres/parametres.module').then(m => m.ParametresModule) },
  { path: 'profil', loadChildren: () => import('./pages/menus/profil/profil/profil.module').then(m => m.ProfilModule) },
  { path: 'login', loadChildren: () => import('./pages/menus/login/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/menus/register/register/register.module').then(m => m.RegisterModule) },
  { path: 'compagnies', loadChildren: () => import('./pages/menus/compagny/compagny/compagny.module').then(m => m.CompagnyModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
