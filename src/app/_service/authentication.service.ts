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
      password : password 
    }
    let stored = JSON.parse(localStorage.getItem('users'));
    if(stored){
      stored.find(user=> {
        if(user.userName != userObj.userName || user.password != userObj.password){
          return this.validationMessage.emit(true);
        }
      else{
        localStorage.setItem('current user', JSON.stringify(userObj))
        this.currentUserSubject.next(userObj);
      }
      //validate if user already there in Registeration array
    })
    }
    else {
      return this.validationMessage.emit(true);
    }
  
}

  //user Registration
  register(userName , email , password){
    let stored = JSON.parse(localStorage.getItem('users'));
    let newUser ={
      userName : userName ,
      email :email ,
      password : password,
      userId : this.registeredUsers.length + 1
    }
    //1.check with already registered users
   if(stored.includes(id=> id == newUser.userName)){
     this.validationMessage.emit(false)
   } else{
    this.registeredUsers.push(newUser);
    localStorage.setItem('users' ,JSON.stringify(this.registeredUsers));
    this.validationMessage.emit(true)
   }
  

  }

  // foundUsers(val ,users){
  //   if(!val){
  //     this.registeredUsers.push(users);
  //     localStorage.setItem('users' ,JSON.stringify(this.registeredUsers));
  //   }
  // }
    //user Logout
  logout(){
       // remove user from local storage to log user out
       localStorage.removeItem('current user');
       this.currentUserSubject.next(null);
  }

  //get current user
  get currentUserValue() : Users{
    return this.currentUserSubject.value;
  }
}
