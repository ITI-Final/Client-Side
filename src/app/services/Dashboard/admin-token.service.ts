import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminTokenService {

  constructor() { }
  setheader(adminToken:any):HttpHeaders{
    // const adminToken = localStorage.getItem('AdminToken');
    // console.log(adminToken);
// if(adminToken==null||adminToken==undefined){
//   adminToken=localStorage.getItem('AdminToken');
// }
let x=adminToken|| localStorage.getItem('AdminToken');
    let headers = new HttpHeaders();
    if (x) {
      headers = headers.set('Authorization', 'Bearer ' + x);
    }

    headers = headers.set('Content-Type', 'application/json');
return headers
  }
}
