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
  constructor(private http: HttpClient){ }

  // Méthodes pour les trainings
  public getTrainings(){
    return this.http.get<TrainingModel[]>(environment.host + "/trainings");
  }

  public getTraining(id : number){
    return this.http.get<TrainingModel>(environment.host + "/trainings/" + id);
  }

  public postTrainings(cart : TrainingModel[]){
    this.http.post<TrainingModel[]>(environment.host + "/cart", cart);
  }

  // Méthodes pour le customer (cart + customer)
  saveCustomer(customer : CustomerModel) : Observable<any>{
    return this.http.put<any>(environment.host + "/customers/" + customer.id, JSON.stringify(customer));
  }

  createCustomer(customer : CustomerModel){
    return this.http.post<any>(environment.host + "/customers", JSON.stringify(customer));
  }

  deleteCustomer(customer : CustomerModel){
      return this.http.delete<any>(environment.host + "/customers/" + customer.id);
  }

  getCustomers(){
    return this.http.get<any>(environment.host + "/customers");
  }

  addToCart(training: TrainingModel): void {
    this.cart = this.getCartItems();
    let existingTraining = this.cart.find(item => item.id === training.id);

    if (existingTraining) {
      existingTraining.quantity += training.quantity;
    }
    else {
      this.cart.push(training);
    }
    this.putCart(training);
  }

    putCart(training : TrainingModel){
      this.postCartItem(training).subscribe({
      next: (data) => {
        console.log("Response : " , data);
      }
    });
    }

  public postCartItem(cartItem : TrainingModel) : Observable<any>{
    return this.http.post<any>(environment.host + "/cart", JSON.stringify(cartItem));
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
    return this.http.get<UserModel[]>(environment.host + "/users");
  }

}
