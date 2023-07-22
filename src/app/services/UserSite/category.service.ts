import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private httpoptions;

  constructor(private httpclient: HttpClient, private router: Router) {
    this.httpoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  slugchange = new BehaviorSubject<string>('');
  set setvalue(slug: string) {
    this.slugchange.next(slug);
  }
  get getvalue() {
    return this.slugchange.getValue();
  }
  getAllPosts(slug: string): Observable<any> {
    return this.httpclient.get(environment.categorywithPost() + '/' + slug);
  }
  getAllCategories(): Observable<any> {
    return this.httpclient.get(environment.AllCategories());
  }
}
