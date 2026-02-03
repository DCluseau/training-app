import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TrainingModel } from '../models/training-model.model';

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
}
