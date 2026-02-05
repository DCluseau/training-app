export class UserModel {
    id: number;
    login : string;
    pwd : string;
    roles : string;

    constructor(id:number,login:string,pwd:string, roles : string){
      this.id = id;
      this.login = login;
      this.pwd = pwd;
      this.roles = roles;
    }
}
