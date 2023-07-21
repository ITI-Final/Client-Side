import { Component, EventEmitter, HostListener, Output} from '@angular/core';
import { AuthService } from 'src/app/services/Dashboard/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAdminLogged:boolean|undefined
  isMenu:{ Opened : boolean , Fixed : boolean} = { Opened : true , Fixed : false};
  @Output() menuOpenedChange: EventEmitter<Object> = new EventEmitter<Object>();

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

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    // Check the window size and update isMenuOpened accordingly
    this.isMenu.Opened = window.innerWidth >= 1200; // Adjust the breakpoint as needed
    this.isMenu.Fixed = window.innerWidth <= 992;
    this.menuOpenedChange.emit(this.isMenu);
  }


  toggleMenu() {
    this.isMenu.Opened = !this.isMenu.Opened;
    this.isMenu.Fixed = window.innerWidth <= 992;
    this.menuOpenedChange.emit(this.isMenu);
  }
}
