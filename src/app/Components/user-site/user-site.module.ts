import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes =[
  {path:"",component:MainlayoutComponent,
  children:[
     {path:"",component:HomeComponent},
     {
      path: 'User',
      loadChildren: () => import('src/app/Components/user-site/user/user.module')
                            .then(m=>m.UserModule)
    },
    {
      path: 'Post',
      loadChildren: () => import('src/app/Components/user-site/posts/posts.module')
                            .then(m=>m.PostsModule)
    },
    {path:'Login', component:LoginComponent},
    {path:'Logout', component:LoginComponent},
//////// must be last  Path/////////////
{path: '**', component:NotFoundComponent}
/////////////////////////////////////////
  ]}
 
]

@NgModule({
  declarations: [
    NotFoundComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    MainlayoutComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class UserSiteModule { }
