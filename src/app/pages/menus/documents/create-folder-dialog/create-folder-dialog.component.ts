import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-folder-dialog',
  templateUrl: './create-folder-dialog.component.html',
  styleUrls: ['./create-folder-dialog.component.scss']
})
export class CreateFolderDialogComponent {
  folderName!: string;

  constructor(public dialogRef: MatDialogRef<CreateFolderDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
