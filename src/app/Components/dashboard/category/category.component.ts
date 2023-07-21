import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/Dashboard/category';
import { CategoryService } from 'src/app/services/Dashboard/category.service';
// interface Category {
//   label: string;
//   slug: number;
//   parent:{label:string};
//   // Add more properties as needed
//}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  categoryArry:Category[]=[]
  searchTerm: string='';
  pages= 1;
  pageSize: number = 10; // Number of items to display per page
  allCategory:Category[]=[]
  buttonRemove : number = 0;

  constructor(private router:Router,private categoryService:CategoryService) {

}
  ngOnInit(): void {
    this.categoryService.getallGategory().subscribe(result=>{
    
      
       this.categoryArry=result.data
       this.allCategory = this.categoryArry;
       console.log(result)

    });  }

      
        search(event:any): void {
          if (!this.searchTerm) {
            this.allCategory = this.categoryArry;
            return;
          }
      
          const searchTermLower = this.searchTerm.toLowerCase();
          this.allCategory = this.categoryArry.filter((cat:any) =>
            Object.values(cat).some(value =>
              value && value.toString().toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
            )
          );
        }
        deleteCategory(id:number){
  
          this.categoryService.deleteCategory(id).subscribe(val=>{console.log(val)
            this.categoryService.getallGategory().subscribe(result=>{
    
      
              this.categoryArry=result.data
              this.allCategory = this.categoryArry;
              console.log(result)
       
           });
          
          
          
          
          })

        }
        remove(id:number) {
            this.buttonRemove = id;
          }
        }

