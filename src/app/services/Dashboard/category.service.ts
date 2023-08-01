import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
import { AdminTokenService } from './admin-token.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private httpoptions
  headers:any
  constructor(private httpclient: HttpClient, private AuthServices:AuthService,private  header:AdminTokenService ) { 
    this.AuthServices.getToken().subscribe(val=>{
      this.headers =this.header.setheader(val)
    }) 
  
    this.httpoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }


  getallGategory(): Observable<any> {
    return this.httpclient.get<any>(`${environment.endPoint}Categories`);
  }
  addMainCategory(category: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.endPoint}Categories/main`, category, {'headers':this.headers});
  }
  addCategory(category: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.endPoint}Categories`, category, {'headers':this.headers});
  }
  deleteGategory(id: number): Observable<any> {
    return this.httpclient.delete<any>(`${environment.endPoint}Categories/${id}`);
  }
  deleteCategory(id: number): Observable<any> {
    const cacheBuster = new Date().getTime();
    const url = `${environment.endPoint}Categories/${id}?_cb=${cacheBuster}`;
    return this.httpclient.delete<any>(url);
  }
  editeCategory(category: any, id: number): Observable<any> {
    return this.httpclient.put<any>(`${environment.endPoint}Categories/${id}`, category, this.httpoptions);
  }
  getCategoryByID(id: number): Observable<any> {
    return this.httpclient.get<any>(`${environment.endPoint}Categories/${id}`);
  }
  getallGovernorates(): Observable<any> {
    return this.httpclient.get<any>(`${environment.endPoint}Governorates`);
  }
  getGovernorateById(id: number): Observable<any> {
    return this.httpclient.get<any>(`${environment.endPoint}Governorates/${id}`);
  }
  addPost(post: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.endPoint}Posts`, post);
  }
}

