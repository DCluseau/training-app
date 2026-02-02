import { Component } from '@angular/core';
import { CartService } from '../../../services/cart-service';
import { Router } from '@angular/router';
import { TrainingModel } from '../../../models/training-model.model';

@Component({
  selector: 'app-order-component',
  imports: [],
  templateUrl: './order-component.html',
  styleUrl: './order-component.css',
})
export class OrderComponent {
  trainings: TrainingModel[] = [];
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.trainings = this.cartService.getCartItems();
  }

  getTotalPrice(): number {
    return this.trainings.reduce((total, training) => total + (training.price * training.quantity), 0);
  }

  onPlaceOrder(): void {

    //A faire : créer un service pour gérer les commandes
    //Enregistrer la commande dans le local storage... ou dans un fichier json?
    alert('Commande effectuée avec succès');
    this.router.navigateByUrl('customer');
  }
}
