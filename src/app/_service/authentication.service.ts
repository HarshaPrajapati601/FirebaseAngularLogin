import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from 'firebase';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Users } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @Output() validationMessage = new EventEmitter();
  private currentUserSubject : BehaviorSubject<Users>;
  public currentUser : Observable<Users>;
  registeredUsers: Users[] = [];
  constructor() { 
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('current user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  //user Login
  login(userName , password){
    let userObj ={
      userName : userName ,
      password : password ,
      email : "",
      userid :""

    }
    //validate if user already there in Registeration array
  }

  //user Logout

  //user Registration
  register(userName , email , password){
    let registeredStore ={
      userName : userName ,
      email :email ,
      password : password,
      userId : this.registeredUsers.length + 1
    }
  }
  
  //get current user
  get currentUserValue() : Users{
    return this.currentUserSubject.value;
  }
}
