import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { AnnouncementService } from 'src/app/services/announcement.service';

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
