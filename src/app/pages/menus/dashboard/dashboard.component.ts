import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { PaymentService } from 'src/app/services/payment.service';

interface Statistic {
  category: string;
  count: number;
  pourcentage: number;
}

interface PaymentStat {
  method: string;
  totalAmount: number;
  paymentCount: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartOptions: EChartsOption = {};
  chartOptionsPaiement: EChartsOption = {};
  nbreMascu = 0;
  nbreFemin = 0;
  nbreAutre = 0;
  displayedColumns: string[] = ['category', 'count', 'pourcentage'];
  dataSource: Statistic[] = [];  // Typage de dataSource

  statisqueConges: any;
  nbreTotal: any;
  leaves_this_month: any;
  payments: any;
  totalPayments: any;

  paymentStats: PaymentStat[] = [];  // Pour stocker les statistiques de paiement

  constructor(private employeeService: EmployeeServiceService, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getStaticBySex();
    this.getAllPayment();
  }

  getStaticBySex(): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
      const currentUser = JSON.parse(user);
      const compagnyId = currentUser.compagny_id;

      this.employeeService.getAll(compagnyId).subscribe((res) => {
        const total = res.total;
        this.nbreTotal = res.total;
        const statistics = res.statistic_employees;
        this.statisqueConges = res?.conge_statistique;
        this.leaves_this_month = res?.leaves_this_month;
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
          { category: 'Femmes', count: this.nbreFemin, pourcentage: pourcentageFemin },
          { category: 'Hommes', count: this.nbreMascu, pourcentage: pourcentageMascu },
          { category: 'Autres', count: this.nbreAutre, pourcentage: pourcentageAutre }
        ];
      });
    }
  }

  getAllPayment(pageIndex: number = 0, pageSize: number = 10): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
      const currentUser = JSON.parse(user);
      const compagnyId = currentUser.compagny_id;

      this.paymentService.getAllpaymentWithoutPage(compagnyId).subscribe((res: { payments: any; }) => {
        this.payments = res?.payments;
        this.totalPayments = this.payments.length;

        // Calculer les statistiques des paiements
        this.paymentStats = this.calculatePaymentStats(this.payments);

        // Define colors for each payment method
        const colors = ['#3f51b5', '#ff5722', '#4caf50', '#ffeb3b', '#9c27b0']; // Add more colors as needed

        // Update the chart options after fetching the data
        this.chartOptionsPaiement = {
          tooltip: {},
          legend: {
            data: ['Total Paiements']
          },
          xAxis: {
            type: 'category',
            data: this.paymentStats.map(stat => stat.method)
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Total Paiements',
              type: 'bar',
              data: this.paymentStats.map(stat => stat.totalAmount),
              itemStyle: {
                color: (params: any) => colors[params.dataIndex % colors.length] // Assign color based on index
              }
            }
          ]
        };
        console.log(this.payments);
      }, (error) => {
        console.log(error);
      });
    }
  }

  calculatePaymentStats(payments: any[]): PaymentStat[] {
    const paymentMethodStats: { [key: string]: { totalAmount: number, paymentCount: number } } = {};

    // Parcourir tous les paiements et accumuler les montants pour chaque méthode de paiement
    payments.forEach(payment => {
      const method = payment.payment_method;

      // Si la méthode de paiement a déjà été rencontrée, accumuler les montants
      if (paymentMethodStats[method]) {
        paymentMethodStats[method].totalAmount += parseFloat(payment.amount);
        paymentMethodStats[method].paymentCount += 1;
      } else {
        // Sinon, initialiser le montant et le nombre de paiements pour cette méthode
        paymentMethodStats[method] = { totalAmount: parseFloat(payment.amount), paymentCount: 1 };
      }
    });

    // Transformer l'objet en un tableau de PaymentStat
    return Object.keys(paymentMethodStats).map(method => ({
      method,
      totalAmount: paymentMethodStats[method].totalAmount,
      paymentCount: paymentMethodStats[method].paymentCount
    }));
  }





}
