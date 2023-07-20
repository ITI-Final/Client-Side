import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './add-post/add-post.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { authUserGuard } from 'src/app/Guards/UserSite/auth-user.guard';
import { BrowserModule } from '@angular/platform-browser';


const routes: Routes =[
  {path:'add/:id', component: AddPostComponent},

  

]

@NgModule({
  declarations: [
    AddPostComponent,
  ],
  imports: [
CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ]
})
export class PostsModule { }
