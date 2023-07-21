import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/Dashboard/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
//#region from
addForm:FormGroup
currentid:number=0
userDetials:any
constructor(private router:Router,private fb:FormBuilder,private userService:UserService ,private activatedRoute:ActivatedRoute) {
  this.addForm = this.fb.group({
    // old_password: new FormControl("", [Validators.required]),
    new_password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{6,}$/)]),
    confirm_password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{6,}$/)]),
    name : [""],
    email : [""],
    password :[null],
    phone:[""],
    bio:[""],
    birth_Date:[""],
    gender:[""],
    register_Date:[''],
    id:[''],
})
}

ngOnInit(): void {
  this.currentid = Number( localStorage.getItem("userId"))
  this.userService.getById(this.currentid).subscribe((result:any)=>
  {
    if(result.data != null){
    this.userDetials = result.data
    
    this.userDetials.birth_Date = this.userDetials.birth_Date == null ? null : `${this.userDetials.birth_Date?.split("T")[0]}`;
    console.log(this.userDetials);
    console.log(this.userDetials.password);
  }
  }
)}
    

// get OldPassword() { return this.addForm.get('old_password')}
get Password() { return this.addForm.get('password')}
get NewPassword() { return this.addForm.get('new_password')}
get ConfirmPassword() { return this.addForm.get('confirm_password')}
//#endregion

 //#region On Form Submit
 formOperation(e:any) {
  // Mark all form controls as touched to trigger validation
  this.addForm.markAllAsTouched();
  if (this.addForm.valid === false) {
    e.preventDefault();
    e.stopPropagation();

    Object.keys(this.addForm.controls).forEach((key: string) => {
      const control = this.addForm.get(key);
      if (control) {
        control.markAsDirty();
        control.markAsTouched();
      }
    });
  } else {
    if (this.NewPassword?.value == this.ConfirmPassword?.value){
      this.userDetials.password = this.NewPassword?.value;
      console.log(this.userDetials.password);
      
      this.userService.update(this.currentid,this.userDetials).subscribe({
      next : (res) => {          
        this.router.navigate(['/user/profile'])   
      },
      })
    } else {
      // Error
      this.ConfirmPassword?.setErrors({ notMatch: "Password Not Matches" });
    }
  }
}
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
          } else if (control.errors && control.errors['notMatch'] != undefined) {            
            return control.errors['notMatch'];
          }
            
        }
    return '';
  }
}
