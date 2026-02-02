export class CustomerModel {
  id: number;
  lastname : string;
  firstname : string;
  address : string;
  phone : string;
  email : string;

  constructor(id:number,lastname:string,firstname:string,address:string, phone:string, email:string){
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
}
