import { AuthService } from './../../services/auth-service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-component',
  imports: [FormsModule],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
})
export class UserComponent {
  isAuth : boolean;
  user : UserModel = new UserModel(0, "", "", "");
  tabUser : UserModel[] = [];

  constructor(private auth : AuthService, private router : Router){
    this.isAuth = false;
  }

  onAuthUser(user : UserModel){
    this.user = user;
    let found : boolean = false;
    this.auth.onLogin(this.user).subscribe({
      next : (data) => this.tabUser = data
    });
    for(var i = 0; i < this.tabUser.length; i++){
      if(this.user.login == this.tabUser[i].login && this.user.pwd == this.tabUser[i].pwd){
        found = true;
        this.user = this.tabUser[i];
        this.isAuth = true;
      }
    }
    if(found){
      this.router.navigateByUrl('trainings');
    }else{
      alert('Utilisateur non reconnu\nVeuillez vérifier votre Login et votre mot de passe.');
      console.log(this.tabUser);
    }
  }
}
