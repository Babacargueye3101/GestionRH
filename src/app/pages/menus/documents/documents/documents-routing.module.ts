import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from '../documents.component';
import { AuthGuard } from 'src/app/auth.guard';
import { ListDocumentComponent } from '../list-document/list-document.component';

const routes: Routes = [
  { path: '', component: DocumentsComponent,canActivate: [AuthGuard] },
  { path: ':id', component: ListDocumentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
