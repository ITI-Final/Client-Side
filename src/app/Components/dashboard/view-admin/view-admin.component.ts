import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/Dashboard/admin';
import AdminService from 'src/app/services/Dashboard/admin.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.scss']
})
export class ViewAdminComponent implements OnInit {

  admin : Admin | null = null ;
  adminID : number = 0;
  defaultIMG = environment.DefaultIMG
  buttonRemove : number = 0;

  constructor(private router: Router,public activatedRoute: ActivatedRoute,private adminService: AdminService) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe().subscribe(params => {
      this.adminID = +params['id'];
    });

    this.adminService.getById(this.adminID).subscribe({
      next : (response : any) => {
        this.admin = response.data;
      },
      error : (error : any) => console.log(error)
      
    });
  }

  getGender() {
    return environment.Gender(this.admin?.gender!);
  }

  getDate(date : string | null) {
    return new Date(date!).toDateString();
  }

  getAvatar() {
    
  }
}
