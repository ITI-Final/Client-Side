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
import { AddPostComponent } from './posts/add-post/add-post.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostSectionComponent } from './post-section/post-section.component';
import { RegisterComponent } from './register/register.component';
import { SlideshowComponent } from './slideshow/slideshow.component';

import { PostViewComponent } from './post-view/post-view.component';
import { ChatComponent } from './chat/chat.component';
import { CategoryViewComponent } from './category-view/category-view.component';

const routes: Routes = [
  {
    path: "", component: MainlayoutComponent,
    children: [

      { path: "", component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'Logout', component: LoginComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "chat", component: ChatComponent },
      { path: "chat/:id", component: ChatComponent },
      {
        path: 'user',

        loadChildren: () => import('src/app/Components/user-site/user/user.module')
          .then(m => m.UserModule)
      },
      {
        path: 'post',
        loadChildren: () => import('src/app/Components/user-site/posts/posts.module')
          .then(m => m.PostsModule)
      },
      { path: ":category", component: PostViewComponent },
      { path: ":category/:sub", component: PostViewComponent },
      { path: ":category/:sub/:id", component: PostViewComponent },


      //////// must be last  Path/////////////
      { path: '**', component: NotFoundComponent }
      /////////////////////////////////////////
    ]
  }
]

@NgModule({
  declarations: [
    NotFoundComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    MainlayoutComponent,
    LoginComponent,
    CategoriesComponent,
    PostItemComponent,
    PostSectionComponent,
    RegisterComponent,
    SlideshowComponent,
    PostViewComponent,
    ChatComponent

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
