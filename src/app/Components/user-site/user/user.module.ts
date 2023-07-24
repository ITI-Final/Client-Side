import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { authUserGuard } from 'src/app/Guards/UserSite/auth-user.guard';
import { EditeUserComponent } from './edite-user/edite-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { SharedModule } from '../shared/shared.module';

  const routes: Routes =[
    // My Profile
    {path:"profile",component:ViewUserComponent,canActivate:[authUserGuard]},
    {path:"profile/edit",component:EditeUserComponent,canActivate:[authUserGuard]},
    {path:"profile/posts",component:UserPostsComponent},
    {path:"profile/change-password",component:ChangePasswordComponent,canActivate:[authUserGuard]},

    // Other Users
    {path:":id",component:ViewUserComponent},
    {path:":id/posts",component:UserPostsComponent},

    // Errors
    {path:"404",component:NotFoundComponent},
    {path:"**",component:NotFoundComponent},
  ]


@NgModule({
  declarations: [
    ProfileComponent,
    EditeUserComponent
    ,ViewUserComponent, ChangePasswordComponent, UserPostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }
