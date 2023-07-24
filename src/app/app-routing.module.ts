import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanActivateFn } from '@angular/router';
 const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('src/app/Components/dashboard/dashboard.module')
                          .then(m=>m.DashboardModule)
  },
      
  {
    path: '',
    loadChildren: () => import('src/app/Components/user-site/user-site.module')
                          .then(m=>m.UserSiteModule)
  },

 ]

// const routes: Routes = [
//   {path:"",component:MainlayoutComponent,
//   children:[
//     //  {path: '', redirectTo: '/LandingPage', pathMatch: 'full'}, //Default path
//      {path:"",component:LandingPageComponent},
//     {
//       path: 'Admin',
//       loadChildren: () => import('src/app/Components/admin/admin.module')
//                             .then(m=>m.AdminModule)
//     },
//     //  {path:"AddProudect/:Pid/Edite",component:AddProudectComponent},
//     // {path:"ProudectDetials/:Pid",component:ProudectDetialsComponent},
//     {path:"erro",component:Erro404Component},
//     {path:'Login', component:LoginComponent},
//     {path:'Register', component:RegisterComponent},
//      {path:'Logout', component:LoginComponent},



//      {path:"test",component:TestComponent},


//     {path: '**', component:Erro404Component}
  
//           ]
// },


// ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: "top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
