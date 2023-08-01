import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
 getAll(query : string): any {
    return this.http.get(environment.getPost() + query);
  }
  getUserPosts(id : number): any {
    return this.http.get(environment.getPost() + '/user/' + id);
  }
  getpostById(id: string): Observable<any> {
    return this.http.get(environment.getPost() + '/' + id);
  }
  getuserById(id: string): Observable<any> {
    return this.http.get(environment.User() + '/' + id);
  }
  getAllPosts(): any {
    return this.http.get(environment.getPost());
  }
  deletePosts(id:number): Observable<any> {
    return this.http.delete<any>(environment.getPost()+ '/' + id);
  }
  filterPosts(SortedByPrice:boolean,govId:number,cityId:number ):Observable<any>{
    return this.http.get(`${environment.getPost()}?isSortedByPriceAscending=${SortedByPrice}&governorate=${govId}&city=${cityId} `)
    // 'https://localhost:7094/api/Posts?isSortedByPriceAscending=true&governorate=1&city=1'

  }
  filterPostsPriceAndGov(SortedByPrice:boolean,govId:number):Observable<any>{
    return this.http.get(`${environment.getPost()}?isSortedByPriceAscending=${SortedByPrice}&governorate=${govId} `)

  }
  filterPostsGovAndCity(govId:number,cityId:number):Observable<any>{
    return this.http.get(`${environment.getPost()}?governorate=${govId}city=${cityId}`)

  }
  filterPostsprice(SortedByPrice:boolean ):Observable<any>{
    return this.http.get(`${environment.getPost()}?isSortedByPriceAscending=${SortedByPrice}`)

  }
  filterPostsGov(governorate:number ):Observable<any>{
    return this.http.get(`${environment.getPost()}?governorate=${governorate}`)

  }
  filterPostsCity(city:number ):Observable<any>{
    return this.http.get(`${environment.getPost()}?city=${city}`)

  }
}
