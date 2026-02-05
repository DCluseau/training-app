import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tabUsers : UserModel[] = [];
  constructor(private http : HttpClient){

  }

  onLogin(user : UserModel){
    return this.http.get<UserModel[]>("http://localhost:3000/users");
  }
}
