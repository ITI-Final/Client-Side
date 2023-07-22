import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/Dashboard/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryArry:any[]=[]
  categoryParentArry:any[]=[]
  categoryHasParent:any
  categoryHasFields:any
  currentActive : number = 0

  constructor(private router:Router,private categoryService:CategoryService) {

}

  ngOnInit(): void {
    this.categoryService.getallGategory().subscribe(result=>{
    
      
       this.categoryArry=result.data
       this.categoryParentArry= this.categoryArry.filter((arry:any)=>{
        return arry.parent_Id==null
       })
       console.log(result)
       console.log(this.categoryParentArry)
 

    });  }

    categoryParentId(id:any){
      this.currentActive = id
      this.categoryService.getCategoryByID(id).subscribe((cat:any)=>{
        this.categoryHasParent=cat.data.inverseParent
      })
    }
    categoryHasParentF(id:number){
      this.categoryService.getCategoryByID(id).subscribe((cat:any)=>{
          if(cat.data.inverseParent.length<=0){
          this.router.navigate(['post/add',id])
        }
        else{
          this.categoryHasFields=cat.data.inverseParent

        }

      })
    }
    categoryHasFieldsF(id:any){
      this.router.navigate(['post/add',id])
    }
}
