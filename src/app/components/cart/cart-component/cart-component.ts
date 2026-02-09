import { Router } from '@angular/router';
import { ApiService } from '../../../services/api-service';
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
  constructor(private apiService: ApiService, private router:Router){

  }
  ngOnInit(){
    this.listCartTrainings = this.apiService.getCartItems();
  }

  ngOnChange(){

  }

  onSubmit(){
    this.router.navigateByUrl('order');
  }

  removeFromCart(training: TrainingModel): void {
    this.apiService.removeFromCart(training);
    this.listCartTrainings = this.apiService.getCartItems();
  }

  onPlaceOrder(): void {
    if(this.apiService.currentCustomer.id < 0){
      this.router.navigateByUrl('customers');
    }else{
      this.router.navigateByUrl('order');
    }
  }
}
