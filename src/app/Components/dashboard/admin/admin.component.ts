import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/interfaces/Dashboard/admin';
import AdminService from 'src/app/services/Dashboard/admin.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  allAdmins : Admin[] = []
  adminArry: Admin[] = []
  pages= 1;
  pageSize: number = 10; 
  defaultIMG = environment.DefaultIMG
  buttonRemove : number = 0;
  searchTerm: string='';

  constructor(private adminService:AdminService) {}

  ngOnInit(): void {
    this.adminService.getAll().subscribe((res:any) => {
      this.adminArry = res.data;
       this.allAdmins=this.adminArry

    });
  }


  changeRemove(id :number) {
    this.buttonRemove = id;
  }
  remove(id:number) {
    this.adminService.delete(id).subscribe((res:any) => {
      this.allAdmins = this.allAdmins.filter(a => a.id !== id);
    });
    
  }
  getGender(gender : boolean) {
    return environment.Gender(gender);
  }
  search(event:any): void {
    if (!this.searchTerm) {
 this.allAdmins=this.adminArry
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.allAdmins = this.adminArry.filter((cat:any) =>
      Object.values(cat).some(value =>
        value && value.toString().toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
      )
    );
  }
}
