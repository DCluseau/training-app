import { ApiService } from './../../../services/api-service';
import { Component, Injectable, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerModel } from '../../../models/customer.model';
import { Router } from '@angular/router';
import { TrainingModel } from '../../../models/training-model.model';

@Component({
  selector: 'app-customer-component',
  imports: [FormsModule],
  templateUrl: './customer-component.html',
  styleUrl: './customer-component.css',
})

@Injectable({
  providedIn: 'root',
})

export class CustomerComponent {
  customer : CustomerModel;
  tabCustomers : CustomerModel[] = [];
  constructor(public apiService : ApiService, private router : Router){
    this.apiService.getCustomers().subscribe({
      next : (data) => this.tabCustomers = data
    });
    this.customer = this.apiService.currentCustomer;
    if(this.customer.id < 0){
      this.customer.cart = [];
    }
   }
  ngOnInit(): void{
    this.apiService.getCustomers().subscribe({
      next : (data) => this.tabCustomers = data
    });
    this.customer = this.apiService.currentCustomer;
    if(this.customer.id < 0){
      this.customer.cart = [];
    }
   }

  onSaveCustomer(customer: CustomerModel){
    // Récupérer d'abord l'id si il existe
    this.customer = customer;
    customer.id = this.searchCustomer(customer);
    console.log(this.customer);
    if(customer.id < 0){
      this.customer.id = this.getLastId() + 1;
      this.apiService.createCustomer(this.customer).subscribe({
        next : (data) => console.log(JSON.stringify(data))
      });
    }else{
      this.apiService.saveCustomer(this.customer).subscribe({
        next : (data) => console.log(JSON.stringify(data))
      });
    }
    this.apiService.setCurrentCostumer(this.customer);
    console.log(this.customer);
    this.router.navigateByUrl('customers');
  }

  onSubmit(formValue: any): void {
    console.log('Form submitted with value:', formValue);
  }

  getLastId(){
    var id : number = 0;
    this.getCustomers();
    for(var i = 0; i < this.tabCustomers.length; i++){
      if(this.tabCustomers[i].id > id){
        id = this.tabCustomers[i].id;
      }
    }
    return id;
  }

  // Récupérer tous les customers
  getCustomers(){
    this.apiService.getCustomers().subscribe({
      next : (data) => {
        this.tabCustomers = data;
      }
    });
  }

  // Chercher un customer
  searchCustomer(customer : CustomerModel){
    if(this.tabCustomers.length == 0){
      this.getCustomers();
    }
    for(var i = 0; i < this.tabCustomers.length; i++){
      if(this.tabCustomers[i].lastname == customer.lastname && this.tabCustomers[i].firstname == customer.firstname){
        customer.id = this.tabCustomers[i].id;
        return customer.id;
      }
    }
    return -1;
  }

  addToCart(training : TrainingModel){
    var found : boolean = false;
    for(var i = 0; i < this.customer.cart.length; i++){
      if(this.customer.cart[i].id == training.id){
        this.customer.cart[i].quantity += 1;
        found = true;
      }
    }
    if(!found){
      this.customer.cart.push(training);
    }
    console.log(this.customer);
    if(this.customer.id < 0){
      alert("Veuillez entrer vos informations de livraison");
      return false;
    }else{
      this.apiService.saveCustomer(this.customer);
      return true;
    }
  }
}
