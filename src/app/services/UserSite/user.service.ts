import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/Dashboard/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpoptions;
  private token;

  constructor(private http : HttpClient) {
    this.token = localStorage.getItem('token');
    this.httpoptions={
      headers:new HttpHeaders({
        // 'accept':'*/*',
        // 'Content-Type':'application/json'
        'accept':' */*' ,
        'Content-Type': 'multipart/form-data' ,
        'Authorization': 'Bearer ' + this.token
      })
    }

   }

  getAll(): any {
    return this.http.get(environment.User());
  }
  getById(id: number): any {
    return this.http.get(environment.User() + '/' + id,this.httpoptions);
  }
  add(entity: User) {
    return this.http.post(environment.User(),entity); 
  }
  update(id: number, entity: User) {
    return this.http.put(environment.User() + '/' + id,entity); 
  }
  delete(id: number) {
    return this.http.delete(environment.User() + '/' + id);
  }}
