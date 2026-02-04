export class UserModel {
    id: number;
    login : string;
    pwd : string;

    constructor(id:number,login:string,pwd:string){
      this.id = id;
      this.login = login;
      this.pwd = pwd;
    }
}
