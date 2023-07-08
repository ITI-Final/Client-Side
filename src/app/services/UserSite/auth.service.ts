import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserSubject: BehaviorSubject<boolean>;

  private httpoptions
   user:any;
  
    constructor(private httpclient:HttpClient) { 
       this.isUserSubject=new BehaviorSubject<boolean> (this.isUserLogged);
  
      this.httpoptions={
        headers:new HttpHeaders({
          'Content-Type':'application/json'
        })
      }
    }
    getalluser(): Observable<any>{
      return this.httpclient.get<any>(`${environment.APIURL}/users`);
    }
  
    login(userName:string,Password:string){
   
  
      localStorage.setItem("UserName", userName);
       this.isUserSubject.next(true);
      
    }
    logout(){
      localStorage.removeItem("UserName")
       this.isUserSubject.next(false);
  
    }
  
  
    get isUserLogged(): boolean
    {
      return  (localStorage.getItem('UserName'))? true: false
    }
  
    getUserloggedStatus(): Observable<boolean>
    {
      return this.isUserSubject.asObservable();
    }
  
    getSingleUser(id:number):Observable<any>{
      return this.httpclient.get<any>(`${environment.APIURL}/users/${id}`);
  
    }
    addNewUser(newUser:any):Observable<any>{
  
      return this.httpclient.post<any>(`${environment.APIURL}/users`
  
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

