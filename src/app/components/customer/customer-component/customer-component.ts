import { Component, Injectable, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerModel } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer-service';
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
  customer : CustomerModel = new CustomerModel(-1, '', '', '', '', '', []);
  tabCustomers : CustomerModel[] = [];
  constructor(public customerService : CustomerService, private router : Router){ }

  ngOnInit(): void{ }

  onSaveCustomer(customer: CustomerModel){
    // Récupérer d'abord l'id si il existe
    this.customer = customer;
    customer.id = this.searchCustomer(customer);
    if(customer.id < 0){
      this.customer.id = this.getLastId() + 1;
      this.customerService.createCustomer(this.customer);
    }else{
      this.customerService.saveCustomer(this.customer);
    }
    console.log(this.customer);
    this.router.navigateByUrl('cart');
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
    this.customerService.getCustomers().subscribe({
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
    this.customer.cart.push(training);
    console.log(this.customer);
    if(this.customer.id < 0){
      alert("Veuillez entrer vos informations de livraison");
      this.router.navigateByUrl('customers');
    }else{
      this.customerService.saveCustomer(this.customer);
    }
  }
}
