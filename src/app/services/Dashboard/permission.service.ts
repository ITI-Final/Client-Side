import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import AdminService from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  public isAdminPermission: BehaviorSubject<boolean>;

  constructor(private adminService:AdminService) {
    
    this.isAdminPermission=new BehaviorSubject<boolean> (this.isAdminHasPremissionLogged);

   }
  getSectionPermission(sectionKeyword: any, can: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.adminService.getById(Number(localStorage.getItem('id'))).subscribe(
        (val: any) => {
          let Section = val.data.permissions.find((per: any) => per.section === sectionKeyword);
  
           if (Section !== undefined ) {
            const conditionWordHtml = Section[can];
            observer.next(conditionWordHtml);
            observer.complete();
if(conditionWordHtml==true){
  this.isAdminPermission.next(true);
  localStorage.setItem("Adminpremissiom","yes");

}else{
  // if(sectionKeyword=="users"||sectionKeyword=="category"||sectionKeyword=="post"){}
   this.isAdminPermission.next(false);
   localStorage.removeItem("Adminpremissiom")

}


          } else {

             localStorage.removeItem("Adminpremissiom")
             this.isAdminPermission.next(false);
            observer.error('Permission not found');
            

          }
        },
        (error: any) => {
          observer.error('Error fetching data'); 
        }
      );
    });
  }

  get isAdminHasPremissionLogged(): boolean
  {
    return  (localStorage.getItem('Adminpremissiom'))? true: false
  }
  set isAdminHasPremissionLogged(bool: boolean) {
    if (bool) {
      localStorage.setItem('Adminpremissiom', 'yes');
    } else {
      localStorage.removeItem('Adminpremissiom');
    }
  }
  getAdminPermissionloggedStatus(): Observable<boolean>
  {
    return this.isAdminPermission.asObservable();
  }
  
}
