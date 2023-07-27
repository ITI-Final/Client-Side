import { User } from './../../../interfaces/Dashboard/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/Dashboard/user.service';
import { CategoryService } from 'src/app/services/UserSite/category.service';
import { CitiesService } from 'src/app/services/UserSite/cities.service';
import { PostService } from 'src/app/services/UserSite/post.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent implements OnInit {
  // vehicles = { name: '', url: '#', items: this.posts };
  id: string = '';
  category: any = '';
  post: any;
  userdata: any;
  UserId: number = 0;
  postImages: any[] = [];
  imagesAfter3: any[] = [];
  frist3: any[] = [];
  details: any[] = [];
  Catposts: any[] = [];
  OutputData: DataTransfer[] = [];
  city: any;
  postRes: any;
  domain: string = environment.domain;
  toggleMobile: boolean = false;
  imageCounter: number = 1;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private citiesService: CitiesService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {
   
  }

  ngOnInit(): void {

    this.activatedRoute.params.pipe().subscribe(params => {

      this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.category = this.activatedRoute.snapshot.params;
    this.category = this.category.category;
    
    this.postService.getpostById(this.id).subscribe({
      next: (res) => {
        
        this.post = res.data;
        if (this.post != null){
          this.postImages = this.post.post_Images; 
          this.imagesAfter3 = this.postImages.slice(3, this.postImages.length);
          this.frist3 = this.postImages.slice(0, 3);
          this.details = JSON.parse(this.post.fields);
          console.log(this.post.user_Id);
          
          this.UserId = this.post.user_Id;
          this.city = this.post.post_LocationNavigation;

          this.userService.getById(this.UserId).subscribe({
            next: (res : any) => {
              setTimeout(() => {
                this.userdata = res.data;
              }, 800);
            },
            error: (err) => {
              console.log(err);
            },
          });

        } else{
          // Not Found
          this.router.navigate(['/404']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.categoryService.getAllPosts(this.category).subscribe({
      next: (data) => {
        if (data.statusCode == 200) {
          this.Catposts = data.data.posts.filter((post:any) => post.id != this.id);

          if (this.Catposts.length != 0) {

            this.Catposts = this.Catposts.slice(0, 3);
            // console.log(this.Catposts);

            // this.vehicles = {
            //   name: data.data.name,
            //   items: this.Catposts.slice(0, 3),
            //   url: '#',
            // };
          }
        }
      },
      error: (err) => {
        this.router.navigate(['/404']);
      },
    });
      
    });


    
  }

  getFieldLabel(id: number) {
    return this.post.cat.fields.find((field : any) => field.id === id).label;
  }

  currenyFormat(money: number) {
    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    });
    return USDollar.format(money);
  }

  toggleMobileNumber(){
    this.toggleMobile = !this.toggleMobile;
  }

  isMyPost(id : any ){
    if (id == localStorage.getItem('userId')){
      return true
    }
    return false;
  }
  gotoRelatedPost(id: number) {
    this.router.navigate([this.category,id]);
  }

  increaseCounter(){
    if (this.imageCounter < this.postImages.length) {
      this.imageCounter ++;
    } else {
      this.imageCounter = 1;
    }
  }

  decreaseCounter(){
    if (this.imageCounter > 1) {
      this.imageCounter --;
    } else {
      this.imageCounter = this.postImages.length;
    }
  }
}
