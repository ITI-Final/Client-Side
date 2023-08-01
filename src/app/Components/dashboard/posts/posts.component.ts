import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Posts } from 'src/app/interfaces/Dashboard/posts';
import AdminService from 'src/app/services/Dashboard/admin.service';
import { CategoryService } from 'src/app/services/Dashboard/category.service';
import { PermissionService } from 'src/app/services/Dashboard/permission.service';
import { UserService } from 'src/app/services/Dashboard/user.service';
import { PostService } from 'src/app/services/UserSite/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
 
    postsArry:Posts[]=[]
    searchTerm: string='';
    pages= 1;
    pageSize: number = 10; // Number of items to display per page
    allPosts:Posts[]=[]
    buttonRemove : number = 0;
  Section:any
  canEdite:boolean=false
  canDelete:boolean=false
  canAdd:boolean=false
  categoryNames: { [key: string]: string } = {};
  userName: { [key: string]: string } = {};
  userPhone: { [key: string]: string } = {};

    constructor(private router:Router,private postService:PostService,
      private adminService:AdminService,private permissionService:PermissionService,
       private categoryService:CategoryService,private userService:UserService) {
  }
    ngOnInit(): void {
      this.postService.getAllPosts().subscribe((result:any)=>{
      
        
         this.postsArry=result.data
         this.allPosts = this.postsArry;
         console.log(result)
         this.allPosts.forEach((post) => {
          this.categoryService.getCategoryByID(post.cat_Id).subscribe((val) => {
            const categoryName = val.data.label;
             // Replace '.phone' with the actual property containing the category name
            this.categoryNames[post.cat_Id] = categoryName;
          });
          this.userService.getById(post.user_Id).subscribe((val) => {
            const userName = val.data.name;
            const userPhone= val.data.phone;

             // Replace '.phone' with the actual property containing the category name
            this.userName[post.user_Id] = userName;
            this.userPhone[post.user_Id] = userPhone;

            console.log()
          });
        });
      });  
    // set Permissions edite and delete
    // this.permissionService.getSectionPermission("post","can_Edit").subscribe(val=>this.canEdite=val)
    this.permissionService.getSectionPermission("post","can_Delete").subscribe(val=>this.canDelete=val)
    // this.permissionService.getSectionPermission("post","can_Add").subscribe(val=>this.canAdd=val)
  
    
  
  
  }
  
        
          search(event:any): void {
            if (!this.searchTerm) {
              this.allPosts = this.postsArry;
              return;
            }
        
            const searchTermLower = this.searchTerm.toLowerCase();
            this.allPosts = this.postsArry.filter((cat:any) =>
              Object.values(cat).some(value =>
                value && value.toString().toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
              )
            );
          }
          deleteCategory(id:number){
    
            this.postService.deletePosts(id).subscribe((val:any)=>{console.log(val)
  
              this.allPosts = this.postsArry.filter(a => a.id !== id);
  
            //   this.categoryService.getallGategory().subscribe(result=>{
      
        
            //     this.postsArry=result.data
            //     this.allPosts = this.postsArry;
            //     console.log(result)
         
            //  });
            
            
            
            
            })
  
          }
          remove(id:number) {
              this.buttonRemove = id;
            }
  
  
  
        
           
  
  
  
  
  
}
