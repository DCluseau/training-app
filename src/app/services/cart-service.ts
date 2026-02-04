import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TrainingModel } from '../models/training-model.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart : TrainingModel[] = [];

  constructor(private apiService : HttpClient){
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
    this.putCart(training);
  }

    putCart(training : TrainingModel){
      this.postCartItem(training).subscribe({
      next: (data) => {
        console.log("Response : " , data);
      }
    });
    }

  public postCartItem(cartItem : TrainingModel) : Observable<any>{
    return this.apiService.post<any>("http://localhost:3000/cart", JSON.stringify(cartItem));
  }

  addTraining(training:TrainingModel){
    this.cart.push(training);
    this.putCart(training);
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
    // localStorage.setItem('cartItems', JSON.stringify(this.cart));
  }
}
