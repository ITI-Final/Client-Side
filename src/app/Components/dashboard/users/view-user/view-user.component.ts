import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/Dashboard/user';
import { UserService } from 'src/app/services/Dashboard/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {

  admin : User | null = null ;
  buttonRemove : number = 0;
  currentidCat:number=0;
  userDetials:User | undefined
  constructor(private router: Router,public activatedRoute: ActivatedRoute,private userService: UserService) {
    
  }

  ngOnInit(): void {
  

    this.activatedRoute.paramMap.subscribe(
      paramMap => {
    this.currentidCat = Number(paramMap.get('id'));
    console.log(this.currentidCat)

      this.userService.getById(this.currentidCat).subscribe((result:any)=>
        {
          this.userDetials =result.data
          console.log(result) })
        }
      )
     
  }
    

}