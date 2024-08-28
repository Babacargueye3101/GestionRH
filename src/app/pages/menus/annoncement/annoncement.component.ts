import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { Announcement, AnnouncementService } from 'src/app/services/announcement.service';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-annoncement',
  templateUrl: './annoncement.component.html',
  styleUrls: ['./annoncement.component.scss']
})
export class AnnoncementComponent implements OnInit{
  user: any;
  currentUser: any;
  totalAnnonces= 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Announcement>();

  constructor(public dialog: MatDialog, private announcementService: AnnouncementService) {}

  announcements: any[] = [];


  ngOnInit(): void {
    this.loadAnnouncements()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // Optionally, set custom labels here if needed
    this.paginator._intl.itemsPerPageLabel = 'Éléments par page:';
    this.paginator._intl.nextPageLabel = 'Page suivante';
    this.paginator._intl.previousPageLabel = 'Page précédente';
    this.paginator._intl.lastPageLabel = 'Derniére page';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 sur ${length}`;
      }
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      this.loadAnnouncements(page, 10)
      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    };
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


  loadAnnouncements(pageIndex: number = 0, pageSize: number = 10): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
      var currentUser = JSON.parse(user);
      this.announcementService.getAnnouncements(pageIndex, pageSize, currentUser).subscribe({
        next: (data) => {
          this.announcements = data;
          this.totalAnnonces= this.announcements?.length;
        },
        error: (error) => {
          console.error('Error fetching announcements:', error);
        }
      });
    }

  }


  downloadAnnouncement(announcementId: number): void {
    this.announcementService.downloadAnnouncementPdf(announcementId)
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `annonce_${announcementId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

}
