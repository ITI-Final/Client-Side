import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/Dashboard/auth.service';
import { CategoryService } from 'src/app/services/Dashboard/category.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
addForm:FormGroup
currentidCat:number=0
categoryDetials:any
arryFields:any
/////////////////
  categoryParentArry: any[]=[]

  fieldArry=[]
hasField:boolean=false
ChoicesArry:any
selectedFile: File | undefined;

  constructor(private router:Router,private fb:FormBuilder,private categoryService:CategoryService,private ActiceRouter:ActivatedRoute) {
    this.addForm = this.fb.group({

Id: [""],
User_Id: [""],
Cat_Id: [""],
Title: ["",[Validators.required,Validators.minLength(3)]],
Description: ["",[Validators.required,Validators.minLength(3)]],
Price: ["",[Validators.required,Validators.minLength(3)]],
Price_Type: ["",[Validators.required,Validators.minLength(3)]],
Contact_Method: ["",[Validators.required,Validators.minLength(3)]],
Post_Location: ["",[Validators.required,Validators.minLength(3)]],
Fields: this.fb.array([this.AddFieldsFormGroup()]),
Post_Images:this.fb.array([this.AddFieldsFormGroup()]),

arryRadio:this.fb.array([this.AddFieldsFormGroup()]),

arryChexkBox:this.fb.array([this.AddFieldsFormGroup()]),

arrySelectBox:this.fb.array([]),

    });
  }
 

  //#region From Varaibles
  


  get User_Id() { return this.addForm.get('User_Id')}
  get Cat_Id() { return this.addForm.get('Cat_Id')}
  get Title() { return this.addForm.get('Title')}
  get Price() { return this.addForm.get('Price')}
  get Price_Type() { return this.addForm.get('Price_Type')}
  get Contact_Method() { return this.addForm.get('Contact_Method')}
  get Description() { return this.addForm.get('Description')}
  get Post_Images() {return this.addForm.get('Post_Images') as FormArray;
}
  get Fields() {
    return this.addForm.get('fields') as FormArray;
  }
  get arryRadio() {
    return this.addForm.get('arryRadio') as FormArray;
  } get arryChexkBox() {
    return this.addForm.get('arryChexkBox') as FormArray;
  } get ArrySelectBox() {
    return this.addForm.get('arrySelectBox') as FormArray;
  }

  //#endregion
  //#region Add fields
  AddFieldsFormGroup(): FormGroup {
    return this.fb.group({
      // name: ['', [Validators.required]],
      label: ['', [Validators.required]],
      // label_Ar: ['', [Validators.required]],
      // value_Type: ['', [Validators.required]],
      // choice_Type: ['', [Validators.required]],
      // max_Length: ['', [Validators.required]],
      // min_Length: ['', [Validators.required]],
      // max_Value: ['', [Validators.required]],
      // min_Value: ['', [Validators.required]],
      // choices: this.fb.array([this.AddchoicesFormGroup()])

    });
  }

  
  // AddFields() {
  //   // if (this.addForm.valid) {
  //     this.Fields.push(this.AddFieldsFormGroup());
  //   // }
  // }
  // AddField(arry:any) {
  //   // if (this.addForm.valid) {
  //     arry.push(this.AddFieldsFormGroup());
  //   // }
  // }

  
  ///add choices//
  AddchoicesFormGroup(): FormGroup {
    return this.fb.group({
      label: ['', [Validators.required]],
      // label_Ar: ['', [Validators.required]],
      // slug: ['', [Validators.required]],
      // icon: ['', [Validators.required]],

    });
  }
  //arry in fields fromArry inside formArry
  getChoicesArry(i:number): FormArray {
    let x=this.addForm.get('arrySelectBox') as FormArray
    let y=this.ArrySelectBox.at(i).get("choices") 
    this.ChoicesArry = y as FormArray
  return this.ChoicesArry
  }
  
  // AddChoices() {
  //   // if (this.addForm.valid) {
  //     this.ChoicesArry.push(this.AddchoicesFormGroup());
  //   // }
  // }
  // deleteChoices(index: number) {
  //   this.ChoicesArry.removeAt(index);
  // }
  //#endregion

