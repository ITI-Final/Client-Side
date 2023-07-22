import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private httpoptions

  constructor(private httpclient: HttpClient) {
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
    return this.httpclient.post<any>(`${environment.endPoint}Categories/main`, category, this.httpoptions);
  }
  addCategory(category: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.endPoint}Categories`, category, this.httpoptions);
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

