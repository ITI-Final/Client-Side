import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
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
  governorate:any=[]
  city:any=[]
  hasCity=false
  selectedImages: FileList |any;
userID:any

  /////////////////
    categoryParentArry: any[]=[]
  testArry:any=[]
    fieldArry=[]
  hasField:boolean=false
  ChoicesArry:any
  selectedFile: File | undefined;
  PriceType=["Free","Negotiable","Non-Negotiable"]
  
    constructor(private router:Router,private fb:FormBuilder,private categoryService:CategoryService,private ActiceRouter:ActivatedRoute) {
      this.addForm = this.fb.group({
  
  // Id: [""],
  Title: ["",[Validators.required,Validators.minLength(3)]],
  Description: ["",[Validators.required,Validators.minLength(3)]],
  Price: ["",[Validators.required]],
  Price_Type: ["",[Validators.required]],
  Contact_Method: ["",[Validators.required]],
  Post_Location: ["",[Validators.required]],
  Location: ["",[Validators.required]],

  // Fields: this.fb.array([this.AddFieldsFormGroup()]),
  Post_Images:[''],
  
  arryRadio:this.fb.array([this.AddFieldsFormGroup()]),
  
  arryChexkBox:this.fb.array([this.AddFieldsFormGroup()]),
  // correct:[""],
  arrySelectBox:this.fb.array([this.AddFieldsFormGroup()]),
  
      });
    }
   

