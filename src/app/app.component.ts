import { Component } from '@angular/core';
import { Users } from './_models/User';
import { AuthenticationService } from './_service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fiebase-authentication';
  currentUser: Users;
  constructor(
    private authService : AuthenticationService
  ){
    this.authService.currentUser.subscribe(val=>{
      this.currentUser = val;
    })
    
  }
}

