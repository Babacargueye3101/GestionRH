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
import { NgxEchartsModule } from 'ngx-echarts';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DetailCompagnyComponent } from './pages/menus/compagny/detail-compagny/detail-compagny.component';
import { EditCompagnyComponent } from './pages/menus/compagny/edit-compagny/edit-compagny.component';
import { UploadLogComponent } from './pages/menus/compagny/upload-log/upload-log.component';
import { DemandecongesComponent } from './pages/menus/conges/demandeconges/demandeconges.component';
import { MatChipsModule } from '@angular/material/chips';
import { ValidercongeComponent } from './pages/menus/conges/validerconge/validerconge.component';
import { ViewdetailCongeComponent } from './pages/menus/conges/viewdetail-conge/viewdetail-conge.component';
import { ViewdetailCalendarComponent } from './pages/menus/conges/viewdetail-calendar/viewdetail-calendar.component';

registerLocaleData(localeFr, 'fr');
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
    DetailCompagnyComponent,
    EditCompagnyComponent,
    UploadLogComponent,
    DemandecongesComponent,
    ValidercongeComponent,
    ViewdetailCongeComponent,
    ViewdetailCalendarComponent,
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
    MatSnackBarModule,
    MatGridListModule,
    MatTableModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatPaginatorModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
