import { Sections } from 'src/app/enums/Sections';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

// interface Post {
//   cat_Id: number;
//   title: string;
//   created_Date: Date;
//   description: string;
//   // post_Images: Post_Images[];
//   contact_Method: number;
//   price: number;

//   views: number;
// }
// interface Post_Images {
//   image: string;
// }
interface Post {
  title: string;
  url: string;
  cat_Id: number;
  image: string;
  price: number;
  date: string;
  location: string;
}
@Component({
  selector: 'app-post-section',
  templateUrl: './post-section.component.html',
  styleUrls: ['./post-section.component.scss'],
})
export class PostSectionComponent implements OnChanges {
  @Input() section: any;
  posts: any = [];
  ngOnChanges(changes: SimpleChanges) {
    // this.section = changes['section'].currentValue;
    console.log(changes);
    if (changes['section'].currentValue != null) {
      this.posts = changes['section'].currentValue;
      console.log(this.posts);
      this.posts = this.posts.items;
    }
  }

  // ngOnInit(): void {
  //   this.posts = this.section!.items;
  //   console.log(this.section);
  // }
}
