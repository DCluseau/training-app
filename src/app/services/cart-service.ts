import { Injectable, inject } from '@angular/core';
import { TrainingModel } from '../models/training-model.model';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart : TrainingModel[] = [];

  constructor(private apiService : ApiService){
    this.getCartItems();
  }
  addToCart(training: TrainingModel): void {
    this.cart = this.getCartItems();
    let existingTraining = this.cart.find(item => item.id === training.id);

    if (existingTraining) {
      existingTraining.quantity += training.quantity;
    }
    else {
      this.cart.push(training);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
    this.putCart();
  }

    putCart(){
      this.apiService.postTrainings(this.cart);
    }

  addTraining(training:TrainingModel){
    this.cart.push(training);
  }
  getTraining(){
    return this.cart;
  }
  getCartItems(){
    return this.cart;
  }

  emptyCart(): void {
    localStorage.removeItem('cartItems');
  }

  removeFromCart(training: TrainingModel): void {
    this.cart = this.getCartItems();
    this.cart = this.cart.filter(item => item.id !== training.id);
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
  }
}
