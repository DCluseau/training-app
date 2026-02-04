import { AuthService } from './../../services/auth-service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-component',
  imports: [FormsModule],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
})
export class UserComponent {
  isAuth : boolean;
  user : UserModel = new UserModel(0, "", "");

  constructor(private auth : AuthService){
    this.isAuth = false;
  }

  onAuthUser(user : UserModel){
    this.user = user;
    if(this.auth.onLogin(user)){
      this.isAuth = true;
    }else{
      this.isAuth = false;
    }
    console.log(this.auth);
  }
}
