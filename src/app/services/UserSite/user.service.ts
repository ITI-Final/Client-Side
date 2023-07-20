import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/Dashboard/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getAll(): any {
    return this.http.get(environment.User());
  }
  getById(id: number): any {
    return this.http.get(environment.User() + '/' + id);
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
