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
  catregory: any = '';
  post: any;
  userdata: any;
  UserId: string = '';
  postImages: any[] = [];
  imagesAfter3: any[] = [];
  frist3: any[] = [];
  details: any[] = [];
  Catposts: any[] = [];
  OutputData: DataTransfer[] = [];
  city: any;
  postRes: any;
  domain: string = environment.domain;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private citiesService: CitiesService,
    private categoryService: CategoryService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.catregory = this.activatedRoute.snapshot.params;
    this.catregory = this.catregory.category;
    this.postService.getpostById(this.id).subscribe({
      next: (res) => {
        this.post = res.data;
        this.postImages = this.post.post_Image;
        this.imagesAfter3 = this.postImages.slice(3, this.postImages.length);
        this.frist3 = this.postImages.slice(0, 3);
        this.details = this.post.fields;
        this.UserId = this.post.user_Id;
        this.city = this.post.post_LocationNavigation;
        //console.log(this.imagesAfter3);
        //console.log(this.frist3);
        //
        //console.log(this.post);
        // console.log(this.postImages);
        // console.log(this.details);
        // console.log(this.UserId);
        // console.log(this.city);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.postService.getuserById(this.UserId).subscribe({
      next: (res) => {
        this.userdata = res.data[0];
        // console.log(res);

        // console.log(this.userdata);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.categoryService.getAllPosts(this.catregory).subscribe({
      next: (data) => {
        if (data.statusCode == 200) {
          this.Catposts = data.data.posts;
          // console.log(this.Catposts);
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
        console.log(err);
        this.router.navigate(['/notfound']);
      },
    });
  }
}
