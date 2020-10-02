import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm : FormGroup ;
submitted;
message:boolean;
returnUrl:string;
  constructor(
    private activateRoute : ActivatedRoute,
    private route : Router ,
    private authservice : AuthenticationService , 
    private formBuilder : FormBuilder
  ) { 
    if(this.authservice.currentUserValue){
      this.route.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName : ['', [Validators.required ,Validators.minLength(4)]],
       password: ['', [Validators.required ,Validators.minLength(6)]]
       
    });
    this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'] || '/';
    this.authservice.validationMessage.subscribe(value=>{
      if(value == false){
        this.message =true ;
      }
      else{
        this.message =false ;
       
      }
    })
  }
  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
     // stop here if form is invalid
     if (this.loginForm.invalid) {
      return;
  }
    this.submitted = true ;
    this.authservice.login(this.f.userName.value , this.f.password.value);
    this.route.navigate([this.returnUrl]);;
  }
}
