import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

  posts = [
    {
      date:"15 minutes ago",
      image:"https://images.pexels.com/photos/1280560/pexels-photo-1280560.jpeg?auto=compress&cs=tinysrgb&w=1600",
      price: 2500,
      title:`Going on a business trip, traveling for leisure or looking for ancient
      Egyptian treasures? Cairo is the place to be. Explore the region’s
      ancient history alongside a bustling and fast-growing city with its
      dizzying diversity.`,
      url:"#",
      location: "Dyar, New Cairo - El Tagamoa"
    },
    {
      date:"4 days ago",
      image:"https://images.pexels.com/photos/11994974/pexels-photo-11994974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 15000,
      title:`for ancient
      Egyptian treasures? Cairo is the place to be. Explore the region’s
      ancient history alongside a bustling and fast-growing city with its
      dizzying diversity.`,
      url:"#",
      location: "Mansoura, Dakhlia , Egypt"
    },
    {
      date:"6 days ago",
      image:"https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 15000000,
      title:`for ancient
      Egyptian treasures? Cairo is the place to be. Explore the region’s
      ancient history alongside a bustling and fast-growing city with its
      dizzying diversity.`,
      url:"#",
      location: "Mansoura, Dakhlia , Egypt"
    }
  ];
  vehicles = {name:"Vehicles",url:"#",items: this.posts}




  constructor(private router : Router , private activatedRoute : ActivatedRoute) {}

  ngOnInit(): void {   
    console.log(this.activatedRoute.snapshot.params);
  }

}
