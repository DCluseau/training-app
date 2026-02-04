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
    // var found = false;
    // for(var i = 0; i < this.tabUsers.length; i++){
    //   if(this.tabUsers[i].login == user.login && this.tabUsers[i].pwd == user.pwd){
    //     found = true;
    //   }
    // }
    // console.log(this.tabUsers);
    // if(found){
    //   return true;
    // }else{
    //   return false;
    // }
  }
}
