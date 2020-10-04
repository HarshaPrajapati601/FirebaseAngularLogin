import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from 'firebase';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Users } from '../_models/User';
import {db} from '../_service/firebase.js';

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
    let stored = JSON.parse(localStorage.getItem('Users'));
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



// //check for duplicate users
// if(!found) {
//   db.collection("users").doc(newUser.userId).set(newUser)
//   .then(function(docRef) {
//     console.log("Document written with ID: ", docRef);
//   })
//   .catch(function(error) {
//     console.error("Error adding document: ", error);
//   });

//   this.userObject.emit(true);
//   return this.usersArray;
// }else{
//   this.userObject.emit(false);
// }
  //user Registration
  register(userName , email , password){
    let stored = JSON.parse(localStorage.getItem('Users'));
    let newUser ={
      userName : userName ,
      email :email ,
      password : password,
      userId : this.registeredUsers.length + 1
    }
    const found = this.registeredUsers.some(el=>el.userName == newUser.userName);
    this.registeredUsers = JSON.parse(localStorage.getItem("Users")) || [];
    this.registeredUsers.push(newUser);
    localStorage.setItem("Users", JSON.stringify(this.registeredUsers));
    if(!found){
      db.collection("Users").doc(newUser.userName).set(newUser)
      .then(function(docRef){
        console.log("Document written with ID: ", docRef);
      })
      .catch(function(error){
        console.error("Error adding document: ", error);
      });
      this.validationMessage.emit(true);
      return this.registeredUsers;
    }
    else{
    this.validationMessage.emit(false);
  }
  }
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
