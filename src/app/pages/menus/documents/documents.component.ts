import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateFolderDialogComponent } from './create-folder-dialog/create-folder-dialog.component';
import { Folder, FolderService } from 'src/app/services/folder.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  folders: Folder[] = [];

  constructor(public dialog: MatDialog, private folderService: FolderService, private router: Router) {}

  openCreateFolderDialog(): void {
    const dialogRef = this.dialog.open(CreateFolderDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Appelle la méthode pour créer un dossier avec le résultat


        this.createFolder(result);
      }
    });
  }
  currentUser:any;
  user: any;
  createFolder(folderName: string): void {

    this.user = localStorage.getItem('currentUser');
    if (this.user) {
      this.currentUser = JSON.parse(this.user);
    }
    const folderData = {
      name: folderName,
      compagny_id: this.currentUser.compagny_id // Assure-toi de définir cette variable
    };

    // Envoyer la requête au backend pour créer le dossier
    this.folderService.createFolder(folderData).subscribe(response => {
      console.log(response);

    });
  }

  ngOnInit(): void {
    this.loadFolders();
  }

  loadFolders(): void {
    this.folderService.getFolders().subscribe(folders => {
      this.folders = folders;
    });
  }

  gotoListDocument(id: number){
    this.router.navigate(['/documents', id])
  }


}
