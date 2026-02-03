import { Router } from '@angular/router';
import { CartService } from '../../../services/cart-service';
import { TrainingModel } from './../../../models/training-model.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-component',
  imports: [],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent implements OnInit{
  listCartTrainings : TrainingModel[] = [];
  constructor(private cartService: CartService, private router:Router){

  }
  ngOnInit(){
    this.listCartTrainings = this.cartService.getTraining();
  }

  ngOnChange(){

  }

  onSubmit(){
    this.router.navigateByUrl('customer');
  }

  removeFromCart(training: TrainingModel): void {
    this.cartService.removeFromCart(training);
    this.listCartTrainings = this.cartService.getCartItems();
  }

  onPlaceOrder(): void {
    this.router.navigateByUrl('order');
  }
}
