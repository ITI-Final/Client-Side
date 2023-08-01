import { User } from 'src/app/interfaces/Dashboard/user';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/Dashboard/user.service';
import { environment } from 'src/environments/environment.development';
import { PermissionService } from 'src/app/services/Dashboard/permission.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  allUsers : User[] = []
  userArry: User[] = []
  pages= 1;
  pageSize: number = 10; 
  // defaultIMG = environment.DefaultIMG
  buttonRemove : number = 0;
  searchTerm: string='';
  canEdite:boolean=false
  canDelete:boolean=false
  canAdd:boolean=false
  canView:boolean=false

  constructor(private userService:UserService,private permissionService:PermissionService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((res:any) => {
      this.userArry = res.data;
       this.allUsers=this.userArry
console.log(res.data)
    });

    this.permissionService.getSectionPermission("users","can_Edit").subscribe(val=>this.canEdite=val)
    this.permissionService.getSectionPermission("users","can_Delete").subscribe(val=>this.canDelete=val)
    this.permissionService.getSectionPermission("users","can_Add").subscribe(val=>this.canAdd=val)
    this.permissionService.getSectionPermission("users","can_View").subscribe(val=>this.canView=val)

    
  }


  changeRemove(id :number) {
    this.userService.delete(id).subscribe((res:any) => {
      this.userService.getAll().subscribe((res:any) => {
        this.userArry = res.data;
         this.allUsers=this.userArry
  
      });    });
  }
  remove(id:number) {
   
      this.buttonRemove = id;

  }
  // getGender(gender : boolean) {
  //   return environment.Gender(gender);
  // }
  search(event:any): void {
    if (!this.searchTerm) {
 this.allUsers=this.userArry
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.allUsers = this.userArry.filter((cat:any) =>
      Object.values(cat).some(value =>
        value && value.toString().toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
      )
    );
  }
}

