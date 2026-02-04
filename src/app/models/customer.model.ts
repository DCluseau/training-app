import { TrainingModel } from "./training-model.model";

export class CustomerModel {
  id: number;
  lastname : string;
  firstname : string;
  address : string;
  phone : string;
  email : string;
  cart : TrainingModel[];

  constructor(id:number,lastname:string,firstname:string,address:string, phone:string, email:string, cart : TrainingModel[]){
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.cart = cart;
  }
}
