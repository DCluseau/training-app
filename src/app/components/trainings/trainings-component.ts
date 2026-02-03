import { Component, ErrorHandler, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { TrainingModel } from '../../models/training-model.model';
import { ApiService } from '../../services/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainings',
  imports:[FormsModule],
  templateUrl: './trainings-component.html',
  styleUrl: './trainings-component.css',
})
export class TrainingsComponent implements OnInit {
  listTrainings : TrainingModel[] | undefined;
  error : string = "";
  constructor(private cartService : CartService, private router : Router, private apiService : ApiService){

 }

 ngOnInit() : void{
  this.getAllTrainings();
 }

 onAddToCart(training:TrainingModel){
  this.cartService.addTraining(training);
  this.apiService.getTrainings().pipe
  this.router.navigateByUrl('cart');
 }

 getAllTrainings(){
  this.apiService.getTrainings().subscribe({
    next : (data) => this.listTrainings = data,
    error : (err) => this.error = err.message,
    complete : () => this.error = ""
  });
 }
}
