import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';

@Injectable({
    providedIn : 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private routes: Router,
        private authservice : AuthenticationService){

    }
    canActivate(actRoute :ActivatedRouteSnapshot , state : RouterStateSnapshot){
        let current = this.authservice.currentUserValue;
        if(current){
            return true;
        }
        else{
            this.routes.navigate(['/login'],{queryParams : {returnUrl : state.url}})
        }
    }
}