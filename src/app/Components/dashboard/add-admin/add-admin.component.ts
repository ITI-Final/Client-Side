import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sections } from 'src/app/enums/Sections';
import { Admin } from 'src/app/interfaces/Dashboard/admin';
import { PermissionClass } from 'src/app/models/Dashboard/permissionsClass';
import AdminService from 'src/app/services/Dashboard/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  formArray: FormArray<FormGroup<PermissionClass>> = new FormArray<FormGroup<PermissionClass>>([]);
  allPermissions: boolean = false;
  
  constructor(private router:Router,private adminService : AdminService) {}


  ngOnInit(): void {
    for (let i = 0; i < Object.keys(Sections).length; i++) {
      const permissionFormGroup = new PermissionClass();      
      permissionFormGroup.section.setValue(Object.keys(Sections)[i]);
      this.formArray.push(this.getFormGroup(permissionFormGroup))
    }

    
  }
  
  //#region From Varaibles
  addForm = new FormGroup({
    name : new FormControl("",[Validators.required,Validators.minLength(3)]),
    email : new FormControl("",[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/)]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{6,}$/)]),
    phone : new FormControl("",[Validators.minLength(11)]),
    address : new FormControl(""),
    birthdate : new FormControl("",[Validators.required]),
    avatar : new FormControl("",[Validators.pattern(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i)]),
    gender : new FormControl("true",[Validators.required]),
  });


  get Name() { return this.addForm.controls.name}
  get Email() { return this.addForm.controls.email}
  get Password() { return this.addForm.controls.password}
  get Phone() { return this.addForm.controls.phone}
  get Address() { return this.addForm.controls.address}
  get Birthdate() { return this.addForm.controls.birthdate}
  get Avatar() { return this.addForm.controls.avatar}
  get Gender() { return this.addForm.controls.gender}
  //#endregion


  //#region FormGroup
  getFormGroup(data: PermissionClass | null) {
    data = data || ({} as PermissionClass);
    return new FormGroup({
      section: new FormControl(data.section.value),
      can_View: new FormControl(false),
      can_Add: new FormControl(false),
      can_Edit: new FormControl(false),
      can_Delete: new FormControl(false),
    });
  }
  save(formArray:FormArray)
  {
    if (formArray.valid)
    {      
      const finalFormArray = formArray.value.filter((e:any) => e.can_View !== false || e.can_Add !== false || e.can_Edit !== false || e.can_Delete !== false);
      return finalFormArray
    }
    else
      formArray.markAllAsTouched();

  }
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
      let adminObject : Admin = {
        "name" : `${this.Name.value}`,
        "email" : `${this.Email.value}`,
        "password" : `${this.Password.value}`,
        "avatar" : `${this.Avatar.value}`,
        "address" : `${this.Address.value}`,
        "gender" : this.Gender.value == "true" ? true : false,
        "phone" : `${this.Phone.value}`,
        "birth_Date" : `${new Date(this.Birthdate.value!).toISOString()}`,
        "added_Date" : `${new Date().toISOString()}`,
        "permissions" : this.save(this.formArray)
      }
      
      this.adminService.add(adminObject).subscribe({
        next : (res) => {
          console.log(res);
          
          this.router.navigate(['/dashboard/admin']); 
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
  //#endregion

  allPermissionsChanged() {
    this.allPermissions = !this.allPermissions;
    // Update All Permissions
    this.formArray.value.forEach((e:any,i:number) => {      
      
      e.can_View = this.allPermissions;
      e.can_Add = this.allPermissions;
      e.can_Edit = this.allPermissions;
      e.can_Delete = this.allPermissions;
      
    });
    
  }
}
