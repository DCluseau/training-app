import { Injectable } from '@angular/core';
import { CustomerModel } from '../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customer : CustomerModel = new CustomerModel(0, '', '', '', '', '', []);
  constructor(private http : HttpClient){

  }

  saveCustomer(customer : CustomerModel) : Observable<any>{
    return this.http.post<any>("http://localhost:3000/customer", JSON.stringify(customer));
  }
}
