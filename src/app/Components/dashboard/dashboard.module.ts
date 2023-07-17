import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authAdminGuard } from 'src/app/Guards/Dashboard/auth-admin.guard';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AdminComponent } from './admin/admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { SearchFilterPipe } from 'src/app/pipes/search/search-filter.pipe';
import { UsersComponent } from './users/users/users.component';
import { EditeUserComponent } from './users/edite-user/edite-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ViewUserComponent } from './users/view-user/view-user.component';

const routes: Routes =[
  {path:"",component:MainlayoutComponent,
  children:[
    // Overview
    {path:"",component:HomeComponent,canActivate:[authAdminGuard]},
    // Admins
    {path:"admin",component:AdminComponent,canActivate:[authAdminGuard]},
    {path:"admin/add",component:AddAdminComponent,canActivate:[authAdminGuard]},
    {path:"admin/:id",component:ViewAdminComponent,canActivate:[authAdminGuard]},
    {path:"admin/:id/edit",component:EditAdminComponent,canActivate:[authAdminGuard]},
    // Users
    {path:"user",component:UsersComponent,canActivate:[authAdminGuard]},
    {path:"user/add",component:AddUserComponent,canActivate:[authAdminGuard]},
    {path:"user/:id",component:ViewUserComponent,canActivate:[authAdminGuard]},
    {path:"user/:id/edit",component:EditeUserComponent,canActivate:[authAdminGuard]},
    // Category
    {path:"category",component:CategoryComponent,canActivate:[authAdminGuard]},
    {path:"category/add",component:AddCategoryComponent,canActivate:[authAdminGuard]},
    {path:"category/edite/:Cid",component:EditCategoryComponent,canActivate:[authAdminGuard]},
    
  ]},
  {path:'Logout', component:LoginComponent},
  {path:'Login', component:LoginComponent},
  {path: '**', component:NotFoundComponent}
]

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    MainlayoutComponent,
    LoginComponent,
    SidebarComponent,
    CategoryComponent,
    AddCategoryComponent,
    AdminComponent,
    AddAdminComponent,
    ViewAdminComponent,
    EditAdminComponent,
    EditCategoryComponent,
    SearchFilterPipe,
    UsersComponent,
    EditeUserComponent,
    AddUserComponent,
ViewUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }
