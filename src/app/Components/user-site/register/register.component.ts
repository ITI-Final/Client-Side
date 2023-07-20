import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserSite/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private router:Router,private userService : UserService) {}


  ngOnInit(): void {
    
  }
  
  //#region From Varaibles
  addForm = new FormGroup({
    name : new FormControl("",[Validators.required,Validators.minLength(3)]),
    email : new FormControl("",[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/)]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{6,}$/)]),
    phone : new FormControl("",[Validators.required,Validators.minLength(11)]),
    gender : new FormControl("true",[Validators.required]),
    rules : new FormControl("",[Validators.required]),
  });


  get Name() { return this.addForm.controls.name}
  get Email() { return this.addForm.controls.email}
  get Password() { return this.addForm.controls.password}
  get Phone() { return this.addForm.controls.phone}
  get Gender() { return this.addForm.controls.gender}
  get Rules() { return this.addForm.controls.rules}
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
      
      // SEND TO API POST
      let userObject:any = {
        "name" : `${this.Name.value}`,
        "email" : `${this.Email.value}`,
        "password" : `${this.Password.value}`,
        "gender" : this.Gender.value == "true" ? true : false,
        "phone" : `${this.Phone.value}`,
        "bio" : "",
      }
      
      this.userService.add(userObject).subscribe({
        next : (res) => {
          console.log(res);
          this.router.navigate(['/']); 
        },
        error : (err) => {
          if (err.error.statusMessage == "This Email Is Already Taken.") {
            this.Email.setErrors({ alreadyExist: err.error.statusMessage });
          }
        }
      });

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
          } else if (control.errors && control.errors['alreadyExist'] != undefined) {            
            return control.errors['alreadyExist'];
          }
            
        }
    return '';
  }
  
  checkValidation(input : FormControl<string | null>) {
    if (input?.invalid && (input?.dirty || input?.touched)) 
      return true;
    return false;
  }
  //#endregion
}
