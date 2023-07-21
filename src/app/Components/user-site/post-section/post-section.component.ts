import { Component, Input, OnInit } from '@angular/core';


interface Post {
  title:string;
  url:string;
  image:string;
  price: number;
  date:string;
  location:string
}


@Component({
  selector: 'app-post-section',
  templateUrl: './post-section.component.html',
  styleUrls: ['./post-section.component.scss']
})
export class PostSectionComponent implements OnInit {

  @Input() section : any;
  posts : Post[] = [];
  
  ngOnInit(): void {
    this.posts = this.section!.items;
  }

}
