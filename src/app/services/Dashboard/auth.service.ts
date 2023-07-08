import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAdminSubject: BehaviorSubject<boolean>;

  private httpoptions
   user:any;
  
    constructor(private httpclient:HttpClient) { 
       this.isAdminSubject=new BehaviorSubject<boolean> (this.isAdminLogged);
  
      this.httpoptions={
        headers:new HttpHeaders({
          'Content-Type':'application/json'
        })
      }
    }
    getallAdmin(): Observable<any>{
      return this.httpclient.get<any>(`${environment.APIURL}/admin`);
    }
  
    login(userName:string,Password:string){
   
  
      localStorage.setItem("AdminName", userName);
       this.isAdminSubject.next(true);
      
    }
    logout(){
      localStorage.removeItem("AdminName")
       this.isAdminSubject.next(false);
  
    }
  
  
    get isAdminLogged(): boolean
    {
      return  (localStorage.getItem('AdminName'))? true: false
    }
  
    getAdminloggedStatus(): Observable<boolean>
    {
      return this.isAdminSubject.asObservable();
    }
  
    getSingleAdmin(id:number):Observable<any>{
      return this.httpclient.get<any>(`${environment.APIURL}/admin/${id}`);
  
    }
    addNewAdmin(newUser:any):Observable<any>{
  
      return this.httpclient.post<any>(`${environment.APIURL}/admin`
  
                                      ,JSON.stringify(newUser),
  
                                                this.httpoptions)
  
                                                .pipe(
  
                                                  retry(3),catchError((err)=>{
  
                                                    return throwError(()=>{
  
                                                      return new Error('Error occured please try again.')
  
                                                    })
  
                                                  })
  
                                                )
  
      }
  }
