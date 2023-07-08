import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './add-post/add-post.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { authUserGuard } from 'src/app/Guards/UserSite/auth-user.guard';


const routes: Routes =[
  {path:'Add', component: AddPostComponent,canActivate:[authUserGuard]},

  

]

@NgModule({
  declarations: [
    AddPostComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ]
})
export class PostsModule { }
