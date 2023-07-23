import { NgModule } from '@angular/core';
import { PostItemComponent } from '../post-item/post-item.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';



@NgModule({
  declarations: [
    PostItemComponent,
    LoadingComponent
  ],
  exports: [
    PostItemComponent,
    LoadingComponent
  ],
  imports: [
    // Other imported modules
    RouterModule, // Include the RouterModule here
  ],

})
export class SharedModule { }
