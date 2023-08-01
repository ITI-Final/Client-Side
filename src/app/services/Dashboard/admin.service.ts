import { AdminTokenService } from './admin-token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/interfaces/Dashboard/admin';
import { IRepository } from 'src/app/interfaces/irepository';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export default class AdminService implements IRepository<Admin> {
  AdminToken:any
  headers:any
  constructor(private http: HttpClient ,private  header:AdminTokenService , private AuthServices:AuthService) { 
   
    this.AuthServices.getToken().subscribe(val=>{
      this.headers =this.header.setheader(val)
    }) 

  }

  getAll(): any {

    return this.http.get(environment.Admin(),{'headers':this.headers});
  }
  getById(id: number): any {

    


    return this.http.get(environment.Admin() + '/' + id,{'headers':this.headers});
  }
  add(entity: any) {

    return this.http.post(environment.Admin(), entity,{'headers':this.headers});
  }
  update(id: number, entity: Admin) {

    return this.http.put(environment.Admin() + '/' + id, entity,{'headers':this.headers});
  }
  delete(id: number) {

    return this.http.delete(environment.Admin() + '/' + id, {'headers':this.headers}
    );
  }
  login(entity: any) {
    return this.http.post(environment.Admin() + '/login', entity);
  }


//   setheader():HttpHeaders{
//     const adminToken = localStorage.getItem('AdminToken');
//     console.log(adminToken);

//     let headers = new HttpHeaders();
//     if (adminToken) {
//       headers = headers.set('Authorization', 'Bearer ' + adminToken);
//     }

//     headers = headers.set('Content-Type', 'application/json');
// return headers
//   }
}
