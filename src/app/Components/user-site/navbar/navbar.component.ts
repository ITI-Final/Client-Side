import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/UserSite/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isUserLogged:boolean|undefined

  constructor(private AuthServices:AuthService) {
    // this.isUserLogged=AuthServices.isUserLogged
  }
  ngOnInit(): void {
     this.isUserLogged=this.AuthServices.isUserLogged
    this.AuthServices.getUserloggedStatus().
    subscribe(status=>{this.isUserLogged=status
      console.log(`"user"${this.isUserLogged}`)
 })
  }
  logout(){
    this.AuthServices.logout()
    this.isUserLogged=this.AuthServices.isUserLogged
  }
}
