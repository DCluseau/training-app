import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TrainingModel } from '../models/training-model.model';
import { CartService } from './cart-service';
import { CartComponent } from '../components/cart/cart-component/cart-component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient){  }

  public getTrainings(){
    return this.http.get<TrainingModel[]>(environment.host + "/trainings");
  }

  public getTraining(id : number){
    return this.http.get<TrainingModel>(environment.host + "/trainings/" + id);
  }

  public postTrainings(cart : TrainingModel[]){
    console.log(JSON.stringify(cart));
    this.http.post<TrainingModel>(environment.host + "/cart", cart);
  }

}
