import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { CategoryService } from 'src/app/services/UserSite/category.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent {
  slug: string | null = '';
  Catposts: any = [];
  post: any = [];
  OutputData: DataTransfer[] = [];
  carsourlview: boolean = true;
  currentRoute = '';
  AllCatigory: any[] = [];
  flag = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.slug = activatedRoute.snapshot.paramMap.get('category');
    if (!isNaN(parseInt(this.slug!))){
      console.log("Not Category");
      
      this.router.navigate(['/404']);
    }
  }

  ngOnInit(): void {
    if (this.slug != null) {
      console.log(this.slug);
      this.categoryService.getAllPosts(this.slug).subscribe({
        next: (data) => {
          if (data.statusCode == 200) {
            this.flag = true;
            this.Catposts = data.data.posts;
            // console.log(this.Catposts);
            this.carsourlview = false;
            if (this.Catposts.length != 0) {
              this.section = {
                name: data.data.name,
                items: this.Catposts,
                url: '/' + this.slug,
              };
            }
          }
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/404'], { skipLocationChange: true });
        },
      });
    }
    // else {
    //   this.flag = false;
    //   this.categoryService.getAllCategories().subscribe({
    //     next: (res) => {
    //       // console.log(res.data);

    //       this.AllCatigory = res.data;
    //       for (let i = 0; i < this.AllCatigory.length; i++) {
    //         if (this.AllCatigory[i].posts.length != 0) {
    //           this.post = {
    //             name: this.AllCatigory[i].name,
    //             url: '',
    //             items: this.AllCatigory[i].posts.slice(0, 4),
    //           };
    //           this.OutputData.push(this.post);
    //         }
    //       }
    //     },
    //   });
    // }
  }

  //posts = this.Catposts;
  // posts = [
  //   {
  //     date: '15 minutes ago',
  //     image:
  //       'https://images.pexels.com/photos/1280560/pexels-photo-1280560.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //     price: 2500,
  //     title: `Going on a business trip, traveling for leisure or looking for ancient
  //     Egyptian treasures? Cairo is the place to be. Explore the region’s
  //     ancient history alongside a bustling and fast-growing city with its
  //     dizzying diversity.`,
  //     url: '#',
  //     location: 'Dyar, New Cairo - El Tagamoa',
  //   },
  //   {
  //     date: '15 minutes ago',
  //     image:
  //       'https://images.pexels.com/photos/1280560/pexels-photo-1280560.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //     price: 2500,
  //     title: `Going on a business trip, traveling for leisure or looking for ancient
  //     Egyptian treasures? Cairo is the place to be. Explore the region’s
  //     ancient history alongside a bustling and fast-growing city with its
  //     dizzying diversity.`,
  //     url: '#',
  //     location: 'Dyar, New Cairo - El Tagamoa',
  //   },
  //   {
  //     date: '4 days ago',
  //     image:
  //       'https://images.pexels.com/photos/11994974/pexels-photo-11994974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     price: 15000,
  //     title: `for ancient
  //     Egyptian treasures? Cairo is the place to be. Explore the region’s
  //     ancient history alongside a bustling and fast-growing city with its
  //     dizzying diversity.`,
  //     url: '#',
  //     location: 'Mansoura, Dakhlia , Egypt',
  //   },
  //   {
  //     date: '6 days ago',
  //     image:
  //       'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     price: 15000000,
  //     title: `for ancient
  //     Egyptian treasures? Cairo is the place to be. Explore the region’s
  //     ancient history alongside a bustling and fast-growing city with its
  //     dizzying diversity.`,
  //     url: '#',
  //     location: 'Mansoura, Dakhlia , Egypt',
  //   },
  //   {
  //     date: '7 days ago',
  //     image:
  //       'https://images.pexels.com/photos/5976640/pexels-photo-5976640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     price: 11000000,
  //     title: `Egyptian treasures? Cairo is the place to be.
  //     ancient history alongside a bustling and fast-growing city with its
  //     dizzying diversity.`,
  //     url: '#',
  //     location: 'Alexandria, Egypt',
  //   },
  // ];
  section = {
    name: '',
    url: '#',
    items: [],
  };
}
