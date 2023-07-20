import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/Dashboard/user';
import { CategoryService } from 'src/app/services/Dashboard/category.service';
import { UserService } from 'src/app/services/Dashboard/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  //#region from
  addForm:FormGroup
  userObject:any
  constructor(private router:Router,private fb:FormBuilder,private userService:UserService) {
    this.addForm = this.fb.group({
      name : ["",[Validators.required,Validators.minLength(3)]],
      email : ["",[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/)]],
      password :["",[Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{6,}$/)]],
      phone:["",[Validators.required,Validators.minLength(11)]],
      bio:["",[Validators.required,Validators.minLength(3)]],
      gender:["",[Validators.required]],
    
})
}
get Name() { return this.addForm.get('name')}
get Email() { return this.addForm.get('email')}
get Password() { return this.addForm.get('password')}
get Phone() { return this.addForm.get('phone')}
get Bio() { return this.addForm.get('bio')}
get Gender() { return this.addForm.get('gender')}
//#endregion
     //#region Handle Errors

formOperation(event:any){


  this.Gender?.setValue( this.Gender.value == "true" ? true : false,)
  if(this.addForm.valid){
    this.userService.add(this.addForm.value).subscribe({
      // console.log(res)
     
      next : (res) => {
        console.log(res);
        
  this.router.navigate(['dashboard/user'])      },
      error : (err) => {
        if (err.error.statusMessage == "This Email Is Already Taken.") {
          this.Email?.setErrors({ alreadyExist: err.error.statusMessage });
        }
         
      }
    })
  }else{
    Object.keys(this.addForm.controls).forEach((key: string) => {
      const control = this.addForm.get(key);
      if (control) {
        control.markAsDirty();
        control.markAsTouched();
      }
  })
}}
//#endregion

     //#region Handle Errors
     getErrorMsg( controlName : string) : string {
      const control = this.addForm.get(controlName);
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
            } else if (control.errors && control.errors['alreadyExist'] != undefined) {            
              return control.errors['alreadyExist'];
            }
              
          }
      return '';
    }
    //#endregion
  }