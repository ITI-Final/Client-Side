import { Company } from 'src/app/interfaces/Dashboard/company';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/Dashboard/user';
import { UserService } from 'src/app/services/Dashboard/user.service';

@Component({
  selector: 'app-edite-user',
  templateUrl: './edite-user.component.html',
  styleUrls: ['./edite-user.component.scss']
})
export class EditeUserComponent implements OnInit {
 //#region from
 addForm:FormGroup
 userObject:any
 currentid:number=0
 userDetials:any
 hasCompany=true
 showFiled=false
 constructor(private router:Router,private fb:FormBuilder,private userService:UserService ,private activatedRoute:ActivatedRoute) {
   this.addForm = this.fb.group({
     name : ["",[Validators.required,Validators.minLength(3)]],
     email : ["",[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/)]],
     password :[null],
     phone:["",[Validators.required,Validators.minLength(11)]],
     bio:["",[Validators.minLength(3)]],
     birth_Date:[""],
     gender:["",[Validators.required]],
     register_Date:[''],
     id:[''],
     companies: this.fb.array([this.AddCompanyFormGroup()])

     

})
}

  ngOnInit(): void {
    this.currentid =Number( localStorage.getItem("userId"))


      this.userService.getById(this.currentid).subscribe((result:any)=>
        {
          if(result.data!=null){
          this.userDetials =result.data
          this.userDetials.birth_Date = `${this.userDetials.birth_Date?.split("T")[0]}`;
          console.log(this.userDetials.birth_Date);
          this.addForm.patchValue( this.userDetials )
          if(this.userDetials.companies.length<=0){
            this.hasCompany=false

          }
        }
        }
    )}
     
  
    get Companies() {
      return this.addForm.get('companies') as FormArray;
    }get Name() { return this.addForm.get('name')}
get Email() { return this.addForm.get('email')}
get Password() { return this.addForm.get('password')}
get Phone() { return this.addForm.get('phone')}
get Bio() { return this.addForm.get('bio')}
get Gender() { return this.addForm.get('gender')}
get Birthdate() { return this.addForm.get('birth_Date')}
//#endregion
AddCompanyFormGroup():FormGroup{
  return this.fb.group( {logo_Url: ['', [Validators.required]],
  cover_Url:['', [Validators.required]],
  tax_Number:['', [Validators.required]],
  ownerID:['', [Validators.required]],
  register_Date:['', [Validators.required]],
  id:['', [Validators.required]]})

}
    //#region Handle Errors
    AddCompany(){
      this.showFiled=!this.showFiled

    }
    // AddCompanyFormGroup(){
    //   return this.fb.group({
       
    //     logo_Url: ['', [Validators.required]],
    //     cover_Url:['', [Validators.required]],
    //     tax_Number:['', [Validators.required]],
    //     ownerID:['', [Validators.required]]
    //   })
    // }
formOperation(event:any){

  // console.log(this.addForm.value)

 const formControls = this.addForm.controls;
 let isAllValidExceptName = true;
 
 for (const key in formControls) {
   if (key !== 'companies' && !formControls[key].valid) {
     isAllValidExceptName = false;
     break;
   }}
    if(isAllValidExceptName&&this.showFiled==false&&this.hasCompany==false){
      const { companies, ...formDataValue } = this.addForm.value;
    formDataValue.password = null;
    this.userService.update(this.currentid,formDataValue).subscribe({
    
     next : (res) => {
       console.log(res);
       this.router.navigate(['/user/profile']);
//  this.router.navigate(['dashboard/user'])   
   },
     error : (err) => {
       if (err.error.statusMessage == "This Email Is Already Taken.") {
         this.Email?.setErrors({ alreadyExist: err.error.statusMessage });
       }
        
     }
   })
   }
   else if(this.addForm.value.companies[0].logo_Url!=""&&this.addForm.value.companies[0].cover_Url!=""&&this.addForm.value.companies[0].tax_Number!=""&&this.hasCompany==false&&this.showFiled==true){
    const { companies, ...formDataValue } = this.addForm.value;
    this.addForm.value.companies[0].ownerID=this.currentid
    this.addForm.value.companies[0].id=0

    this.userService.update(this.currentid,formDataValue).subscribe({
      next : (res) => {
        if(this.userDetials.companies.length==0)
          {
            let { id, ...skipId } = this.addForm.value.companies[0]
            let { register_Date, ...company } = skipId
            this.userService.addCompany(company).
            subscribe(val=>console.log(val))
          }
    //  this.router.navigate(['dashboard/user'])   
    },
      error : (err) => {
        if (err.error.statusMessage == "This Email Is Already Taken.") {
          this.Email?.setErrors({ alreadyExist: err.error.statusMessage });
        }
          
      }
    })
 }
 else if(this.addForm.value.companies[0].logo_Url!=""&&this.addForm.value.companies[0].cover_Url!=""&&this.addForm.value.companies[0].tax_Number!=""&&this.hasCompany==true&&this.showFiled==true){

   this.userService.update(this.currentid,this.addForm.value).subscribe({
    
     next : (res) => {
       if(this.userDetials.companies.length==1)
       {
        this.userService.updateCompany(this.userDetials.companies[0].id,this.addForm.value.companies[0]).
        subscribe(val=>console.log(val))
       }
       this.router.navigate(['/User/Profile']);
//  this.router.navigate(['dashboard/user']) 
     },
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
}
