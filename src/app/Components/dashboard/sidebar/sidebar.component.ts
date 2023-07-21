import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/Dashboard/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isAdminLogged:boolean|undefined
  constructor(private AuthServices:AuthService) {
    // this.isAdminLogged=AuthServices.isAdminLogged
  }
  ngOnInit(): void {

     this.isAdminLogged=this.AuthServices.isAdminLogged
    this.AuthServices.getAdminloggedStatus().
    subscribe(status=>{this.isAdminLogged=status
      console.log(`"admin"${this.isAdminLogged}`)
    })
  }

  
  logout(){
    this.AuthServices.logout()
    this.isAdminLogged=this.AuthServices.isAdminLogged
  }

}
