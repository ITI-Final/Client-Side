import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Favorite } from 'src/app/interfaces/UserSite/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {


  private httpoptions;
  // private token;

  constructor(private http : HttpClient) {
    // this.token = localStorage.getItem('token');
    this.httpoptions={
      headers:new HttpHeaders({
        'accept':' */*' ,
        'Content-Type':'application/json',
        // 'Authorization': 'Bearer ' + this.token
      })
    }

   }

  getAll(): any {
    return this.http.get(environment.Favourites());
  }
  getById(id: number): any {
    return this.http.get(environment.Favourites() + '/' + id,this.httpoptions);
  }
  getByPostAndUser(user_id: number,post_id : number): any {
    return this.http.get(environment.Favourites() + '/' + user_id + '/' + post_id,this.httpoptions);
  }
  add(entity: Favorite) {
    return this.http.post(environment.Favourites(), entity);
  }
  delete(id: number) {
    return this.http.delete(environment.Favourites() + '/' + id);
  }
}
