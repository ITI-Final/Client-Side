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

  const routes: Routes =[
    {path:"profile",component:ViewUserComponent,canActivate:[authUserGuard]},
    {path:"profile/edit",component:EditeUserComponent,canActivate:[authUserGuard]},
    {path:"profile/change-password",component:ChangePasswordComponent,canActivate:[authUserGuard]},
  ]


@NgModule({
  declarations: [
    ProfileComponent,
    EditeUserComponent
    ,ViewUserComponent, ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
