import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, parseISO } from 'date-fns';
import { Conge } from 'src/app/models/conge.model';
import { CongesService } from 'src/app/services/conges.service';

@Component({
  selector: 'app-viewdetail-calendar',
  templateUrl: './viewdetail-calendar.component.html',
  styleUrls: ['./viewdetail-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewdetailCalendarComponent implements OnInit {

  events: CalendarEvent[] = [];
  viewDate: Date = new Date();
  user!: any;
  currentUser: any;
  congeList: Conge[] = [];

  constructor(private congeservice: CongesService) {}

  async ngOnInit(): Promise<void> {
    this.user = localStorage.getItem('currentUser');
    if (this.user) {
      this.currentUser = JSON.parse(this.user);
    }
    await this.loadConges(0, 10, this.currentUser);

    console.log('Événements après chargement:', this.events);
  }

  async loadConges(pageIndex: number = 0, pageSize: number = 10, currentUser: any): Promise<void> {
    try {
      const response: any = await this.congeservice.getCongesList(pageIndex + 1, pageSize, currentUser).toPromise();
      this.congeList = response?.conges;
      this.updateEvents();
    } catch (error) {
      console.error('Erreur lors du chargement des demandes de congés', error);
    }
  }

  updateEvents(): void {
    this.events = this.congeList.map((leave: Conge) => {
      const start = parseISO(leave.start_date);
      const end = addDays(parseISO(leave.end_date), 1);
      console.log(`Event: ${leave.full_name} - Start: ${start}, End: ${end}`);
      return {
        start,
        end,
        title: `${leave.full_name || 'Nom non spécifié'} - ${leave.days_taken} jours`,
        color: {
          primary: '#1e90ff',
          secondary: '#D1E8FF'
        }
      };
    });
    console.log('Événements mis à jour:', this.events);
  }
}
