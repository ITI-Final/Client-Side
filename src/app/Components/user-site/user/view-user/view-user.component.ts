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

  admin: User | null = null;
  buttonRemove: number = 0;
  currentidUser: any
  userDetials: User | undefined
  constructor(private router: Router, public activatedRoute: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit(): void {
    this.currentidUser = localStorage.getItem("userId")

    this.userService.getById(this.currentidUser).subscribe((result: any) => {
      this.userDetials = result.data
      console.log(result)
    })
  }
}