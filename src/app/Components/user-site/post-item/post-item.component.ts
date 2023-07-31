import { Component, Input, OnInit } from '@angular/core';
import { FavouritesService } from 'src/app/services/UserSite/favourites.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() post: any;
  @Input() category: any = '';
  Catposts: any = [];
  domain = environment.domain;
  isFavorite : boolean = false;
  userID = parseInt(localStorage.getItem("userId")!)


  constructor(private favouritesService : FavouritesService) {}

  ngOnInit(): void {
    this.favouritesService.getByPostAndUser(this.userID,this.post.id).subscribe((response : any) => {
      if (response.data != null){
        this.isFavorite = true;
      }
  });
  }

  currenyFormat(money: number) {
    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    });
    return USDollar.format(money);
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.favouritesService.getByPostAndUser(this.userID,this.post.id).subscribe((response : any) => {
        if (response.data == null){
          // Add To Favorite
          this.favouritesService.add({
            user_Id : this.userID,
            post_Id : this.post.id
          }).subscribe((done : any) => {
            this.isFavorite = true;
          });
        } else {
          // Remove From Favorite
          this.favouritesService.delete(response.data.id).subscribe((remove : any) => {
            this.isFavorite = false;
          });
        }
    });
  }


}