//#region oninit
ngOnInit(): void {
  this.ActiceRouter.paramMap.subscribe(
    paramMap => {
  this.currentidCat = Number(paramMap.get('id'));
console.log(this.currentidCat);
    })
    this.categoryService.getCategoryByID(this.currentidCat).subscribe((result=>
      { if(result.data!=null){
        this.categoryDetials =result.data

// console.log(this.categoryDetials);
this.arryFields=this.categoryDetials.fields
console.log(this.categoryDetials.label);

console.log(this.arryFields);
// Single
let arrySelectBox= this.arryFields.filter((val:any) => val.choice_Type=="Single")
let arryChexkBox= this.arryFields.filter((val:any)=>val.choice_Type=='multi')
let arryRadio= this.arryFields.filter((val:any)=>val.choice_Type=="radio")


if(this.categoryDetials.fields.length>0){

this.getFieldDetials(arrySelectBox,this.ArrySelectBox)
} 

      // this.getFieldDetials(arrySelectBox,this.ArrySelectBox)
      // this.getFieldDetials(arryChexkBox)
      // this.getFieldDetials(arryRadio)

// console.log(arrySelectBox);
// console.log(arryChexkBox);
// console.log(arryRadio);

// choice_Type
// : 
// "Single"
}}))

// Two arrays of objects
// const array1 = [
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Jane' }
// ];

// const array2 = [
//   { id: 3, name: 'Alice' },
//   { id: 4, name: 'Bob' }
// ];

// // Merge the arrays
// const mergedArray = array1.concat(array2);

//console.log(mergedArray);


}
  //#endregion
     //#region add field toggel
    //  AddFieldstoggel1(){
    //   this.hasField=!this.hasField
    //  }
  //#endregion
     //#region add image file
    //  onFileSelected(event: any) {
    //   this.selectedFile = event.target.files[0];
    // }
  //#endregion

  //#region On Form Submit
  formOperation(e:any) {
//     this.addForm.get('admin_Id')?.setValue( localStorage.getItem('id') );
//     console.log(localStorage.getItem('id'))
//     const formControls = this.addForm.controls;
// let isAllValidExceptName = true;

// for (const key in formControls) {
//   if (key !== 'fields' && !formControls[key].valid) {
//     isAllValidExceptName = false;
//     break;
//   }
// }
//     // console.log( this.addForm.value)
//     if( this.addForm.get("parent_Id")?.value=='null'&&isAllValidExceptName&&this.hasField==false||this.addForm.get("parent_Id")?.value!='null'&&isAllValidExceptName&&this.hasField==false){
//       if(this.addForm.get("parent_Id")?.value=='null'){
//         this.addForm.get('parent_Id')?.setValue(null);
//       }
//       const { fields, ...formDataValue } = this.addForm.value;
//       console.log(formDataValue)
// this.categoryService.addMainCategory(formDataValue).subscribe(result=>{
//   console.log(result)

// })
//     }
//     else if((this.addForm.valid)){
    
//  console.log( this.addForm.value)
    
//       this.categoryService.addCategory(this.addForm.value).subscribe(result=>{
//         console.log(result)

//       })
//     }else{
    
//           Object.keys(this.addForm.controls).forEach((key: string) => {
//             const control = this.addForm.get(key);
//             if (control) {
//               control.markAsDirty();
//               control.markAsTouched();
//             }
//           });
//     }

  }
  //#endregion

  getFieldDetials(arryChoiesType:any,arry:FormArray){
    for (let index = 0; index < arryChoiesType.length ; index++) {

      const fieldsFormGroup = this.AddFieldsFormGroup();
      const choicesArray = arry.get('choices') as FormArray;
      fieldsFormGroup.patchValue(arryChoiesType[index]);
      
      for (let index2 = 0; index2 < arryChoiesType[index].choices.length - 1; index2++) {
      const choiceFormGroup = this.AddchoicesFormGroup();
      choicesArray.push(choiceFormGroup);
      choiceFormGroup.patchValue(arryChoiesType[index].choices[index2]);
      
      }
      arry.push(fieldsFormGroup);
      
      }
      
      } 
    
  
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
