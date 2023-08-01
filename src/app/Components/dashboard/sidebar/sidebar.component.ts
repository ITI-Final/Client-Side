import { Admin } from 'src/app/interfaces/Dashboard/admin';
import { Component } from '@angular/core';
import AdminService from 'src/app/services/Dashboard/admin.service';
import { AuthService } from 'src/app/services/Dashboard/auth.service';
import { PermissionService } from 'src/app/services/Dashboard/permission.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isAdminLogged:boolean|undefined
  adminDetials:any
  canViewUsers:boolean=false
  canViewCategory:boolean=false
  canViewPost:boolean=false
  canAddCategory:boolean=false
  canAddUsers:boolean=false
  defaultAvatar:any
  constructor(private AuthServices:AuthService,private adminService:AdminService,
    private permissionService:PermissionService) {
    // this.isAdminLogged=AuthServices.isAdminLogged
  }
  ngOnInit(): void {
    this.defaultAvatar=environment.DefaultIMG
     this.isAdminLogged=this.AuthServices.isAdminLogged
    this.AuthServices.getAdminloggedStatus().
    subscribe(status=>{this.isAdminLogged=status
      console.log(`"admin"${this.isAdminLogged}`)
    })
    localStorage.getItem('id')
    this.adminService.getById(  Number(localStorage.getItem('id'))).subscribe((res:any)=>{
      console.log(res.data)
      this.adminDetials=res.data
      console.log(this.adminDetials.avatar)
    })

    this.permissionService.getSectionPermission("users","can_View").subscribe(val=>this.canViewUsers=val)
    this.permissionService.getSectionPermission("category","can_View").subscribe(val=>this.canViewCategory=val)
    this.permissionService.getSectionPermission("post","can_View").subscribe(val=>this.canViewPost=val)
     this.permissionService.getSectionPermission("users","can_Add").subscribe(val=>this.canAddUsers=val)
    this.permissionService.getSectionPermission("category","can_Add").subscribe(val=>this.canAddCategory=val)

  }
    addpremission(){

      this.permissionService.isAdminPermission.next(true)
        this.permissionService.isAdminHasPremissionLogged=true
    
  }
  
  logout(){
    this.AuthServices.logout()
    this.isAdminLogged=this.AuthServices.isAdminLogged
  }

}
