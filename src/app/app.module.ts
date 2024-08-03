import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './pages/menus/dashboard/dashboard.component';
import { EmployementsComponent } from './pages/menus/employements/employements.component';
import { CandidaturesComponent } from './pages/menus/candidatures/candidatures.component';
import { PaiesComponent } from './pages/menus/paies/paies.component';
import { FormationComponent } from './pages/menus/formation/formation.component';
import { PerformanceComponent } from './pages/menus/performance/performance.component';
import { DocumentsComponent } from './pages/menus/documents/documents.component';
import { CongesComponent } from './pages/menus/conges/conges.component';
import { RapportsComponent } from './pages/menus/rapports/rapports.component';
import { ParametresComponent } from './pages/menus/parametres/parametres.component';
import { ProfilComponent } from './pages/menus/profil/profil.component'; // Importez MatIconModule


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployementsComponent,
    CandidaturesComponent,
    PaiesComponent,
    FormationComponent,
    PerformanceComponent,
    DocumentsComponent,
    CongesComponent,
    RapportsComponent,
    ParametresComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
