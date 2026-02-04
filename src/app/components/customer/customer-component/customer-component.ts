import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerModel } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-component',
  imports: [FormsModule],
  templateUrl: './customer-component.html',
  styleUrl: './customer-component.css',
})
export class CustomerComponent {
  customer : CustomerModel = new CustomerModel(0, '', '', '', '', '', []);
  constructor(public customerService : CustomerService, private router : Router){ }

  nfOnInit(): void{ }

  onSaveCustomer(customer: CustomerModel){
    this.customer = customer;
    this.customerService.saveCustomer(this.customer).subscribe({
      next: (data) => {
        console.log("Response : " , data);
      }
    });
    this.router.navigateByUrl('trainings');
  }

  onSubmit(formValue: any): void {
    console.log('Form submitted with value:', formValue);
  }
}
