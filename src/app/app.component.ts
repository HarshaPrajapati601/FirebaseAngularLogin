import { Component } from '@angular/core';
import { Users } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fiebase-authentication';
  currentUser: Users;
  constructor(){
    
  }
}

