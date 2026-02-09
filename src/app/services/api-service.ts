import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TrainingModel } from '../models/training-model.model';
import { CustomerModel } from '../models/customer.model';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  currentCustomer : CustomerModel = new CustomerModel(-1, '', '', '', '', '', []);
  tabUsers : UserModel[] = [];
  cart : TrainingModel[] = [];
  constructor(private http: HttpClient, private router: Router){ }

  // Méthodes pour les trainings
  public getTrainings(){
    return this.http.get<TrainingModel[]>(environment.host + "/trainings");
  }

  public getTraining(id : number){
    return this.http.get<TrainingModel>(environment.host + "/trainings/" + id);
  }

  public postTrainings(cart : TrainingModel[]){
    this.http.post<TrainingModel[]>(environment.host + "/trainings", cart);
  }

  // Méthodes pour le customer (cart + customer)
  saveCustomer(customer : CustomerModel) : Observable<CustomerModel>{
    return this.http.put<CustomerModel>(environment.host + "/customers/" + customer.id, JSON.stringify(customer), {headers: {'Content-Type' : 'application/json'}});
  }

  createCustomer(customer : CustomerModel) : Observable<CustomerModel>{
    return this.http.post<CustomerModel>(environment.host + "/customers", JSON.stringify(customer), {headers: {'Content-Type' : 'application/json'}});
  }

  deleteCustomer(customer : CustomerModel) : Observable<CustomerModel>{
      return this.http.delete<CustomerModel>(environment.host + "/customers/" + customer.id);
  }

  getCustomers(){
    return this.http.get<any>(environment.host + "/customers");
  }

  setCurrentCostumer(customer: CustomerModel){
    this.currentCustomer = customer;
  }

  // saveCustomers(customer : CustomerModel){
  //   return this.http.put<any>(environment.host + "/customers", JSON.stringify(customer));
  // }

  addToCart(training: TrainingModel): void {
    console.log(this.currentCustomer);
    if(this.currentCustomer.cart == undefined || this.currentCustomer.cart.length == 0){
        this.currentCustomer.cart = [];
      }
    if(this.currentCustomer.id < 0){
      this.currentCustomer.cart.push(training);
      this.router.navigateByUrl('customers');
    }else{
      this.currentCustomer.cart.push(training);
      this.putCart(training);
    }
  }

    putCart(training : TrainingModel){
      this.postCartItem(training);
      console.log(this.currentCustomer);
    }

  public postCartItem(cartItem : TrainingModel) : Observable<any>{
    return this.http.post<any>(environment.host + "/customers/" + this.currentCustomer.id, JSON.stringify(cartItem), {headers: {'Content-Type' : 'application/json'}});
  }

  addTraining(training:TrainingModel){
    this.cart.push(training);
    this.putCart(training);
  }

  getCartItems(){
    return this.currentCustomer.cart;
  }

  emptyCart(): void {
    localStorage.removeItem('cartItems');
  }

  removeFromCart(training: TrainingModel): void {
    this.cart = this.getCartItems();
    this.cart = this.cart.filter(item => item.id !== training.id);
  }

  // Méthodes user
  onLogin(user : UserModel){
    return this.http.get<UserModel[]>(environment.host + "/users/" + user.id);
  }

}
