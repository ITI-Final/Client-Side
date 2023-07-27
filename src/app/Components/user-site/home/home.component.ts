import { CategoryService } from './../../../services/UserSite/category.service';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  Output,
} from '@angular/core';
import { DataTransfer } from 'src/app/interfaces/UserSite/data-transfer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  slug: string | null = '';
  Catposts: any = [];
  post: DataTransfer = {
    name: '',
    items: [],
    url: '',
  };
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
    this.slug = activatedRoute.snapshot.paramMap.get('slug');

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
      }

      if (event instanceof NavigationEnd) {
        this.slug = activatedRoute.snapshot.paramMap.get('slug');
        if (this.slug != null) {
          this.flag = true;
          this.categoryService.getAllPosts(this.slug).subscribe({
            next: (data) => {
              if (data.statusCode == 200) {
                this.Catposts = data.data.posts;
                // console.log(this.Catposts);
                this.carsourlview = false;

                //this.vehicles.items = this.Catposts;
                if (this.Catposts.length != 0) {
                  this.category = {
                    name: data.data.name,
                    items: this.Catposts,
                    url: "/" + this.slug + "/",
                  };
                }
                // console.log(this.vehicles);
                //this.OutputData.push();
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
        //console.log(this.slug);
        this.currentRoute = event.url;
        //console.log(event);
      }

      if (event instanceof NavigationError) {
      }
    });
  }

  ngOnInit(): void {
    if (this.slug == null)  {
      this.flag = false;
      
      this.categoryService.getAllCategories().subscribe({
        next: (res) => {
          // console.log(res.data);
          
          this.AllCatigory = res.data;
          for (let i = 0; i < this.AllCatigory.length; i++) {
            if (this.AllCatigory[i].posts.length != 0) {
              this.post = {
                name: this.AllCatigory[i].name,
                url: this.AllCatigory[i].slug,
                items: this.AllCatigory[i].posts.reverse().slice(0, 4), // Reverse To Get Last 4 items
              };
              this.OutputData.push(this.post);
            }
          }
        },
      });
    }
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
  category = {
    name: '',
    url: '#',
    items: [],
  };
}
