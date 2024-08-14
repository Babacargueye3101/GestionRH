import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, parseISO, format } from 'date-fns';
import { Conge } from 'src/app/models/conge.model';
import { CongesService } from 'src/app/services/conges.service';
import { addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarMonthViewDay } from 'angular-calendar';
import { DemandecongesComponent } from '../demandeconges/demandeconges.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-viewdetail-calendar',
  templateUrl: './viewdetail-calendar.component.html',
  styleUrls: ['./viewdetail-calendar.component.scss']
})
export class ViewdetailCalendarComponent implements OnInit {

  events: CalendarEvent[]= [];
  viewDate: Date = new Date();
  user!: any;
  currentUser: any;
  congeList: Conge[] = [];



  leaveTypes = [
    { value: 'paid', viewValue: 'Congés Payés' },
    { value: 'sick', viewValue: 'Congés Maladie' },
    { value: 'unpaid', viewValue: 'Congés Sans Solde' },
    { value: 'parental', viewValue: 'Congés Parentaux' },
    { value: 'sabbatical', viewValue: 'Congés Sabbatiques' },
    { value: 'annual', viewValue: 'Congés Annuels' },
    { value: 'child_sick', viewValue: 'Congés pour Enfants Malades' },
    { value: 'training', viewValue: 'Congés de Formation' },
    { value: 'family', viewValue: 'Congés pour Raisons Familiales' },
    { value: 'volunteer', viewValue: 'Congés pour Volontariat' },
    { value: 'recovery', viewValue: 'Congés de Récupération' },
    { value: 'travel', viewValue: 'Congés pour Voyage' }
  ];

  constructor(private congeservice: CongesService, private dialog: MatDialog) {}

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
      this.updateEvents(this.congeList);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes de congés', error);
    }
  }

  updateEvents(list: any): void {
    this.events = list.filter((leave: Conge) => leave.status === 'approuve').map((leave: Conge) => {
      const start = new Date(leave.start_date);
      const end = addDays(leave.end_date, 1);
      return {
        start,
        end,
        title: ` ( ${this.getViewValueByValue(leave?.leave_type) }) ${leave.full_name || 'Nom non spécifié'} - ${leave.days_taken} jours <br> Date début: ${this.formatDate(leave.start_date)}<br> Date fin: ${this.formatDate(leave.end_date)} <br> ${leave.reason}`,
        color: {
          primary: '#1e90ff',
          secondary: '#D1E8FF'
        }
      };
    });
  }

  navigate(direction: number): void {
    // Ajouter ou soustraire un mois pour naviguer dans le calendrier
    this.viewDate = direction > 0 ? addMonths(this.viewDate, 1) : subMonths(this.viewDate, 1);
  }

  goToToday(): void {
    this.viewDate = new Date(); // Revenir à aujourd'hui
  }

  getViewValueByValue(value: string): string | undefined {
    const leaveType = this.leaveTypes.find(leave => leave.value === value);
    return leaveType ? leaveType.viewValue : undefined;
  }

  formatDate(inputDate: string): string {
    // Convertir la chaîne de caractères en objet Date
    const date = parseISO(inputDate);
    // Formater la date en DD MMMM YYYY
    return format(date, 'dd MMMM yyyy', { locale: fr });
  }

  handleDayClick({ day, sourceEvent }: { day: CalendarMonthViewDay, sourceEvent: MouseEvent | KeyboardEvent }): void {

    this.dialog.open(DemandecongesComponent, {
      width: '950px',
      height: '630px',
    });
  }
}
