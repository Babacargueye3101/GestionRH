import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRdvComponent } from './create-rdv/create-rdv.component';
import { RdvService } from 'src/app/services/rdv.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from 'src/app/models/appointment.model';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addHours, addMonths, setHours, startOfDay, startOfWeek, subMonths } from 'date-fns';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.scss']
})
export class RdvComponent implements OnInit {
  compagny: any;
  appointments: any []=[];
  totalAppointments=0;

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  viewStart: Date = setHours(new Date(), 8);
  calendarEvents: CalendarEvent[] = [];



  private appointmentStatuses: { value: string; viewValue: string }[] = [
    { value: 'planned', viewValue: 'Planifié' },
    { value: 'in_progress', viewValue: 'En cours' },
    { value: 'completed', viewValue: 'Terminé' },
    { value: 'canceled', viewValue: 'Annulé' }
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Appointment>();

  selectedView: string = 'tabular';

  constructor(public dialog: MatDialog, private appointmentService: RdvService){
    // Assurez-vous que la vue commence à 8h
    this.viewDate = startOfDay(new Date());
    this.viewDate.setHours(8, 0, 0);
  }


  ngOnInit(): void {
    this.loadAppointments();
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
      this.loadAppointments(page, 10)
      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    };
  }

  loadAppointments(pageIndex: number = 0, pageSize: number = 10): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      var currentUser = JSON.parse(user);
      this.compagny= currentUser.compagny_id;
    }
    this.appointmentService.getAppointments(pageIndex, pageSize,this.compagny, currentUser).subscribe(
      (data: any[]) => {
        this.appointments = data;
        this.totalAppointments= this.appointments.length
        console.log(this.appointments);

      },
      error => {
        console.error('Error loading appointments:', error);
      }
    );
  }


  openCreateAppointmentDialog() {
    const dialogRef = this.dialog.open(CreateRdvComponent, {
      width: '600px',
      height: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result from the dialog if needed
    });
  }

  getStatusViewValue(value: string): string {
    const status = this.appointmentStatuses.find(status => status.value === value);
    return status ? status.viewValue : 'Unknown Status';
  }



  viewTabular(){
    this.selectedView = 'tabular'
  }

  // Fonction pour changer en vue calendaire
  viewCalendar() {
    this.selectedView = 'calendar';
    // Convertir les rendez-vous en événements de calendrier
    this.calendarEvents = this.appointments.map(appointment => ({
      start: new Date(appointment.start_time),
      end: new Date(appointment.end_time),
      title: appointment.appointment_type,
      color: { primary: '#3f51b5', secondary: '#f0069e' }, // Couleur personnalisée
      meta: appointment // Stocker des infos supplémentaires
    }));
  }


  handleEventClick(eventData: { event: CalendarEvent<any>; sourceEvent: MouseEvent | KeyboardEvent }) {
    const clickedEvent = eventData.event;
    console.log(clickedEvent);
    const message = `Voici les détails de votre rendez-vous :\n\n` +
    `Type : ${clickedEvent.meta.appointment_type}\n\n` +
    `Date : ${new Date(clickedEvent.meta.start_time).toLocaleDateString()}\n\n` +
    `Heure de début : ${new Date(clickedEvent.meta.start_time).toLocaleTimeString()}\n\n` +
    `Heure de fin : ${new Date(clickedEvent.meta.end_time).toLocaleTimeString()}\n` +
    `Lieu : ${clickedEvent.meta.location}\n` +
    `Description : ${clickedEvent.meta.description}\n` +
    `Statut : ${clickedEvent.meta.status}`;
    Swal.fire({
      title: clickedEvent.title,
      text: message,
      icon: 'info',
      showConfirmButton: false,
    });

  }



  navigate(direction: number): void {
    // Ajouter ou soustraire un mois pour naviguer dans le calendrier
    this.viewDate = direction > 0 ? addMonths(this.viewDate, 1) : subMonths(this.viewDate, 1);
  }

  goToToday(): void {
    this.viewDate = new Date(); // Revenir à aujourd'hui
  }



}
