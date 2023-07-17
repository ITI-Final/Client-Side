import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/Dashboard/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  addForm:FormGroup
  categoryParentArry: any[]=[]

  fieldArry=[]
hasField:boolean=false
ChoicesArry:any
selectedFile: File | undefined;
currentidCat:number=0
categoryDetials:any
showField:boolean=false
  constructor(private router:Router,private fb:FormBuilder,private categoryService:CategoryService, private ActiceRouter: ActivatedRoute) {
    this.addForm = this.fb.group({
      id : [''],
      name : ["",[Validators.required,Validators.minLength(3)]],
      label : ["",[Validators.required,Validators.minLength(3)]],
      label_Ar :["",[Validators.required,Validators.minLength(3)]],
    parent_Id:["",[Validators.required]],
    slug:["",[Validators.required,Validators.minLength(3)]],
    description:["",[Validators.required,Validators.minLength(3)]],
    tags:["",[Validators.required,Validators.minLength(3)]],
    admin_Id:[''],
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

  this.categoryService.getallGategory().subscribe((result)=>{
    
if(result.data!=null){
  let categoryWithoutFileds=result.data.filter((val:any) => val.fields.length<=0)
   this.categoryParentArry=categoryWithoutFileds
//  console.log(categoryWithoutFileds)

}
  })
  ///////get id from url/////
  this.ActiceRouter.paramMap.subscribe(
    paramMap => {
  this.currentidCat = Number(paramMap.get('Cid'));
    })
    this.categoryService.getCategoryByID(this.currentidCat).subscribe((result=>

      { if(result.data!=null){
        this.categoryDetials =result.data
        console.log(result)
        console.log(this.categoryDetials)
        //////////////set data for from control from categoryDetials////////
      
        this.addForm.get('name')?.setValue( this.categoryDetials.name)
       this.addForm.get('label')?.setValue( this.categoryDetials.label)
        this.addForm.get('label_Ar')?.setValue( this.categoryDetials.label_Ar)
         this.addForm.get('slug')?.setValue( this.categoryDetials.slug)
       this.addForm.get('parent_Id')?.setValue( this.categoryDetials.parent_Id)
        this.addForm.get('description')?.setValue( this.categoryDetials.description)
         this.addForm.get('tags')?.setValue( this.categoryDetials.tags)
        //  if(this.categoryDetials.fields.length==0){
        //   this.showField=false
        //  }

         if(this.categoryDetials.fields.length>0){
          this.Fields.controls=[]

        this.showField=true
    for (let index = 0; index < this.categoryDetials.fields.length ; index++) {
      
      const fieldsFormGroup = this.AddFieldsFormGroup();
      const choicesArray = fieldsFormGroup.get('choices') as FormArray;
      fieldsFormGroup.patchValue(this.categoryDetials.fields[index]);

      for (let index2 = 0; index2 < this.categoryDetials.fields[index].choices.length - 1; index2++) {
        const choiceFormGroup = this.AddchoicesFormGroup();
        choicesArray.push(choiceFormGroup);
       choiceFormGroup.patchValue(this.categoryDetials.fields[index].choices[index2]);

      }
      this.Fields.push(fieldsFormGroup);

    }

  }  }}))

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
    this.addForm.get('admin_Id')?.setValue(localStorage.getItem('id'))
    const formControls = this.addForm.controls;
    let isAllValidExceptName = true;
    
    for (const key in formControls) {
      if (key !== 'fields' && !formControls[key].valid) {
        isAllValidExceptName = false;
        break;
      }}
    if( this.addForm.get("parent_Id")?.value=='null'&&isAllValidExceptName&&this.hasField==false||this.addForm.get("parent_Id")?.value!='null'&&isAllValidExceptName&&this.hasField==false){
      if(this.addForm.get("parent_Id")?.value=='null'){
        this.addForm.get('parent_Id')?.setValue(null);
      }
      let emptyArry:any=[]
      this.addForm.value.fields=emptyArry;
      this.addForm.value.id=this.currentidCat;

      console.log(this.addForm.value)
this.categoryService.editeCategory(this.addForm.value,this.currentidCat).subscribe(result=>{
  console.log(result)
this.router.navigate(['dashboard/category'])
})
    }
    else if((this.addForm.valid)){
    
 console.log( this.addForm.value)
 this.addForm.value.id=this.currentidCat;

 this.categoryService.editeCategory(this.addForm.value,this.currentidCat).subscribe(result=>{
  console.log(result)
  this.router.navigate(['dashboard/category'])

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
          // else if (control.errors && control.errors['pattern']) {
          //   // if (controlName === 'email') {
          //   //   return 'Please enter valid Email Adress.';
          //   // } else if (controlName === 'avatar') {
          //   //   return 'Please Enter Valid Format , Accepted : PNG, JPEG, JPG.';
          //   // } else if (controlName === 'password') {
          //   //   return 'At least 6 characters mixed with numbers and symbols.';
          //   // }
           
          // }
        }
    return '';
  }
}
