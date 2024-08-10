import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

interface Statistic {
  category: string;
  count: number;
  pourcentage:number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartOptions: EChartsOption = {};
  nbreMascu = 0;
  nbreFemin = 0;
  nbreAutre = 0;
  displayedColumns: string[] = ['category', 'count', 'pourcentage'];
  dataSource: Statistic[] = [];  // Typage de dataSource

  nbreTotal: any;

  constructor(private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.getStaticBySex();
  }

  getStaticBySex(): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
      const currentUser = JSON.parse(user);
      const compagnyId = currentUser.compagny_id;

      this.employeeService.getAll(compagnyId).subscribe((res) => {
        const total = res.total;
        this.nbreTotal= res.total
        const statistics = res.statistic_employees;

        const pourcentageMascu = total ? (statistics.masculins * 100) / total : 0;
        const pourcentageFemin = total ? (statistics.feminins * 100) / total : 0;
        const pourcentageAutre = total ? (statistics.autres * 100) / total : 0;

        this.chartOptions = {
          tooltip: {},
          legend: {
            data: ['Femme', 'Homme', 'Autres']
          },
          series: [
            {
              name: 'Sex',
              type: 'pie',
              radius: '50%',
              data: [
                { name: 'Homme', value: pourcentageMascu },
                { name: 'Femme', value: pourcentageFemin },
                { name: 'Autres', value: pourcentageAutre }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        this.nbreMascu = statistics.masculins || 0;
        this.nbreFemin = statistics.feminins || 0;
        this.nbreAutre = statistics.autres || 0;

        this.dataSource = [
          { category: 'Femmes', count: this.nbreFemin, pourcentage: pourcentageFemin},
          { category: 'Hommes', count: this.nbreMascu, pourcentage: pourcentageMascu},
          { category: 'Autres', count: this.nbreAutre, pourcentage: pourcentageAutre}
        ];
      });
    }
  }
}