onChoiceSelect(event:any,field: AbstractControl, i: any): void {
  const choicesArray = field.get('choices') as FormArray;
  const selectedChoice = choicesArray.at(i); // Get the selected choice FormGroup
  let selectedLabel = event.target.value // Get the label of the selected choice
  console.log(event.target);

  console.log(field.get('label')?.value, selectedLabel);

  let obj: any = {
    "fildeID": (field.get('id')?.value),
    "choices": []
  };

 
  obj.choices.push(selectedLabel);

  // Check if the field ID already exists in the array
  let existingIndex = this.testArry.findIndex((val: any) => val.fildeID === (field.get('id')?.value));

  if (existingIndex !== -1 && event.target.checked) {
    // if (event.target.checked) {
console.log(event.target.checked)
console.log(event.target.value)
console.log(event.target)

       this.testArry[existingIndex].choices.push(event.target.value)

    }else  if (existingIndex !== -1) {

    // If the field ID exists, update its choices array
    this.testArry[existingIndex].choices = obj.choices;
  } else {
    // If the field ID does not exist, add a new object to the array
    this.testArry.push(obj);
  }

  console.log(this.testArry);
}


    //#region From Varaibles
    
  
  
     get User_Id() { return this.addForm.get('User_Id')}
     get Cat_Id() { return this.addForm.get('Cat_Id')}
    get Title() { return this.addForm.get('Title')}
    get Price() { return this.addForm.get('Price')}
    get Price_Type() { return this.addForm.get('Price_Type')}
    get Contact_Method() { return this.addForm.get('Contact_Method')}
    get Description() { return this.addForm.get('Description')}
    get Post_Images() {return this.addForm.get('Post_Images') }
    get Post_Location() {return this.addForm.get('Post_Location');

  }
  get Location() {return this.addForm.get('Location');

}
    get ArryRadio() {
      return this.addForm.get('arryRadio') as FormArray;
    } get ArryChexkBox() {
      return this.addForm.get('arryChexkBox') as FormArray;
    } 
    get ArrySelectBox() {
      return this.addForm.get('arrySelectBox') as FormArray;
    }
  
    //#endregion
    //#region Add fields
    AddFieldsFormGroup(): FormGroup {
      return this.fb.group({
        label: ['', [Validators.required]],
        id: ['', [Validators.required]],

         choices: this.fb.array([this.AddchoicesFormGroup()])
  
      });
    }
  
  
    
    ///add choices//
    AddchoicesFormGroup(): FormGroup {
      return this.fb.group({
        label: ['', [Validators.required]],
  
  
      });
    }
    //arry in fields fromArry inside formArry
    getChoicesArrySelect(i:number,arryTypeChoices:FormArray): FormArray {
      let x=arryTypeChoices
      let y=x.at(i).get("choices") 
      this.ChoicesArry = y as FormArray
    return this.ChoicesArry
    }
    
    
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
  
  console.log(arryRadio)
  if(this.categoryDetials.fields.length>0){
    this.getFieldDetials(arrySelectBox,this.ArrySelectBox)
    this.getFieldDetials2(arryRadio,this.ArryRadio)
    this.getFieldDetials2(arryChexkBox,this.ArryChexkBox)

  
  } 
  
 
  }}))
  

  ///cities

  this.categoryService.getallGovernorates().subscribe(res=>{
    console.log(res.data)
    this.governorate=res.data
  })
  this.addForm.get('Location')?.valueChanges.subscribe(res=>{
    this.hasCity=true

    this.categoryService.getGovernorateById(res).subscribe(res=>{
      console.log(res.data)
      this.city=res.data.cities
      
    })  })
    this.addForm.get('Price_Type')?.valueChanges.subscribe(res=>{
if(res==1){
  this.Price?.setValue(0.00)
}
    })
  }
 
    //#endregion
    onFileChange(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.selectedImages = inputElement.files;
      console.log(this.selectedImages)
    }
    //#endregion
  
    //#region On Form Submit
    formOperation(e:any) {
     this.userID=localStorage.getItem('userId')


      const formData = new FormData();
      formData.append('User_Id',this.userID);
      formData.append('Cat_Id', this.currentidCat.toString());
        formData.append('Title', this.Title?.value);
        formData.append('Description',this.Description?.value);
        formData.append('Price', this.Price?.value);
        formData.append('Price_Type', this.Price_Type?.value);
        formData.append('Contact_Method',this.Contact_Method?.value);
        formData.append('Post_Location',this.Post_Location?.value);
        formData.append('Fields',JSON.stringify( this.testArry));
        // const Post_ImagesArry: any[] = [];

  for (let i = 0; i < this.selectedImages.length; i++) {
    const file = this.selectedImages[i];
  
    formData.append(`Post_Images[${i}].ImageFile`, file);
    formData.append(`Post_Images[${i}].Image`, file.name);
  }

  

      this.categoryService.addPost(formData).subscribe(val=>{
this.router.navigate([''])
      })

  //    if((this.addForm.valid)){
      
  //  console.log( this.addForm.value)
      
       
  
        
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
    arry.controls=[]
  
  for (let index = 0; index <arryChoiesType.length ; index++) {
  
  const fieldsFormGroup = this.AddFieldsFormGroup();
  fieldsFormGroup.patchValue(arryChoiesType[index]);
  
  for (let index2 = 0; index2 <arryChoiesType[index].choices.length - 1; index2++) {
  const choiceFormGroup = this.AddchoicesFormGroup();
  choiceFormGroup.patchValue(arryChoiesType[index].choices[index2]);
  const choicesArray = fieldsFormGroup.get('choices') as FormArray;
  choicesArray.push(choiceFormGroup);
  
  }
  arry.push(fieldsFormGroup);
  
  }
        
       }
       getFieldDetials2(arryChoiesType: any, arry: FormArray) {
        arry.clear(); // Clear the FormArray before populating it again
      
        for (let index = 0; index < arryChoiesType.length; index++) {
          const fieldFormGroup = this.AddFieldsFormGroup();
          fieldFormGroup.patchValue(arryChoiesType[index]);
      
          const choicesArray = fieldFormGroup.get('choices') as FormArray;
          choicesArray.clear(); // Clear the choices FormArray for each field
      
          for (let index2 = 0; index2 < arryChoiesType[index].choices.length; index2++) {
            const choiceFormGroup = this.AddchoicesFormGroup();
            choiceFormGroup.patchValue(arryChoiesType[index].choices[index2]);
            choicesArray.push(choiceFormGroup);
          }
      
          arry.push(fieldFormGroup);
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
