import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { ShopComponent } from './pages/public/shop/shop.component';
import { ProductDetailComponent } from './pages/public/product-detail/product-detail.component';
import { CartComponent } from './pages/public/cart/cart.component';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./pages/menus/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'admin/boutique', loadChildren: () => import('./pages/admin/boutique/boutique.module').then(m => m.BoutiqueModule) },
  { path: 'admin/salon', loadChildren: () => import('./pages/admin/salon/salon.module').then(m => m.SalonModule) },
  { path: 'admin/ventes', loadChildren: () => import('./pages/admin/ventes/ventes.module').then(m => m.VentesModule) },
  { path: 'admin/personnels', loadChildren: () => import('./pages/admin/personnels/personnels.module').then(m => m.PersonnelsModule) },
  { path: 'admin/reservations', loadChildren: () => import('./pages/admin/reservations/reservations.module').then(m => m.ReservationsModule) },
  { path: 'admin/availabilities', loadChildren: () => import('./pages/admin/disponibility/disponibility.module').then(m => m.DisponibilityModule) },
  { path: 'admin/abonnements', loadChildren: () => import('./pages/admin/abonnements/abonnements.module').then(m => m.AbonnementsModule) },
  { path: 'admin/statistiques', loadChildren: () => import('./pages/admin/statistiques/statistiques.module').then(m => m.StatistiquesModule) },
  { path: 'public/reservations', loadChildren: () => import('./pages/public/reservation-public/reservation-public.module').then(m => m.ReservationPublicModule) },
  { path: 'admin/clients', loadChildren: () => import('./pages/admin/clients/clients.module').then(m => m.ClientsModule) },
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
  { path: 'annonces', loadChildren: () => import('./pages/menus/annoncement/annoncement/annoncement.module').then(m => m.AnnoncementModule) },
  { path: 'rendez-vous', loadChildren: () => import('./pages/menus/rdv/rdv/rdv.module').then(m => m.RdvModule) },


  // { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: '', redirectTo: '/public', pathMatch: 'full' },  // Redirection vers Home
  { path: 'public', component: HomeComponent },
  { path: 'public/shop', component: ShopComponent },
  { path: 'public/product/:id', component: ProductDetailComponent },
  { path: 'public/cart', component: CartComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
