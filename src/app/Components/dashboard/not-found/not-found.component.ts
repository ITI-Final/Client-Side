import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Dashboard/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  usrFormGroup:any
  constructor( private AuthServices:AuthService,private fb: FormBuilder,private router:Router) {

  this.usrFormGroup=this.fb.group({
    email:['',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/)]],
    password:['',[Validators.required]],
  })
}
get Email(){
  return this.usrFormGroup.get('email');
}
get Password(){
  return this.usrFormGroup.get('password');
}
ngOnInit(): void {
}
// login(e:any){

//   const formData = new FormData();
//   formData.append('email', this.usrFormGroup.value.email);
//   formData.append('password', this.usrFormGroup.value.password);

//   // this.AuthServices.login(formData).subscribe((val:any)=>{
//   //  console.log(this.usrFormGroup.value)
//   //  console.log(val)

//   // })
//     this.AuthServices.login(formData).subscribe((response: any) => {
//       console.log(response.statusMessage);
//       // Handle the response here
//     },
//     (error: any) => {
//       console.error(error.error?.statusMessage);
//       // Handle any errors here
//     })
// }
// }
}