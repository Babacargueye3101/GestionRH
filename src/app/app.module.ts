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
import { CandidaturesComponent } from './pages/menus/candidatures/candidatures.component';
import { PaiesComponent } from './pages/menus/paies/paies.component';
import { FormationComponent } from './pages/menus/formation/formation.component';
import { PerformanceComponent } from './pages/menus/performance/performance.component';
import { DocumentsComponent } from './pages/menus/documents/documents.component';
import { CongesComponent } from './pages/menus/conges/conges.component';
import { RapportsComponent } from './pages/menus/rapports/rapports.component';
import { ParametresComponent } from './pages/menus/parametres/parametres.component';
import { ProfilComponent } from './pages/menus/profil/profil.component';
import { LoginComponent } from './pages/menus/login/login.component';
import { RegisterComponent } from './pages/menus/register/register.component'; // Importez MatIconModule
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { CompagnymodalComponent } from './pages/menus/compagny/compagnymodal/compagnymodal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddEmployeeComponent } from './pages/menus/employements/add-employee/add-employee.component';
import { EditEmployeeComponent } from './pages/menus/employements/edit-employee/edit-employee.component';
import { UploaddocumentComponent } from './pages/menus/employements/uploaddocument/uploaddocument.component';
import { DetailemployeeComponent } from './pages/menus/employements/detailemployee/detailemployee.component';
import { ThousandSeparatorPipe } from './thousand-separator.pipe';
import { PdfcontratviewComponent } from './pages/menus/employements/pdfcontratview/pdfcontratview.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CandidaturesComponent,
    PaiesComponent,
    FormationComponent,
    PerformanceComponent,
    DocumentsComponent,
    CongesComponent,
    RapportsComponent,
    ParametresComponent,
    ProfilComponent,
    LoginComponent,
    RegisterComponent,
    CompagnymodalComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    UploaddocumentComponent,
    DetailemployeeComponent,
    ThousandSeparatorPipe,
    PdfcontratviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
