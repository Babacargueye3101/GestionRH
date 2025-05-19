import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StatisticsService } from 'src/app/services/statistics.service';

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

interface PaymentMethodStat {
  payment_method: string;
  total_amount: number;
  order_count: number;
}

interface PaymentMethodData {
  payment_methods: PaymentMethodStat[];
  total_delivered_amount: number;
  total_delivered_orders: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartOptions: EChartsOption = {};
  chartOptionsPaiement: EChartsOption = {};
  chartOptionsSalesByChannel: EChartsOption = {};
  chartOptionsSalesTrends: EChartsOption = {};
  chartOptionsTopSalesAndLoyalCustomers: EChartsOption = {};
  chartOptionsSalesByEmployee: EChartsOption = {};
  chartOptionsAllPersonnel: EChartsOption = {};

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
  nombre_employe: any;
  total_sales: any;
  pending_reservations: any;
  total_subscriptions: any;

  paymentStats: PaymentStat[] = [];  // Pour stocker les statistiques de paiement
  paymentMethodStats: PaymentMethodStat[] = []; // Pour stocker les statistiques de méthodes de paiement
  totalDeliveredAmount: number = 0;
  totalDeliveredOrders: number = 0;
  chartOptionsPaymentMethods: EChartsOption = {};

  constructor(
    private employeeService: EmployeeServiceService,
    private paymentService: PaymentService,
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.getStaticBySex();
    this.getAllPayment();
    this.getSalesByChannel();
    this.getSalesTrends();
    this.getTopSalesAndLoyalCustomers();
    this.getPaymentUsageStats();
    this.getSalesByEmployee();
    this.getAllPersonnel();
    this.summary_stats();
    this.getOrdersByPaymentMethod();
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

  getSalesByChannel(): void {
    this.statisticsService.getSalesByChannel().subscribe(data => {
      const salesByChannel = data.sales_by_channel;
      this.chartOptionsSalesByChannel = {
        tooltip: {},
        legend: {
          data: ['Ventes par canal']
        },
        xAxis: {
          type: 'category',
          data: Object.keys(salesByChannel)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Ventes par canal',
            type: 'bar',
            data: Object.values(salesByChannel),
            itemStyle: {
              color: '#efc900'
            }
          }
        ]
      };
    });
  }

  getSalesTrends(): void {
    this.statisticsService.getSalesTrends().subscribe(data => {
      const salesTrends = data.sales_trends;
      this.chartOptionsSalesTrends = {
        tooltip: {},
        legend: {
          data: ['Tendances des ventes']
        },
        xAxis: {
          type: 'category',
          data: Object.keys(salesTrends)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Tendances des ventes',
            type: 'line',
            data: Object.values(salesTrends),
            itemStyle: {
              color: '#ff5722'
            }
          }
        ]
      };
    });
  }

  getTopSalesAndLoyalCustomers(): void {
    this.statisticsService.getTopSalesAndLoyalCustomers().subscribe(data => {
      const topSales = data.top_sales;
      const loyalCustomers = data.loyal_customers;
  
      const loyalCustomerNames = loyalCustomers.map((item: any) => `${item.name} ${item.surname}`);
      const loyalCustomerPurchaseCounts = loyalCustomers.map((item: any) => item.purchase_count);
  
      this.chartOptionsTopSalesAndLoyalCustomers = {
        tooltip: {},
        legend: {
          data: ['Top ventes', 'Clients fidèles']
        },
        xAxis: {
          type: 'category',
          data: topSales.map((item: any) => item.product_name).concat(loyalCustomerNames)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Top ventes',
            type: 'bar',
            data: topSales.map((item: any) => item.quantity_sold),
            itemStyle: {
              color: '#4caf50'
            }
          },
          {
            name: 'Clients fidèles',
            type: 'bar',
            data: loyalCustomerPurchaseCounts,
            itemStyle: {
              color: '#ffeb3b'
            }
          }
        ]
      };
    });
  }

  getPaymentUsageStats(): void {
    this.statisticsService.getPaymentUsageStats().subscribe(data => {
      const paymentUsage = data.payment_usage;
      this.chartOptionsPaiement = {
        tooltip: {},
        legend: {
          data: ['Utilisation des paiements']
        },
        xAxis: {
          type: 'category',
          data: Object.keys(paymentUsage)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Utilisation des paiements',
            type: 'bar',
            data: Object.values(paymentUsage),
            itemStyle: {
              color: '#efbb60c8'
            }
          }
        ]
      };
    });
  }

  getSalesByEmployee(): void {
    this.statisticsService.getSalesByEmployee().subscribe(data => {
      const salesByEmployee = data.sales_by_employee;
      const employeeNames = salesByEmployee.map((item: any) => item.user_name);
      const salesCounts = salesByEmployee.map((item: any) => item.sales_count);
  
      this.chartOptionsSalesByEmployee = {
        tooltip: {},
        legend: {
          data: ['Ventes par employé']
        },
        xAxis: {
          type: 'category',
          data: employeeNames
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Ventes par employé',
            type: 'bar',
            data: salesCounts,
            itemStyle: {
              color: '#ffeb3b'
            }
          }
        ]
      };
    });
  }

  getAllPersonnel(): void {
    this.statisticsService.getAllPersonnel().subscribe(data => {
      this.nombre_employe = data.count
    })
  }

  summary_stats(): void {
    this.statisticsService.SummaryStats().subscribe(data => {
      this.total_sales= data.total_sales
      this.pending_reservations= data.pending_reservations
      this.total_subscriptions = data.total_subscriptions
    })
  }

  getOrdersByPaymentMethod(): void {
    this.statisticsService.getOrdersByPaymentMethod().subscribe((data: PaymentMethodData) => {
      this.paymentMethodStats = data.payment_methods;
      this.totalDeliveredAmount = data.total_delivered_amount;
      this.totalDeliveredOrders = data.total_delivered_orders;
      
      // Préparer les données pour le graphique
      const paymentMethods = this.paymentMethodStats.map(stat => stat.payment_method);
      const totalAmounts = this.paymentMethodStats.map(stat => stat.total_amount);
      const orderCounts = this.paymentMethodStats.map(stat => stat.order_count);
      
      this.chartOptionsPaymentMethods = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Montant total', 'Nombre de commandes']
        },
        xAxis: {
          type: 'category',
          data: paymentMethods,
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: [
          {
            type: 'value',
            name: 'Montant',
            position: 'left'
          },
          {
            type: 'value',
            name: 'Commandes',
            position: 'right'
          }
        ],
        series: [
          {
            name: 'Montant total',
            type: 'bar',
            data: totalAmounts,
            itemStyle: {
              color: '#4caf50'
            },
            yAxisIndex: 0
          },
          {
            name: 'Nombre de commandes',
            type: 'bar',
            data: orderCounts,
            itemStyle: {
              color: '#2196f3'
            },
            yAxisIndex: 1
          }
        ]
      };
    });
  }


}