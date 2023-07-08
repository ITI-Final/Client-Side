import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  constructor(private router:Router) {}
  //#region From Varaibles
  addForm = new FormGroup({
    name : new FormControl("",[Validators.required,Validators.minLength(3)]),
    label : new FormControl("",[Validators.required,Validators.minLength(3)]),
    labelAr : new FormControl("",[Validators.required,Validators.minLength(3)]),
  
  });


  get Name() { return this.addForm.controls.name}
  get Label() { return this.addForm.controls.label}
  get LabelAr() { return this.addForm.controls.labelAr}
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
      console.log("Added Successfully");
      
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
           
          }
        }
    return '';
  }
  //#endregion

}
