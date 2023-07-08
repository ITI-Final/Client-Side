import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/UserSite/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isUserLogged:boolean|undefined
  usrFormGroup: FormGroup;
  user:object|undefined
  constructor( private AuthServices:AuthService,private fb: FormBuilder,private router:Router) {
    this.usrFormGroup=this.fb.group({
      userName:['',[Validators.required]],

     password:['',[Validators.required]],
    })
  }
  get userName(){
    return this.usrFormGroup.get('email');
  }
  get password(){
    return this.usrFormGroup.get('password');
  }
  ngOnInit(): void {
    this.isUserLogged=this.AuthServices.isUserLogged
  }
  login(){
    if(this.usrFormGroup.valid){
    this.AuthServices.getalluser().subscribe(result=>{
      let user=result.find((a:any)=>{ 
         return   a.userName==this.usrFormGroup.value.userName&&a.password==this.usrFormGroup.value.password})
      if(user){
        this.AuthServices.login(this.usrFormGroup.value.userName,this.usrFormGroup.value.password)
        this.isUserLogged=this.AuthServices.isUserLogged
        alert("you are User")
   
        this.router.navigate([""])

      }else{
        alert("you not user")
      }
    })
  }
    

  }
  logout(){
    this.AuthServices.logout()
    this.isUserLogged=this.AuthServices.isUserLogged

  }

}


