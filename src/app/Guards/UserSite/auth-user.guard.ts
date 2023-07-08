import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/UserSite/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authUserGuard implements CanActivate {
  constructor(private authUser:AuthService
    ,private router:Router){}
  canActivate(
      route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authUser.isUserLogged){
        return true;
      }
      else{
        alert("not user");
        this.authUser.logout()
        this.router.navigate(['Logout']);
        return false;
      }
      }
    }