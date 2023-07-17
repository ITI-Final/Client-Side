import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/Dashboard/auth.service';


@Injectable({
  providedIn: 'root'
})
export class authAdminGuard implements CanActivate {
  constructor(private authAdmin:AuthService
    ,private router:Router){}
  canActivate(
      route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authAdmin.isAdminLogged){
        return true;
      }
      else{
        alert("not admin");
        this.authAdmin.logout()
        this.router.navigate(['dashboard/Logout']);
        return false;
      }
      }
    }