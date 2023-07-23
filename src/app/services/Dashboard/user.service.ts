import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/interfaces/Dashboard/company';
import { User } from 'src/app/interfaces/Dashboard/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpoptions;
  private token;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.httpoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.User());
  }
  getById(id: number):Observable<User>{
    return this.http.get<User>(environment.User() + '/' + id, this.httpoptions);
  }
  add(entity: any): Observable<User> {
    return this.http.post<User>(environment.User() + '/register', entity, this.httpoptions);
  }

  update(id: number, entity: User): Observable<User> {
    return this.http.put<User>(environment.User() + '/id?id=' + id, entity, this.httpoptions);
  }
  delete(id: number): Observable<User> {
    return this.http.delete<User>(environment.User() + '/id?id=' + id, this.httpoptions);
  }

  //////////company//////////


  getCompaniesAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.Companies());
  }
  getCompanyById(id: number): Observable<User> {
    return this.http.get<User>(environment.Companies() + '/' + id);
  }

  addCompany(entity: any): Observable<Company> {
    return this.http.post<Company>(environment.Companies(), entity);
  }
  updateCompany(id: number, entity: User): Observable<User> {
    return this.http.put<User>(environment.Companies() + '/' + id, entity);
  }
  deleteCompany(id: number): Observable<User> {
    return this.http.delete<User>(environment.Companies() + '/' + id);
  }
}
