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

const routes: Routes =[
  {path:"",component:MainlayoutComponent,
  children:[
    // Overview
    {path:"",component:HomeComponent,canActivate:[authAdminGuard]},
    // Users
    // Category
    {path:"category",component:CategoryComponent,canActivate:[authAdminGuard]},
    {path:"category/add",component:AddCategoryComponent,canActivate:[authAdminGuard]},
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
   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
