import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from './_models/User';
import { AuthenticationService } from './_service/authentication.service';
import { db } from './_service/firebase.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fiebase-authentication';
  currentUser: Users;
  constructor(
    private authService : AuthenticationService,
    private route : Router
  ){
    this.authService.currentUser.subscribe(val=>{
      this.currentUser = val;
    });
    //getting data from firebase db
    db.collection('users').get().then((querySnap)=>{
    const data = querySnap.docs.map(doc=>doc.data());
    localStorage.setItem('users', JSON.stringify(data));
    });
  }

  logout(){
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}
