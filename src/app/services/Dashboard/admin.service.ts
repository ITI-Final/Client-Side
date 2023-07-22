import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/interfaces/Dashboard/admin';
import { IRepository } from 'src/app/interfaces/irepository';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export default class AdminService implements IRepository<Admin> {

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get(environment.Admin());
  }
  getById(id: number): any {
    return this.http.get(environment.Admin() + '/' + id);
  }
  add(entity: any) {
    return this.http.post(environment.Admin(), entity);
  }
  update(id: number, entity: Admin) {
    return this.http.put(environment.Admin() + '/' + id, entity);
  }
  delete(id: number) {
    return this.http.delete(environment.Admin() + '/' + id);
  }
  login(entity: any) {
    return this.http.post(environment.Admin() + '/login', entity);
  }
}
