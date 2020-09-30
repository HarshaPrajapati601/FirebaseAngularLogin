import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm : FormGroup ;
submitted;
  constructor(
    private roue : Router ,
    private authservice : AuthenticationService , 
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName : ['', Validators.required ,Validators.minLength(4)],
       password: ['', Validators.required ,Validators.minLength(6)]
       
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
  }
}
