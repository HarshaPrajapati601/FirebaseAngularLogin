import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './_guards/auth-guard';

const routes: Routes = [
  {path :'' , component:HomeComponent ,canActivate:[AuthGuard]},
  {path:'login', component :LoginComponent},
  {path : 'register' , component :RegistrationComponent},
  {path :'**' , component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
