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
import { CategoriesComponent } from './categories/categories.component';
import { PostSectionComponent } from './post-section/post-section.component';
import { RegisterComponent } from './register/register.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PostViewComponent } from './post-view/post-view.component';
import { ChatComponent } from './chat/chat.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { SharedModule } from './shared/shared.module';
import { authUserGuard } from 'src/app/Guards/UserSite/auth-user.guard';




const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'Logout', component: LoginComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'chat', component: ChatComponent,canActivate:[authUserGuard] },
      { path: 'chat/:id', component: ChatComponent,canActivate:[authUserGuard] },
      //{ path: ':slug', component: HomeComponent },
      {
        path: 'user',

        loadChildren: () =>
          import('src/app/Components/user-site/user/user.module').then(
            (m) => m.UserModule
          ),
      },
      {
        path: 'post',
        loadChildren: () =>
          import('src/app/Components/user-site/posts/posts.module').then(
            (m) => m.PostsModule
          ),
      },
      // Main Not Found => Must be before Category
      { path: '404', component: NotFoundComponent},
      // Category Routes
      { path: ':category', component: CategoryViewComponent },
      { path: ':category/:id', component: PostViewComponent },
      //////// must be last  Path/////////////
      { path: '**', component: NotFoundComponent },
      /////////////////////////////////////////
    ],
  },
];

@NgModule({
  declarations: [
    NotFoundComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    MainlayoutComponent,
    LoginComponent,
    CategoriesComponent,
    PostSectionComponent,
    RegisterComponent,
    SlideshowComponent,
    PostViewComponent,
    ChatComponent,
    CategoryViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class UserSiteModule {}
