import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      this.filteredOrders = data; // Initialisation des données filtrées
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filteredOrders = this.orders.filter(order => 
      order.client_name.toLowerCase().includes(filterValue) ||
      order.total.toString().includes(filterValue) ||
      (order.status === 'delivered' ? 'délivré' : 'en attente').toLowerCase().includes(filterValue)
    );
  }

  deleteOrder(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(id).subscribe(() => {
          Swal.fire('Supprimé!', 'La commande a été supprimée.', 'success');
          this.loadOrders();
        });
      }
    });
  }
}
