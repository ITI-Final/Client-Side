import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Dashboard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isAdminLogged:boolean|undefined
  usrFormGroup: FormGroup;
  user:object|undefined
  constructor( private AuthServices:AuthService,private fb: FormBuilder,private router:Router) {
    this.usrFormGroup=this.fb.group({
      email:['',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/)]],
      password:['',[Validators.required]],
    })
  }
  get Email(){
    return this.usrFormGroup.get('email');
  }
  get Password(){
    return this.usrFormGroup.get('password');
  }
  ngOnInit(): void {
    this.isAdminLogged=this.AuthServices.isAdminLogged
  }
  login(e:any){

    this.usrFormGroup.markAllAsTouched();
    if (this.usrFormGroup.valid === false) {
      e.preventDefault();
      e.stopPropagation();

      Object.keys(this.usrFormGroup.controls).forEach((key: string) => {
        const control = this.usrFormGroup.get(key);
        if (control) {
          control.markAsDirty();
          control.markAsTouched();
        }
      });
    } else {

      this.AuthServices.getallAdmin().subscribe(result=>{
        let user=result.find((a:any)=>{          
           return   a.email == this.usrFormGroup.value.email&&a.password==this.usrFormGroup.value.password})
        if(user){
          this.AuthServices.login(this.usrFormGroup.value.userName,this.usrFormGroup.value.password)
          this.isAdminLogged=this.AuthServices.isAdminLogged
          alert("you are Admin")
          this.router.navigate(["/dashboard"])
        }else{
          alert("you not Admin")
        }
      });

    }
  }

    //#region Handle Errors
    getErrorMsg( controlName : string) : string {
      const control = this.usrFormGroup.get(controlName);
          if (control?.errors){
            if (control.errors && control.errors['required']) {
              return 'Required Field';
            } else if (control.errors && control.errors['minlength']) {
              return `Min ${control.errors['minlength']['requiredLength']} Character.`;
            } else if (control.errors && control.errors['min']) { 
              return `Min ${control.errors['min']['min']} Number.`;
            } else if (control.errors && control.errors['max']) { 
              return `Max ${control.errors['max']['max']} Number.`;
            } else if (control.errors && control.errors['pattern']) {
              if (controlName === 'email') {
                return 'Please enter valid Email Adress.';
              } else if (controlName === 'avatar') {
                return 'Please Enter Valid Format , Accepted : PNG, JPEG, JPG.';
              } else if (controlName === 'password') {
                return 'At least 6 characters mixed with numbers and symbols.';
              }
             
            }
          }
      return '';
    }
    //#endregion

  logout(){
    this.AuthServices.logout()
    this.isAdminLogged=this.AuthServices.isAdminLogged

  }

}
