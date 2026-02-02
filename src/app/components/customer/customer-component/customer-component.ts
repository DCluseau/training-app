import { CartService } from './../../../services/cart-service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerModel } from '../../../models/customer.model';

@Component({
  selector: 'app-customer-component',
  imports: [FormsModule],
  templateUrl: './customer-component.html',
  styleUrl: './customer-component.css',
})
export class CustomerComponent {
  customer = new CustomerModel(0, '', '', '', '', '');
  constructor(public cartService : CartService){

  }

  nfOnInit(): void{

  }

  onSaveCustomer(customer: CustomerModel){
    this.customer = customer
    console.log(customer);
  }

  onSubmit(formValue: any): void {
    console.log('Form submitted with value:', formValue);
  }

}
