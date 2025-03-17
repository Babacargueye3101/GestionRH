import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.orderService.getOrderById(id).subscribe(data => {
      this.order = data;
    });
  }

  updateStatus(status: string): void {
    const id = this.route.snapshot.params['id'];
    this.orderService.updateOrderStatus(id, status).subscribe(
      response => {
        this.order.status = status;
        Swal.fire('Succès', 'Le statut de la commande a été mis à jour avec succès', 'success');
      },
      error => {
        Swal.fire('Erreur', error.error.message || 'Une erreur est survenue', 'error');
      }
    );
  }
}