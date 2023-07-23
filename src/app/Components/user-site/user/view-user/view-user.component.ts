import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/Dashboard/user';
import { UserService } from 'src/app/services/Dashboard/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {

  admin : User | null = null ;
  buttonRemove : number = 0;
  currentidUser:any
  userDetials: User | undefined
  profile : boolean = true;
  constructor(private router: Router,public activatedRoute: ActivatedRoute,private userService: UserService) {
    
  }

  ngOnInit(): void {
    

    if (this.activatedRoute.snapshot.params['id']) {
      this.currentidUser = this.activatedRoute.snapshot.params['id'];
      this.profile = false;
    } else {
      this.currentidUser = localStorage.getItem("userId")
      this.profile = true;
    }
    
    
    this.userService.getById(this.currentidUser).subscribe({
      next : (result : any) => {
        if (result) {
          this.userDetials = result.data;
        }
      },
      error : (error) => { 
        if (error.status){
          this.router.navigate(['/404']);
        }
      }
    });
  }

    currentDate() {
      return new Date();
    }

    company() {
      if (this.userDetials && this.userDetials.companies && this.userDetials.companies.length > 0) {
        var company = this.userDetials.companies[this.userDetials.companies.length - 1];
        console.log(company);
        
        return company;
      }
      return null;
    }
}