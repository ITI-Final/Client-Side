import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/Dashboard/user.service';
import { PostService } from 'src/app/services/UserSite/post.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent {
  id: number | null = null;
  posts: any[] | null = null;
  user : any | null = null;


  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = parseInt(id!) ? parseInt(id!) : parseInt(localStorage.getItem('userId')!);
    if (this.id != null) {
      // Get User 
      console.log(this.id);
      
      this.userService.getById(this.id).subscribe({
        next: (data : any) => {
          console.log(data);
          
          if (data.statusCode == 200) {
            this.user = data.data;
          }
        },
        error: (err : any) => {
          console.log(err);
          this.router.navigate(['/404'], { skipLocationChange: true });
        },
      });
      // Post
      this.postService.getUserPosts(this.id).subscribe({
        next: (data : any) => {
          console.log(data);
          
          if (data.statusCode == 200) {
            setTimeout(() => {
              this.posts = data.data;
            }, 1000);
          }
        },
        error: (err : any) => {
          console.log(err);
          this.router.navigate(['/404'], { skipLocationChange: true });
        },
      });
    }

  }

  
  section = {
    name: '',
    url: '#',
    items: [],
  };

}
