import { Admin } from 'src/app/interfaces/Dashboard/admin';
import { Component } from '@angular/core';
import AdminService from 'src/app/services/Dashboard/admin.service';
import { AuthService } from 'src/app/services/Dashboard/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isAdminLogged:boolean|undefined
  adminDetials:any
  constructor(private AuthServices:AuthService,private adminService:AdminService) {
    // this.isAdminLogged=AuthServices.isAdminLogged
  }
  ngOnInit(): void {

     this.isAdminLogged=this.AuthServices.isAdminLogged
    this.AuthServices.getAdminloggedStatus().
    subscribe(status=>{this.isAdminLogged=status
      console.log(`"admin"${this.isAdminLogged}`)
    })
    localStorage.getItem('id')
    this.adminService.getById(  Number(localStorage.getItem('id'))).subscribe((res:any)=>{
      console.log(res.data)
      this.adminDetials=res.data
    })
  }

  
  logout(){
    this.AuthServices.logout()
    this.isAdminLogged=this.AuthServices.isAdminLogged
  }

}
