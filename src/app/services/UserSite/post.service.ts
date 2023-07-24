import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  getUserPosts(id : number): any {
    return this.http.get(environment.getPost() + '/user/' + id);
  }
  getpostById(id: string): Observable<any> {
    return this.http.get(environment.getPost() + '/' + id);
  }
  getuserById(id: string): Observable<any> {
    return this.http.get(environment.User() + '/' + id);
  }
}
