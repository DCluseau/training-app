import { Injectable, inject } from '@angular/core';
import { TrainingModel } from '../models/training-model.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart : TrainingModel[] = [];

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
  }

  constructor(){
  }
  addTraining(training:TrainingModel){
    this.cart.push(training);
  }
  getTraining(){
    return this.cart;
  }
  getCartItems(){
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
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
