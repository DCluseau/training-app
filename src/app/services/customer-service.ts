import { Injectable } from '@angular/core';
import { CustomerModel } from '../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customer : CustomerModel = new CustomerModel(-1, '', '', '', '', '', []);
  constructor(private http : HttpClient){ }

  saveCustomer(customer : CustomerModel) : Observable<any>{
    return this.http.put<any>("http://localhost:3000/customers/" + customer.id, JSON.stringify(customer));
  }

  createCustomer(customer : CustomerModel){
    return this.http.post<any>("http://localhost:3000/customers", JSON.stringify(customer));
  }

  deleteCustomer(customer : CustomerModel){
      return this.http.delete<any>("http://localhost:3000/customers/" + customer.id);
  }

  getCustomers(){
    return this.http.get<any>("http://localhost:3000/customers");
  }
}
