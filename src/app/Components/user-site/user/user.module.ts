import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { authUserGuard } from 'src/app/Guards/UserSite/auth-user.guard';
import { EditeUserComponent } from './edite-user/edite-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  // {path:'Profile', component: ProfileComponent,canActivate:[authUserGuard]},
  // {path:'Profile', component: ProfileComponent,canActivate:[authUserGuard]},
  // {path:'Profile', component: ProfileComponent,canActivate:[authUserGuard]},
  { path: "profile", component: ViewUserComponent, canActivate: [authUserGuard] },
  { path: "profile/edit", component: EditeUserComponent, canActivate: [authUserGuard] },


]


@NgModule({
  declarations: [
    ProfileComponent,
    EditeUserComponent
    , ViewUserComponent
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
