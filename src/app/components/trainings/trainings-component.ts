import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { TrainingModel } from '../../models/training-model.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainings',
  imports:[FormsModule],
  templateUrl: './trainings-component.html',
  styleUrl: './trainings-component.css',
})
export class TrainingsComponent implements OnInit {
  listTrainings : TrainingModel[] | undefined;
  // cartService = inject(CartService);
  // router = inject(Router);
  constructor(private cartService : CartService, private router : Router){
 }

 ngOnInit() : void{
  this.listTrainings = [
    {id:1, name:'Java', description:'Formation Java SE 8 sur 5 jours', price:1500, quantity:1},
    {id:2, name:'DotNet', description:'Formation DotNet 3 jours', price:1000, quantity:1},
    {id:3, name:'Python', description:'Formation Python/Django 5 jours', price:1500, quantity:1}
  ];
 }

 onAddToCart(training:TrainingModel){
  this.cartService.addTraining(training);
  this.router.navigateByUrl('cart');
 }
}
