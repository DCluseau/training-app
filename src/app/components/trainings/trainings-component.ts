import { Component, ErrorHandler, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrainingModel } from '../../models/training-model.model';
import { ApiService } from '../../services/api-service';
import { Router } from '@angular/router';
import { CustomerComponent } from '../customer/customer-component/customer-component';

@Component({
  selector: 'app-trainings',
  imports: [FormsModule],
  templateUrl: './trainings-component.html',
  styleUrl: './trainings-component.css',
})
export class TrainingsComponent implements OnInit {
  listTrainings : TrainingModel[] | undefined;
  error : string = "";
  constructor(private router : Router, private apiService : ApiService, public customer : CustomerComponent){
    this.getAllTrainings();
   }

 ngOnInit() : void{
  this.getAllTrainings();
 }

 onAddToCart(training:TrainingModel){
  if(this.customer.customer.cart == undefined){
    this.customer.customer.cart = [];
  }
  // this.customer.customer.cart.push(training);
  this.apiService.addToCart(training);
  if(this.apiService.currentCustomer.id < 0){
    this.router.navigateByUrl('customers');
  }else{
    this.router.navigateByUrl('trainings');
  }
 }

 getAllTrainings(){
  this.apiService.getTrainings().subscribe({
    next : (data) => this.listTrainings = data,
    error : (err) => this.error = err.message,
    complete : () => this.error = ""
  });
 }
}
