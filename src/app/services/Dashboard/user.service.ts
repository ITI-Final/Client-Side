import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/interfaces/Dashboard/company';
import { User } from 'src/app/interfaces/Dashboard/user';
import { environment } from 'src/environments/environment.development';
import { AdminTokenService } from './admin-token.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token;
  headers:any
  constructor(private http: HttpClient ,private  header:AdminTokenService, private AuthServices:AuthService) { 
    this.AuthServices.getToken().subscribe(val=>{
      this.headers =this.header.setheader(val)
    }) 
  
    this.token = localStorage.getItem('token');
    
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.User(),{'headers':this.headers});
  }
  getById(id: number):Observable<any>{
    return this.http.get<User>(environment.User() + '/' + id,{'headers' :this.headers});
  }
  add(entity: any): Observable<User> {
    return this.http.post<User>(environment.User() + '/register', entity,{'headers' :this.headers});
  }

  update(id: number, entity: User): Observable<User> {
    return this.http.put<User>(environment.User() + '/id?id=' + id, entity,{'headers' :this.headers});
  }
  delete(id: number): Observable<User> {
    return this.http.delete<User>(environment.User() + '/' + id,{'headers' :this.headers});
  }

  //////////company//////////


  getCompaniesAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.Companies(),{'headers':this.headers});
  }
  getCompanyById(id: number): Observable<any> {
    return this.http.get<User>(environment.Companies() + '/' + id,{'headers':this.headers});
  }

  addCompany(entity: any): Observable<Company> {
    return this.http.post<Company>(environment.Companies(),  entity,{'headers':this.headers});
  }
  updateCompany(id: number, entity: User): Observable<User> {
    return this.http.put<User>(environment.Companies() + '/' + id,  entity,{'headers':this.headers});
  }
  deleteCompany(id: number): Observable<User> {
    return this.http.delete<User>(environment.Companies() + '/' + id,{'headers':this.headers});
  }
}
