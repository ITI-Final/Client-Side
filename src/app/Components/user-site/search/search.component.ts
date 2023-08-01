import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Posts } from 'src/app/interfaces/Dashboard/posts';
import { CategoryService } from 'src/app/services/Dashboard/category.service';
import { FavouritesService } from 'src/app/services/UserSite/favourites.service';
import { PostService } from 'src/app/services/UserSite/post.service';
import { SearchService } from 'src/app/services/UserSite/search.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  
postsArry:Posts[]=[]
searchTerm: string='';
city:any
governorate:any
pages= 1;
pageSize: number = 1; // Number of items to display per page
allPosts:Posts[]=[]
buttonRemove : number = 0;
Section:any
domain = environment.domain;
hasCity=false

selectPrice: boolean = true;
selectGov: number | null = null;
selectCity: number | null = null;
arryPriceSort=[{"string":"Heigher To Lower",value:false},{"string":"Lower To Heigher",value:true},]
constructor(private router:Router,private postService:PostService,
  private searchService:SearchService,private categoryService:CategoryService
) {
}

onSelectChangeGov(event:any){
  this.hasCity=true

  this.categoryService.getGovernorateById(event.target.value).subscribe(res=>{
    console.log(res.data)
    this.city=res.data.cities
    
  }) 
this.postService.filterPostsGov(event.target.value).subscribe(val=>{

  this.allPosts=val.data
})
this.showAlertIfAllSelected();

}
// onSelectChange(){
//   console.log(this.selectedOption)
// }
onSelectChangeCity(event:any){
  console.log(event.target.value)
  this.postService.filterPostsCity(event.target.value).subscribe(val=>{

    this.allPosts=val.data
  })
  this.showAlertIfAllSelected();

}
onSelectChangePrice(event:any){
console.log(event.target.value)
this.postService.filterPostsprice(event.target.value).subscribe(val=>{

  this.allPosts=val.data
})
this.showAlertIfAllSelected();

}

showAlertIfAllSelected() {
  // Check if all three selects have been selected
  if (this.selectPrice !== null && this.selectGov !== null && this.selectCity !== null) {
    this.postService.filterPosts(this.selectPrice,this.selectGov,this.selectCity).subscribe(val=>this.allPosts=val.data)
  }else if(this.selectPrice !== null && this.selectGov !== null){
    this.postService.filterPostsPriceAndGov(this.selectPrice,this.selectGov).subscribe(val=>this.allPosts=val.data)

  }
  else if(this.selectGov !== null && this.selectCity !== null){
    this.postService.filterPostsGovAndCity(this.selectGov,this.selectCity).subscribe(val=>this.allPosts=val.data)

  }
}

currenyFormat(money: number) {
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  });
  return USDollar.format(money);
}
ngOnInit(): void {
  this.categoryService.getallGovernorates().subscribe(res=>{
    console.log(res.data)
    this.governorate=res.data
  })
  this.searchService.getSearchText().subscribe(val=>{
          console.log(val)
          this.searchTerm=val

            if (!this.searchTerm) {
              this.allPosts = this.postsArry;
              return;
            }
            if (val=='') {
              this.allPosts = this.postsArry;
              return;
            }
            const searchTermLower = this.searchTerm.toLowerCase();
            this.allPosts = this.postsArry.filter((cat:any) =>
              Object.values(cat).some(value =>
                value && value.toString().toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
              )
            );
        })
  this.postService.getAllPosts().subscribe((result:any)=>{
  
    
     this.postsArry=result.data
     this.allPosts = this.postsArry;
         console.log(this.postsArry)
         console.log(this.postsArry[0]?.post_Images[0]?.image)

  });  



console.log(this.selectPrice)
console.log(this.selectCity)
console.log(this.selectGov)

}

    
      // search(event:any): void {
      //   if (!this.searchTerm) {
      //     this.allPosts = this.postsArry;
      //     return;
      //   }
    
      //   const searchTermLower = this.searchTerm.toLowerCase();
      //   this.allPosts = this.postsArry.filter((cat:any) =>
      //     Object.values(cat).some(value =>
      //       value && value.toString().toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
      //     )
      //   );
      // }


}
