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
    this.isUserLogged=this.AuthServices.isUserLogged
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
      const formData = new FormData();
      formData.append('email', this.usrFormGroup.value.email);
      formData.append('password', this.usrFormGroup.value.password);
    
      this.AuthServices.login(formData).subscribe(result=>{
          this.isUserLogged=this.AuthServices.isUserLogged
          //////
          console.log(result.response.token);
          let token=result.response.token
            // Split the token by the dots to access the payload (second part)
            const payload = token.split('.')[1];
            // Decode the base64 encoded payload
            const decodedPayload = atob(payload);
            // Parse the decoded payload as JSON to access its properties
            const payloadObj = JSON.parse(decodedPayload);

       
            
        
//////
          localStorage.setItem("userId", payloadObj.Id)
          this.router.navigate([""])

          console.log(result);

      } ,(error: any) => {
        console.error(error.error?.statusMessage);
        if (error.error.statusMessage == "Password Is Invalid") {
         this.Password?.setErrors({ InvaildPassword: error.error.statusMessage });
        }
      })

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
        } else if (control.errors && control.errors['InvaildPassword'] != undefined) {            
          return control.errors['InvaildPassword'];
        }
          }
        }
    return '';
  }
  //#endregion
  
  logout(){
    this.AuthServices.logout()
    this.isUserLogged=this.AuthServices.isUserLogged

  }

}