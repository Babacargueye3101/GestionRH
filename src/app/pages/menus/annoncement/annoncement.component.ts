import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';

@Component({
  selector: 'app-annoncement',
  templateUrl: './annoncement.component.html',
  styleUrls: ['./annoncement.component.scss']
})
export class AnnoncementComponent implements OnInit{

  constructor(public dialog: MatDialog, private announcementService: AnnouncementService) {}

  announcements: any[] = [];
  ngOnInit(): void {
    this.loadAnnouncements()
  }

  openCreateAnnouncementDialog(): void {
    const dialogRef = this.dialog.open(CreateAnnouncementComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result from the dialog if needed
    });
  }

  openEditAnnouncementDialog(announcement: any): void {
    const dialogRef = this.dialog.open(EditAnnouncementComponent, {
      width: '500px',
      data: announcement // Passez l'annonce à modifier comme données
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the updated announcement here (e.g., refresh the list)
        console.log('The dialog was closed, updated announcement:', result);
      }
    });
  }


  loadAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe({
      next: (data) => {
        this.announcements = data;
        console.log(this.announcements);

      },
      error: (error) => {
        console.error('Error fetching announcements:', error);
      }
    });
  }

}
