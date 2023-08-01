import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PermissionService } from 'src/app/services/Dashboard/permission.service';



@Injectable({
  providedIn: 'root'
})
export class adminPermissionGuard implements CanActivate {
  constructor(private authAdminPer:PermissionService
    ,private router:Router ){}
  canActivate(
      route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if(this.authAdminPer.isAdminHasPremissionLogged){
        // alert(this.authAdminPer.isAdminHasPremissionLogged)

        return true;
      }
      else{
        return this.authAdminPer.getAdminPermissionloggedStatus().pipe(
          map((state: any) => {
            //  alert(state);

            if(state==true) {
              console.log(state, "true");

              return true}
            else {
              //  alert("not Have premission");

               console.log(state, "false");
            this.router.navigate(['dashboard']);

              return false;
          }
         } )
        );
        // alert("not Have premission");
        // // this.authAdmin.logout()
        // alert(this.authAdminPer.isAdminHasPremissionLogged)
        // this.router.navigate(['dashboard']);
        // return false;
      }
      }
    }