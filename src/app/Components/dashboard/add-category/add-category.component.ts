import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Dashboard/auth.service';
import { CategoryService } from 'src/app/services/Dashboard/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  addForm:FormGroup
  categoryParentArry: any[]=[]

  fieldArry=[]
hasField:boolean=false
ChoicesArry:any
selectedFile: File | undefined;

  constructor(private router:Router,private fb:FormBuilder,private categoryService:CategoryService, private AuthServices:AuthService) {
    this.addForm = this.fb.group({
      name : ["",[Validators.required,Validators.minLength(3)]],
      label : ["",[Validators.required,Validators.minLength(3)]],
      label_Ar :["",[Validators.required,Validators.minLength(3)]],
    parent_Id:["",[Validators.required]],
    slug:["",[Validators.required,Validators.minLength(3)]],
    description:["",[Validators.required,Validators.minLength(3)]],
    tags:["",[Validators.required,Validators.minLength(3)]],
    admin_Id:[""],
    fields: this.fb.array([this.AddFieldsFormGroup()])


   
    });
  }
 

  //#region From Varaibles
  


  get Name() { return this.addForm.get('name')}
  get Label() { return this.addForm.get('label')}
  get Label_Ar() { return this.addForm.get('label_Ar')}
  get Slug() { return this.addForm.get('slug')}
  get Parent_Id() { return this.addForm.get('parent_Id')}
  get Description() { return this.addForm.get('description')}
  get Tags() { return this.addForm.get('tags')}
  get Fields() {
    return this.addForm.get('fields') as FormArray;
  }
  // get choices() {
  //   return this.addForm.get('choices') as FormArray;
  // }
  //#endregion
  //#region Add fields
  AddFieldsFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      label: ['', [Validators.required]],
      label_Ar: ['', [Validators.required]],
      value_Type: ['', [Validators.required]],
      choice_Type: ['', [Validators.required]],
      max_Length: ['', [Validators.required]],
      min_Length: ['', [Validators.required]],
      max_Value: ['', [Validators.required]],
      min_Value: ['', [Validators.required]],
      choices: this.fb.array([this.AddchoicesFormGroup()])

    });
  }
  AddFields() {
    // if (this.addForm.valid) {
      this.Fields.push(this.AddFieldsFormGroup());
    // }
  }
  deleteFields(index: number) {
    this.Fields.removeAt(index);
  }
  
  ///add choices//
  AddchoicesFormGroup(): FormGroup {
    return this.fb.group({
      label: ['', [Validators.required]],
      label_Ar: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      icon: ['', [Validators.required]],

    });
  }
  //arry in fields fromArry inside formArry
  getChoicesArry(i:number): FormArray {
    let x=this.addForm.get('fields') as FormArray
    let y=x.at(i).get("choices") 
    this.ChoicesArry = y as FormArray
  return this.ChoicesArry
  }
  
  AddChoices() {
    // if (this.addForm.valid) {
      this.ChoicesArry.push(this.AddchoicesFormGroup());
    // }
  }
  deleteChoices(index: number) {
    this.ChoicesArry.removeAt(index);
  }
  //#endregion

//#region oninit
ngOnInit(): void {

  this.addForm.get("parent_Id")?.valueChanges.subscribe(value => {
    if (value =="null") {
      this.hasField = false;
    } 
    // else{
    //   this.hasField = true;
    // }
})

  this.categoryService.getallGategory().subscribe(result=>{
    console.log(result)
    if(result.data!=null){
    let categoryWithoutFileds=result.data.filter((val:any) => val.fields.length<=0)

   this.categoryParentArry=categoryWithoutFileds
    }

  })

}
  //#endregion
     //#region add field toggel
     AddFieldstoggel1(){
      this.hasField=!this.hasField
     }
  //#endregion
     //#region add image file
    //  onFileSelected(event: any) {
    //   this.selectedFile = event.target.files[0];
    // }
  //#endregion

  //#region On Form Submit
  formOperation(e:any) {
    this.addForm.get('admin_Id')?.setValue( localStorage.getItem('id') );
    console.log(localStorage.getItem('id'))
    const formControls = this.addForm.controls;
let isAllValidExceptName = true;

for (const key in formControls) {
  if (key !== 'fields' && !formControls[key].valid) {
    isAllValidExceptName = false;
    break;
  }
}
    // console.log( this.addForm.value)
    if( this.addForm.get("parent_Id")?.value=='null'&&isAllValidExceptName&&this.hasField==false||this.addForm.get("parent_Id")?.value!='null'&&isAllValidExceptName&&this.hasField==false){
      if(this.addForm.get("parent_Id")?.value=='null'){
        this.addForm.get('parent_Id')?.setValue(null);
      }
      const { fields, ...formDataValue } = this.addForm.value;
      console.log(formDataValue)
this.categoryService.addMainCategory(formDataValue).subscribe(result=>{
  console.log(result)

})
    }
    else if((this.addForm.valid)){
    
 console.log( this.addForm.value)
    
      this.categoryService.addCategory(this.addForm.value).subscribe(result=>{
        console.log(result)

      })
    }else{
    
          Object.keys(this.addForm.controls).forEach((key: string) => {
            const control = this.addForm.get(key);
            if (control) {
              control.markAsDirty();
              control.markAsTouched();
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
          } 
       
        }
    return '';
  }

}
