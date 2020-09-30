import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUserForm: FormGroup;
  loading = false;
  submitted = false;
  message :boolean;
  constructor(
    private fb : FormBuilder,
    private route : Router,
    private authservice : AuthenticationService
  ) { }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      userName : ['',[Validators.required , Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.authservice.validationMessage.subscribe(value=>{
      if(value == false){
        this.message =true ;
      }
      else{
        this.message =false ;
        this.route.navigate(['/userLogin']);
      }
    })
  
  }
  get f(){
    return this.newUserForm.controls;
  }
   onSubmit(){
      // stop here if form is invalid
      if (this.newUserForm.invalid) {
        return;
    }
     this.submitted = true; 
     this.authservice.register(this.f.userName.value , this.f.password.value , this.f.email.value);

   }
}
