import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, mergeMap, toArray } from 'rxjs';
import { UserService } from 'src/app/services/Dashboard/user.service';
import { PostService } from 'src/app/services/UserSite/post.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  id: number | null = null;
  favorite: any[] | null = null;
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
      this.userService.getById(this.id).pipe(
        mergeMap((data: any) => {
          
          if (data.statusCode == 200) {
            this.user = data.data;
            const favoriteObservables = data.data.favorites.map((post: any) =>
              {
                console.log(post);
                return this.postService.getpostById(post.post_Id)
              }
            );
            return forkJoin(favoriteObservables);
          } else {
            throw new Error('User data not found');
          }
        }),
        toArray()
      ).subscribe({
        next: (favoriteData: any[]) => {
          if (favoriteData.length > 0) {
            this.posts = favoriteData[0].map((data :any) => {
              return data.data;
            });
          }
        
        },
        error: (err: any) => {
          this.router.navigate(['/404'], { skipLocationChange: true });
        },
      });
    }
  }
}
